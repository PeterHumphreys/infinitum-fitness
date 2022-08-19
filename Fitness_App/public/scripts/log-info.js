const logInfoForm = document.querySelector("#log-info-form");
const message = document.querySelector("#success-message");

logInfoForm.addEventListener("submit", async function (event)
{
        event.preventDefault();
        //Create new formData object with key value pairs corresponding to form input
        const formData = new FormData();

        formData.append(this[1].name, this[1].value);
        formData.append(this[2].name, this[2].value);
        formData.append(this[3].name, this[3].value);

        let data = {};
        formData.forEach((value, key) => (data[key] = value));
        data = JSON.stringify(data);

        try
        {
            const response = await fetch('http://localhost:3000/api/entries',
            {
                method: 'POST',
                headers:
                {
                    "Content-Type": "application/json"
                },
                body: data
            });

            message.innerHTML = `Succesfully logged weight of ${this[2].value} lbs and body fat of ${this[3].value}% for ${this[1].value}`;
            logInfoForm.reset();
        }
        catch(error)
        {
            console.log(error);
        }
});