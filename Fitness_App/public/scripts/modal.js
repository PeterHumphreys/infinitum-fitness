const closeModalBtn = document.querySelector(".btn-close-modal");
const modal = document.querySelector(".modal");
const modalDialog = document.querySelector(".modal-dialog");
const modalTrigger = document.querySelector(".modal-trigger");

closeModalBtn.addEventListener("click", () =>
{
    modal.classList.remove("modal-active");
});

modalTrigger.addEventListener("click", () =>
{
    modal.classList.add("modal-active");
});

//Close modal by clicking outside of modal
document.body.addEventListener("click", (e) =>
{
    if (modal.classList.contains("modal-active") && !closeModalBtn.contains(e.target) && !modalTrigger.contains(e.target) && !modalDialog.contains(e.target))
    {
        console.log("Fired")
        modal.classList.remove("modal-active");
    }


})

