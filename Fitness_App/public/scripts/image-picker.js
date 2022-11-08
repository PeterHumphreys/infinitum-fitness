/**
 * Controls a custom reusable image picker.  Allows a user to select from several
 * default images or upload their own to the server.
 * 
 * Note that an image upload is not actually uploaded to the server until
 * the "submit" event has finished.  Between the user interacting with the file picker
 * and submission, it is stored in a temporary blob file on the browser. 
 */

//Set the image being displayed to the currently selected image
window.addEventListener("load", ()=>
{
    mainImage.src = currImage.src;
})

let prevArrow = document.querySelector("#prev-arrow")
let nextArrow = document.querySelector("#next-arrow")
let imageGallery = document.querySelector(".image-gallery");
let imageLinks = document.querySelectorAll(".image-gallery a");
let imagePaths = document.querySelectorAll(".image-gallery img");
let currImageLink = document.querySelector(".image-gallery a.selected-link");
let currImage = document.querySelector(".image-gallery a.selected-link img");
let mainImage = document.querySelector(".current-selected-image");

//Images are 50px wide + 12px gap set on flexbox container = 62.5px
const IMG_GAP_TOTAL_WIDTH = 62.5;

//Constants to ensure valid image is uploaded
const MAX_FILE_SIZE = 1000000;
const VALID_FILE_TYPES = /jpeg|jpg|png|gif/;

//Number of images in the gallery
let numImages = imagePaths.length;

//value of image Gallery translateX property
let xLoc = 0; 

//furthest VISIBLE image to left
let currIndex = 0;

//Reveal more images at the beginning of the gallery
prevArrow.addEventListener("click", ()=>
{
    //Make sure we don't go out of bounds
    if (currIndex > 0)
    {
        //Move the image gallery to the right (reveals images to the left)
        move(IMG_GAP_TOTAL_WIDTH);
        //Decrement the current index
        currIndex--;
    }
});

//Reveal more images at the end of the gallery
nextArrow.addEventListener("click", ()=>
{
    //Make sure we don't go out of bounds
    if (currIndex < numImages)
    {
        //Move the image gallery to the left (reveals images to the right)
        move(-IMG_GAP_TOTAL_WIDTH);
        //Increment the current index
        currIndex++;
    }
});

/**
 * Utility function to manipulate the horizontal position of the imageGallery
 * by a specified amount
 * @param {Number} delta the pixel amount we wish to move the element
 * @return none
 */
let move = (delta) =>
{
    imageGallery.setAttribute("style", `transform: translateX(${xLoc + delta}px)`);
    xLoc += delta;
}

//Set the active image
imageLinks.forEach((element) => 
{
    element.addEventListener("click", () =>
    {
        handleCurrentSelection(element);
    })
});

/**
 * Sets the relevant attributes for whatever image is currently active
 * and removes them from previous active image
 * @param {*} element the element we wish to manipulate
 * @return none
 */
function handleCurrentSelection(element)
{
    //Only need to run this code if this is not the currently active image
    if (!element.classList.contains("selected-link"))
    {
        //Add selected class to active image
        element.classList.toggle("selected-link")

        //Remove the active status from the previously active image
        currImageLink.classList.toggle("selected-link")

        //Set the currImageLink and currImage to the new active image
        currImageLink = element;
        currImage = currImageLink.querySelector("img");

        //if this is user uploaded image, append class to currImage
        if (currImageLink.classList.contains("user-upload"))
        {
            currImage.classList.add("user-upload")
        }

        //Set the main image
        mainImage.src = currImage.src;
    }
}

/**
 * Builds an image-gallery item component consisting of a link, overlay div and img
 * @param {string} src the source path for the image
 * @return none
 */
function buildImageGalleryItem(src)
{
    //Create the image element
    let newImage = document.createElement("img");
    
    //Set the source path
    newImage.src = src;

    //create <a> tag
    let imgLink = document.createElement("a");
    imgLink.setAttribute("href", "#");
    imgLink.classList.add("user-upload");

    //create div.overlay
    let divOverlay = document.createElement("div");
    divOverlay.classList.add("overlay", "circle");

    //append img to div.overlay and handle its active status
    divOverlay.appendChild(newImage);
    imgLink.addEventListener("click", () => 
    {
        handleCurrentSelection(imgLink);
    });

    //append div.overlay to <a>
    imgLink.appendChild(divOverlay);

    //append <a> to front of image gallery
    imageGallery.prepend(imgLink);

    //change current image
    handleCurrentSelection(imgLink);

    //Move left side of image gallery to position 0
    move((xLoc*-1));

    //reset current index to 0
    currIndex = 0;

    //increment number of images
    numImages++;
}

//Handle File upload
let btnFile = document.querySelector(".btn-file");
let fileUpload = document.querySelector("input[type=file]");
btnFile.addEventListener("click", (e)=>
{
    e.preventDefault();
    fileUpload.click();
});

//Handle image temp upload to browser
fileUpload.addEventListener("change", (e)=>
{
    //Get file
    let file = e.target.files[0];
    //Get file extension
    let ext = file.name.split(".")[1].toLowerCase();

    //Check that file is appropriate size
    if ((file.size) > MAX_FILE_SIZE)
    {
        message.innerHTML = "File is too large.  Please do not exceed 1MB file."
    }

    //Check for invalid format
    else if (!VALID_FILE_TYPES.test(ext))
    {
        message.innerHTML = "Invalid file format. Valid types are .jpg, .jpeg, .png and .gif."
    }

    //Should be good
    else
    {
        //Display name of the file
        message.innerHTML = file.name;

        //remove previous temp user upload if exists
        let prevImageLink = document.querySelector(".user-upload");
        if (prevImageLink != null)
            imageGallery.removeChild(prevImageLink);
    
        //create new image gallery item using temp URL
        let src = URL.createObjectURL(file);
        buildImageGalleryItem(src);
    }
});

//Handle image picker submission.  
const imagePickerForm = document.querySelector("#image-picker-form");
const submitBtn = document.querySelector("#image-picker-submit-btn");
const imgLabel = document.querySelector(".file-name")
const message = document.querySelector(".form-message");

//Note that an image is not uploaded to the server until this event listener finishes  
imagePickerForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    //Upload image to server if one has been supplied
    if (currImage.classList.contains("user-upload"))
    {
        const formData = new FormData(imagePickerForm);
        try
        {
            let data =
            {
                method: 'POST',
                body: formData
            }
            const response = await fetch('http://localhost:5000/upload/image-upload', data);
            let jsonResponse = await response.json();

            //Image was succesfully uploaded
            if (response.ok)
            {        
                //Get the image path
                const {thePath} = jsonResponse;
                updateImage(thePath);
            }    
            //Error occurred during upload
            else
            {
                const {msg} = jsonResponse;
                throw new Error(msg);
            }
        }

        //Error occurred
        catch(error)
        {
            message.innerHTML = error.message;
        }

    }
    else
    {
        let url = new URL(mainImage.src);
        updateImage(url.pathname);
    }

}); 

/**
 * Updates the user profile photo URL
 * @param {string} pathName the relative path to the image
 * @return none
 */
async function updateImage(pathName)
{
    //Convert formData to JSON
    let data = {
        path : pathName
    };
    data = JSON.stringify(data);

    //Attempt to POST JSON data to server
    try
    {
        //Attempt to post data
        const response = await fetch('http://localhost:5000/api/update-user-profile-picture',
        {
            method: 'POST',
            headers:
            {
                "Content-Type": "application/json"
            },
            body: data
        });

        //Redirect to url provided by server
        location.href = response.url;
    }
    //Error occurred
    catch(error)
    {
        console.log(error);
    }
}