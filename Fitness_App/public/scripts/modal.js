/**
 * Opens and closes a modal
 */

const closeModalBtn = document.querySelector(".btn-close-modal");
const modal = document.querySelector(".modal");
const modalDialog = document.querySelector(".modal-dialog");
const modalTrigger = document.querySelector(".modal-trigger");

//Close the modal by clicking button
closeModalBtn.addEventListener("click", () =>
{
    modal.classList.remove("modal-active");
});

//Show the modal by clicking button
modalTrigger.addEventListener("click", () =>
{
    modal.classList.add("modal-active");
});

//Close modal by clicking outside of modal
document.body.addEventListener("click", (e) =>
{
    //If the modal is active and the user clicks outside the modal boundary, close the modal
    if (modal.classList.contains("modal-active") && !closeModalBtn.contains(e.target) 
    && !modalTrigger.contains(e.target) && !modalDialog.contains(e.target))
    {
        modal.classList.remove("modal-active");
    }


})

