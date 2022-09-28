let form = document.querySelector("#form-login");
let btn = document.querySelector("#btn-login");

//Form submission event
form.addEventListener("submit", async function (event)
{
    event.preventDefault();
    //Create new formData object with key value pairs corresponding to form input
    const formData = new FormData();
    formData.append(this[0].name, this[0].value);           //Email
    formData.append(this[1].name, this[1].value);           //Password
    

    //Convert formData to JSON
    let data = {};
    formData.forEach((value, key) => (data[key] = value));
    data = JSON.stringify(data);

    //Attempt to POST JSON data to server
    try
    {
        const response = await fetch('http://localhost:4000/auth/signin',
        {
            method: 'POST',
            headers:
            {
                "Content-Type": "application/json"
            },
            body: data
        });
        //authentication successful, open main page
        if (response.ok)
        {
            location.href=response.url;
        }
        //authentication failed, display error message
        else
        {
            let userNameField = document.querySelector("#user-email");
            let passwordField = document.querySelector("#user-password")

            //Account not found
            if (response.statusText === "That account does not exist.")
            {
                showError(userNameField, response.statusText);
                hideError(passwordField);
            }
            //Account found, but wrong password
            else if (response.statusText === "Incorrect Password")
            {
                showError(passwordField, response.statusText);
                hideError(userNameField);
            }
        }
    }
    //Error occurred
    catch(error)
    {
        console.log(error);
    }
});


//Displays the error messag for a field
function showError(inputField, message)
{
    let messageEl = inputField.nextElementSibling;
    messageEl.setAttribute("style", "opacity:1");
    messageEl.textContent = message;
}

//Hides the error message for a field
function hideError(inputField)
{
    let messageEl = inputField.nextElementSibling;
    messageEl.setAttribute("style", "opacity:0");
}

