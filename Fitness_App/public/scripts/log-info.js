/**
 * Submits user weight and body fat percentage for a given date to the server.
 */

const logInfoForm = document.querySelector("#log-info-form");
const message = document.querySelector("#success-message");

logInfoForm.addEventListener("submit", async function (event)
{
    //Prevent the page from reloading
    event.preventDefault();

    //Create new formData object with key value pairs corresponding to form input
    const formData = new FormData();
    formData.append(this[1].name, this[1].value);
    formData.append(this[2].name, this[2].value);
    formData.append(this[3].name, this[3].value);

    //package data as JSON string
    let data = {};
    formData.forEach((value, key) => (data[key] = value));
    data = JSON.stringify(data);

    //Attempt to send data to server
    try
    {
        const response = await fetch('http://localhost:5000/api/entries',
        {
            method: 'POST',
            headers:
            {
                "Content-Type": "application/json"
            },
            body: data
        });

        //Display success message and reset form
        message.innerHTML = `Succesfully logged weight of ${this[2].value} lbs and body fat of ${this[3].value}% for ${this[1].value}`;
        logInfoForm.reset();
    }

    //An error occurred.
    catch(error)
    {
        console.log(error);
    }
});