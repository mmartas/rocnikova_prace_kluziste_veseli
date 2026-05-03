let hamMenuIcon = document.querySelector(".hamMenuIcon")
let mainNavMenu = document.querySelector(".mainNavMenu")
let navBarContainer = document.querySelector(".navbar_container")

let widthValue = window.matchMedia("(min-width: 930px)")

hamMenuIcon.addEventListener("click", function(event){
    hamMenuIcon.classList.toggle("active");
    mainNavMenu.classList.toggle("active");

    if(hamMenuIcon.classList.contains("active")) {
        mainNavMenu.classList.add("box_glass_effect")
        document.body.classList.add('no-scroll');
        navBarContainer.classList.add("ham_active");
        ArrowToScroll.classList.remove("active");
    } else {
        mainNavMenu.classList.remove("box_glass_effect")
        document.body.classList.remove('no-scroll');
        navBarContainer.classList.remove("ham_active");
        ArrowToScroll.classList.add("active");
    }
})

widthValue.addEventListener("change", function(event){
    if(widthValue.matches){
        hamMenuIcon.classList.remove("active")
        mainNavMenu.classList.remove("active", "box_glass_effect")
    }
})