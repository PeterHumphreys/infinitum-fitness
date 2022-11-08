/**
 * Controls the navigation menu display
 */

//Get elements as variables
let nav = document.querySelector("nav"); //nav
let menuBtn = document.querySelector("#menu-btn"); //Hamburger menu button - mobile only
let expandBtn = document.querySelector("#expand-icon"); //Expand/Collapse menu icon - tablet + desktop only
let navListItems = document.querySelectorAll(".vertical-nav-list-item"); //collection of li in nav

//Open/close the menu and disable scrolling (mobile only)
menuBtn.addEventListener("click", ()=>
{
    nav.classList.toggle("nav-expanded");  
    document.body.classList.toggle("scroll-disabled");
})

//Expand/close the menu (desktop only)
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
});

//Change display for whatever item in the nav was last clicked and is thus "active"
function handleActive(item)
{
    //Remove active class from all links
    navListItems.forEach(item => {
        item.firstElementChild.classList.remove('active')});

    //Add active class to link that was clicked
    item.firstElementChild.classList.add("active");
}

//Window resize event
/*window.addEventListener('resize', ()=>
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
});*/






