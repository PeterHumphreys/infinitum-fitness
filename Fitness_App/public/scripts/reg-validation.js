/**
 * Handles all validation for the user registration form
 */


//Step divs
const steps = document.querySelectorAll(".step");

//Initialize current step to 0
let currentStep = 0;

//Buttons
const prevBtn = document.querySelector("#btn-prev");
const nextBtn = document.querySelector("#btn-next");
const signUpBtn = document.querySelector('#btn-sign-up');

//Form inputs
const firstNameEl = document.querySelector("#first-name");
const lastNameEl = document.querySelector("#last-name");
const passwordEl = document.querySelector("#password");
const showPasswordEl = document.querySelector("#show-password");
const emailEl = document.querySelector("#email");
const dobEl = document.querySelector("#dob");
const sexEl = document.querySelector("#sex");
const heightParentEl = document.querySelector("#height-inputs");
const heightFtEl = document.querySelector("#height-ft");
const heightInEl = document.querySelector("#height-in");
const weightEl = document.querySelector("#weight");
const bfpEl = document.querySelector("#bfp");
const activityLevelEl = document.querySelector("#activity-level");
const fitnessGoalEl = document.querySelector("#fitness-goal");

//Constant in case more steps are added into the registration process
const LAST_STEP = 2;

//Previous button
prevBtn.addEventListener("click", (e)=>
{
    e.preventDefault();
    //Stepping back on step 1 or greater
    if (currentStep > 0)
    {
        //toggle step active statuses and decrement current step
        steps[currentStep].classList.toggle('step-active');
        currentStep--;
        steps[currentStep].classList.toggle('step-active');

        //Step 0
        if (currentStep === 0)
        {
            //Hide/disable previous button
            prevBtn.classList.toggle("btn-hidden")
            prevBtn.disabled = true;
        }

        //Step N-1
        if (currentStep === LAST_STEP - 1)
        {
            //Show/enable next buton
            nextBtn.classList.toggle("btn-hidden")
            nextBtn.disabled = false;

            //Hide/disable sign up buttons
            signUpBtn.classList.toggle("btn-hidden")
            signUpBtn.disabled = true;
        }
    }
});

//Next button
nextBtn.addEventListener("click", async (e)=>
{
    e.preventDefault();
    //Step to the next step in the form if all fields are valid
    if (currentStep < LAST_STEP && await isValidStep(currentStep))
    {
        steps[currentStep].classList.toggle('step-active');
        currentStep++;
        steps[currentStep].classList.toggle('step-active');    

        //2nd step
        if (currentStep === 1)
        {
            prevBtn.classList.toggle("btn-hidden")
            prevBtn.disabled = false;
        }

        //Step N
        if (currentStep === LAST_STEP)
        {
            //Disable/hide Next button
            nextBtn.classList.toggle("btn-hidden")
            nextBtn.disabled = true;

            //Enable/show Sign Up button
            signUpBtn.classList.toggle("btn-hidden")
            signUpBtn.disabled = false;
        }
    }

});

//Show password checkbox 
showPasswordEl.addEventListener("change", () =>
{   
    //Show password as text
    if (passwordEl.type === "password")
    {
        passwordEl.type = "text"
    }
    //Hide password
    else
    {
        passwordEl.type = "password";
    }
});


/**Form Validation */
//Checks that all input fields on a given step are validated
async function isValidStep(step)
{
    //Validate step 0
    if (step === 0)
    {
        let validFirstName = checkFirstName(),
        validLastName = checkLastName(),
        validEmail = await checkEmail(), //async because we have to make an API request to server
        validPassword = checkPassword();

        return (validFirstName && validLastName && validEmail && validPassword);
    }
    //Validate step 1
    else if (step === 1)
    {
        let validDOB = checkDOB();
        let validSex = checkSex();
        let validHeight = checkHeight();
        let validWeight = checkWeight();
        let validBFP = checkBFP();
        return (validDOB && validSex && validHeight && validWeight && validBFP);
    }
    //Validate step 2
    else
    {
        let validActivityLevel = checkActivityLevel();
        let validFitnessGoal = checkFitnessGoal();
        return (validActivityLevel && validFitnessGoal);
    }
}

//Hides the error message for a field
function hideError(inputField)
{
    let messageEl = inputField.nextElementSibling;
    messageEl.setAttribute("style", "opacity:0");
}

//Displays the error message for a field
function showError(inputField, message)
{
    let messageEl = inputField.nextElementSibling;
    messageEl.setAttribute("style", "opacity:1");
    messageEl.textContent = message;
}

/**Individual input checks */
//Validates the first name input
function checkFirstName()
{
    let valid = false;
    //Check if first name is blank
    if(firstNameEl.value === "")
    {
        showError(firstNameEl, "First Name cannot be blank");
    }
    else
    {
        valid = true
        hideError(firstNameEl);
    }
    return valid;
}

//Validates the last name input
function checkLastName()
{
    let valid = false;
    //check if last name is blank
    if(lastNameEl.value === "")
    {
        showError(lastNameEl, "Last Name cannot be blank");
    }
    else
    {
        valid = true
        hideError(lastNameEl);
    }
    return valid;
}

//Validates the email input
async function checkEmail()
{
    let valid = false;

    //check if email is blank
    if(emailEl.value === "")
    {
        showError(emailEl, "Email cannot be blank");
    }

    else
    {
        //Attempt to fetch the provided email from the server if it exists
        let dbEmail = await fetch(`/api/users-by-email/${emailEl.value}`);
        let response = await dbEmail.json();

        //Email is already registered
        if (response !== null)
        {
            showError(emailEl, "An account is already registered with that email");
        }
        //Valid email
        else
        {
            valid = true
            hideError(emailEl);
        }
    }
    return valid;
}

//Validates the password input
function checkPassword()
{
    let valid = false;
    //check if password is blank
    if(passwordEl.value === "")
    {
        showError(passwordEl, "Password cannot be blank");
    }
    else
    {
        valid = true
        hideError(passwordEl);
    }
    return valid;
}

//Validates the date of birth input
function checkDOB()
{
    let valid = false;
    //Check if DOB is blank
    if(!dobEl.value)
    {
        showError(dobEl, "Date of Birth cannot be blank");
    }
    else
    {
        valid = true
        hideError(dobEl);
    }
    return valid;
}

//Validates the sex input
function checkSex()
{
    let valid = false;
    //check if sex is blank
    if(!sexEl.value)
    {
        showError(sexEl, "Sex cannot be blank");
    }
    else
    {
        valid = true
        hideError(sexEl);
    }
    return valid;
}

//Validates the height input
function checkHeight()
{
    let valid = false;
    //check if height is blank
    if(heightInEl.value === "" && heightFtEl.value === "")
    {
        showError(heightParentEl, "Height cannot be blank");
    }
    //check that height is a Number and within valid range [0'0" - 8'11")
    else if (heightInEl.value === "" || heightFtEl.value === "" || heightFtEl.value < 0 
        || heightFtEl.value > 8 || heightInEl.value < 0 || heightInEl.value >= 12)
    {
        showError(heightParentEl, "Enter a valid height");
    }
    else
    {
        valid = true
        hideError(heightParentEl);
    }
    return valid;
}

//Validates the weight input
function checkWeight()
{
    let valid = false;
    //check if weight is blank
    if(weightEl.value === "")
    {
        showError(weightEl, "Weight cannot be blank");
    }
    //Check that the weight is within a valid range (0 - 600 lbs)
    else if (weightEl.value < 0 || weightEl.value > 600)
    {
        showError(weightEl, "Enter a valid number");
    }
    else
    {
        valid = true
        hideError(weightEl);
    }
    return valid;
}

//Validates the body fat percentage input
function checkBFP()
{
    let valid = false;
    //check if bfp is blank
    if(bfpEl.value === "")
    {
        showError(bfpEl, "Body fat percentage cannot be blank");
    }
    //Check that bfp is within valid range [0 - 100%]
    else if (bfpEl.value < 0 || bfpEl.value > 100)
    {
        showError(bfpEl, "Enter a valid number");
    }
    else
    {
        valid = true
        hideError(bfpEl);
    }
    return valid;
}

//Validates the activity level input
function checkActivityLevel()
{
    let valid = false;
    //check if activity level is blank
    if (!activityLevelEl.value)
    {
        showError(activityLevelEl, "Please select an activity level")
    }
    else
    {
        valid = true;
        hideError(activityLevelEl);
    }
    return valid;
}

//Validates the fitness goal input
function checkFitnessGoal()
{
    let valid = false;
    //check if fitness goal is blank
    if (!fitnessGoalEl.value)
    {
        showError(fitnessGoalEl, "Please select a fitness goal")
    }
    else
    {
        valid = true;
        hideError(fitnessGoalEl);
    }
    return valid;
}