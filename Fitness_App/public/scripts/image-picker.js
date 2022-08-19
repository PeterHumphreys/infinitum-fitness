


//Gallery
window.addEventListener("load", ()=>
{
    mainImage.src = currImage.src;
    
})

const IMG_GAP_TOTAL_WIDTH = 62.5;
let prevArrow = document.querySelector("#prev-arrow")
let nextArrow = document.querySelector("#next-arrow")
let imageGallery = document.querySelector(".image-gallery");

let imageLinks = document.querySelectorAll(".image-gallery a");
let imagePaths = document.querySelectorAll(".image-gallery img");

let currImageLink = document.querySelector(".image-gallery a.selected-link");
let currImage = document.querySelector(".image-gallery a.selected-link img");

let mainImage = document.querySelector(".current-selected-image");

const MAX_FILE_SIZE = 1000000;
const VALID_FILE_TYPES = /jpeg|jpg|png|gif/;

let numImages = imagePaths.length;
let xLoc = 0; //value of image Gallery translateX property
let currIndex = 0;//furthest image to left that is visible

prevArrow.addEventListener("click", ()=>
{
    if (currIndex > 0)
    {
        move(IMG_GAP_TOTAL_WIDTH);
        currIndex--;
        console.log(currIndex)
    }
});

nextArrow.addEventListener("click", ()=>
{
    if (currIndex < numImages)
    {
        move(-IMG_GAP_TOTAL_WIDTH);
        currIndex++;
        console.log(currIndex)
    }
});

let move = (delta) =>
{
    imageGallery.setAttribute("style", `transform: translateX(${xLoc + delta}px)`);
    xLoc += delta;
}

imageLinks.forEach((element) => 
{
    element.addEventListener("click", () =>
    {
        handleCurrentSelection(element);
    })
});

function handleCurrentSelection(element)
{
    if (!element.classList.contains("selected-link"))
    {
        element.classList.toggle("selected-link")
        currImageLink.classList.toggle("selected-link")
        currImageLink = element;
        currImage = currImageLink.querySelector("img");
        //if this is user uploaded image, append class to currImage
        if (currImageLink.classList.contains("user-upload"))
        {
            currImage.classList.add("user-upload")
        }
        mainImage.src = currImage.src;
    }
}

function buildImageGalleryItem(src)
{

    let newImage = document.createElement("img");
    
    newImage.src = src;

    //create <a> tag
    let imgLink = document.createElement("a");
    imgLink.setAttribute("href", "#");
    imgLink.classList.add("user-upload");

    //create div.overlay
    let divOverlay = document.createElement("div");
    divOverlay.classList.add("overlay", "circle");

    //append img to div.overlay
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

//File upload
let btnFile = document.querySelector(".btn-file");
let fileUpload = document.querySelector("input[type=file]");
btnFile.addEventListener("click", (e)=>
{
    e.preventDefault();
    fileUpload.click();
});

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
        message.innerHTML = file.name;

        //remove previous temp user upload if exists
        let prevImageLink = document.querySelector(".user-upload");
        if (prevImageLink != null)
            imageGallery.removeChild(prevImageLink);
    
        //create new image using temp URL
        let src = URL.createObjectURL(file);
        buildImageGalleryItem(src);
    }
});

//Handle Submission
const imagePickerForm = document.querySelector("#image-picker-form");
const submitBtn = document.querySelector("#image-picker-submit-btn");
const imgLabel = document.querySelector(".file-name")
const message = document.querySelector(".form-message");

imagePickerForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    //Upload image 
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
            const response = await fetch('http://localhost:3000/upload/image-upload', data);

            //message.innerHTML = "Succesfully uploaded image"

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
        const response = await fetch('http://localhost:3000/api/update-user-profile-picture',
        {
            method: 'POST',
            headers:
            {
                "Content-Type": "application/json"
            },
            body: data
        });
        location.href = response.url;
    }
    //Error occurred
    catch(error)
    {
        console.log(error);
    }
}