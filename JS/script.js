let hamMenuIcon = document.querySelector(".hamMenuIcon")
let mainNavMenu = document.querySelector(".mainNavMenu")
let widthValue = window.matchMedia("(min-width: 930px)")

hamMenuIcon.addEventListener("click", function(event){
    hamMenuIcon.classList.toggle("active");
    mainNavMenu.classList.toggle("active");

    if(hamMenuIcon.classList.contains("active")) {
        mainNavMenu.classList.add("box_glass_effect")
    } else {
        mainNavMenu.classList.remove("box_glass_effect")
    }
})

widthValue.addEventListener("change", function(event){
    if(widthValue.matches){
        hamMenuIcon.classList.remove("active")
        mainNavMenu.classList.remove("active", "box_glass_effect")
    }
})