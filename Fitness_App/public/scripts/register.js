/**
 * Submits the registration form to the server
 * Upon submission, control is passed to the image-picker script
 * to submit the user profile photo data to the server before redirecting to home page.
 */

let registerForm = document.querySelector("#form-register");
let btn = document.querySelector("#btn-sign-up");

//Form submission event
registerForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    //Create new formData object with key value pairs corresponding to form input
    const formData = new FormData();
    formData.append(this[0].name, this[0].value);           //First name
    formData.append(this[1].name, this[1].value);           //Last Name
    formData.append(this[2].name, this[2].value);           //Email
    formData.append(this[3].name, this[3].value);           //Password
    formData.append(this[5].name, this[5].value);           //DOB
    formData.append(this[6].name, this[6].value.charAt(0)); //Sex
    formData.append("user_height", 
        convertHeight(this[7].value, this[8].value));       //Height
    formData.append(this[9].name, this[9].value);           //Weight

    formData.append(this[10].name, this[10].value);         //BFP    
    formData.append(this[11].name, this[11].value);         //Activity Level
    formData.append(this[12].name, this[12].value);         //Fitness Goal
    formData.append("historical_date", 
        new Date().toISOString().split('T')[0])             //Today's date yyyy-mm-dd
    
    //Convert formData to JSON
    let data = {};
    formData.forEach((value, key) => (data[key] = value));
    data = JSON.stringify(data);

    //Attempt to POST JSON data to server
    try
    {
        const response = await fetch('http://localhost:5000/api/register',
        {
            method: 'POST',
            headers:
            {
                "Content-Type": "application/json"
            },
            body: data
        });

        //User was created
        if (response.ok)
        {
            //Hide and disable form
            registerForm.classList.add("form-inactive");
            registerForm.disabled = true;
            registerForm.remove();

            //open optional section (as of now, just the step of setting user profile photo)
            let stepOptional = document.querySelector(".step-optional");
            stepOptional.classList.add("step-active");
        }

        //An error occurred
        else
        {
            throw new Error("Something went wrong.  Please refresh the page and try again.")
        }
    }
    //Error occurred
    catch(error)
    {
        console.log(error);
    }
});

//Convert height from ft/inches to inches
function convertHeight(feet, inches)
{
    return (Number(feet) * 12) + Number(inches);
}
