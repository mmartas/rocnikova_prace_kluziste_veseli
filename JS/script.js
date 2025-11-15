let hamMenuIcon = document.querySelector(".hamMenuIcon")
let mainNavMenu = document.querySelector(".mainNavMenu")

hamMenuIcon.addEventListener("click", function(event){
    mainNavMenu.classList.toggle("display_none_flex")

    hamMenuIcon.classList.toggle("active");
})