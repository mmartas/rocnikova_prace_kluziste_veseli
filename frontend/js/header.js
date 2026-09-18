// document.addEventListener("DOMContentLoaded", function() {

//     let hamMenuIcon = document.querySelector(".hamMenuIcon")
//     let mainNavMenu = document.querySelector(".mainNavMenu")
//     let navBarContainer = document.querySelector(".navbar_container")
//     let ArrowToScroll = document.querySelector(".arrow_to_scroll")

//     let widthValue = window.matchMedia("(min-width: 930px)")

//     hamMenuIcon.addEventListener("click", function(event){
//         console.log("clicked");
//         hamMenuIcon.classList.toggle("active");
//         mainNavMenu.classList.toggle("active");

//         if(hamMenuIcon.classList.contains("active")) {
//             mainNavMenu.classList.add("box_glass_effect")
//             document.body.classList.add('no-scroll');
//             navBarContainer.classList.add("ham_active");
//             ArrowToScroll.classList.remove("active");
//         } else {
//             mainNavMenu.classList.remove("box_glass_effect")
//             document.body.classList.remove('no-scroll');
//             navBarContainer.classList.remove("ham_active");
//             ArrowToScroll.classList.add("active");
//         }
//     })

//     widthValue.addEventListener("change", function(event){
//         if(widthValue.matches){
//             hamMenuIcon.classList.remove("active")
//             mainNavMenu.classList.remove("active", "box_glass_effect")
//         }
//     })
// })


// Funkce, která zkontroluje, jestli už prvek existuje, a když tak spustí logiku menu
function initHeader() {
    let hamMenuIcon = document.querySelector(".hamMenuIcon");
    let mainNavMenu = document.querySelector(".mainNavMenu");
    let navBarContainer = document.querySelector(".navbar_container");

    // Pokud ještě hlavička není vložena, ukončíme funkci (zabráníme pádu)
    if (!hamMenuIcon) return; 

    console.log("Hamburger ikona úspěšně nalezena!");

    let widthValue = window.matchMedia("(min-width: 930px)");

    hamMenuIcon.addEventListener("click", function(event){
        hamMenuIcon.classList.toggle("active");
        mainNavMenu.classList.toggle("active");

        if(hamMenuIcon.classList.contains("active")) {
            mainNavMenu.classList.add("box_glass_effect");
            document.body.classList.add('no-scroll');
            navBarContainer.classList.add("ham_active");
        } else {
            mainNavMenu.classList.remove("box_glass_effect");
            document.body.classList.remove('no-scroll');
            navBarContainer.classList.remove("ham_active");
        }
    });

    widthValue.addEventListener("change", function(event){
        if(widthValue.matches){
            hamMenuIcon.classList.remove("active");
            mainNavMenu.classList.remove("active", "box_glass_effect");
            document.body.classList.remove('no-scroll');
            navBarContainer.classList.remove("ham_active");
        }
    });
}

// Zkusíme spustit hned, kdyby byla hlavička statická
document.addEventListener("DOMContentLoaded", initHeader);

// Pro jistotu zkusíme zkontrolovat i chvíli po spuštění, kdyby se vkládala dynamicky
setTimeout(initHeader, 200);