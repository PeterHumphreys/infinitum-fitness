//Get elements as variables
let nav = document.querySelector("nav"); //nav
let menuBtn = document.querySelector("#menu-btn"); //Hamburger menu button - mobile only
let expandBtn = document.querySelector("#expand-icon"); //Expand/Collapse menu icon - tablet + desktop only
let navListItems = document.querySelectorAll(".vertical-nav-list-item"); //collection of li in nav

menuBtn.addEventListener("click", ()=>
{
    nav.classList.toggle("nav-expanded");  
    document.body.classList.toggle("scroll-disabled");

})

//Event that user clicks the expand/close icon
expandBtn.addEventListener("click", () =>
{ 
    //add/remove "closed" class to svg
    expandBtn.classList.toggle("open-icon");
    //add nav-closed class to the nav
    nav.classList.toggle("nav-closed");    
});

//Add event listener for nav link being clicked
navListItems.forEach(item => 
    {
        item.addEventListener("click", () => 
        {
            handleActive(item)
        }); 
    }
);

//H
function handleActive(item)
{
    //Remove active class from all links
    navListItems.forEach(item => {
        item.firstElementChild.classList.remove('active')});

    //Add active class to link that was clicked
    item.firstElementChild.classList.add("active");
}

//Window resize event
window.addEventListener('resize', ()=>
{
    const BREAKPOINT_TABLET = 760;
    const BREAKPOINT_DESKTOP = 1026;
    let width = window.innerWidth;
    if (width >= BREAKPOINT_TABLET)
    {
        console.log("Tablet")
    }
    else{
        console.log("Mobile")
    }
});





//Determine current URL 
window.addEventListener('load', () => {
    //Get current page. i.e. "/my-page"
    let currURL = window.location.href;
    let currPage = currURL.substring(currURL.lastIndexOf('/'));


    /*navListItems.forEach(item => 
        {
            //Get link href page. i.e. "/my-other-page"
            let link = item.firstElementChild;
            let href = link.href;
            let linkPage = href.substring(href.lastIndexOf('/'));
            //alert("Link Page = " + linkPage + "\n page = " + currPage)
            //Check if current link points to current page and add active status if so
            if (linkPage == currPage)
                item.classList.add("active");
            else if (currPage == "/" && linkPage == "/home")
                item.firstElementChild.classList.add("active");

        })*/
});






