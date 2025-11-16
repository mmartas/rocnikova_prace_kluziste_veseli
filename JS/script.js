let hamMenuIcon = document.querySelector(".hamMenuIcon")
let mainNavMenu = document.querySelector(".mainNavMenu")

hamMenuIcon.addEventListener("click", function(event){
    hamMenuIcon.classList.toggle("active");
    mainNavMenu.classList.toggle("active");

    if(hamMenuIcon.classList.contains("active")) {
        mainNavMenu.classList.add("box_glass_effect")
    } else {
        mainNavMenu.classList.remove("box_glass_effect")
    }
})