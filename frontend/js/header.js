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
// Posluchač pověsíme na celý dokument, takže funguje i pro dynamicky vkládaný HTML kód
document.addEventListener("click", function(event) {
    
    // Zjistíme, jestli kliknutí směřovalo na hamburger ikonu (nebo na cokoliv uvnitř ní, např. ty span čárky)
    const hamMenuIcon = event.target.closest(".hamMenuIcon");
    
    // Pokud uživatel nekliknul na hamburger, nic neděláme a končíme
    if (!hamMenuIcon) return;

    let mainNavMenu = document.querySelector(".mainNavMenu");
    let navBarContainer = document.querySelector(".navbar_container");

    // Přepínání tříd pro otevření/zavření menu
    hamMenuIcon.classList.toggle("active");
    if (mainNavMenu) {
        mainNavMenu.classList.toggle("active");
    }

    if (hamMenuIcon.classList.contains("active")) {
        if (mainNavMenu) mainNavMenu.classList.add("box_glass_effect");
        document.body.classList.add('no-scroll');
        if (navBarContainer) navBarContainer.classList.add("ham_active");
    } else {
        if (mainNavMenu) mainNavMenu.classList.remove("box_glass_effect");
        document.body.classList.remove('no-scroll');
        if (navBarContainer) navBarContainer.classList.remove("ham_active");
    }
});

// Sledování změny šířky okna (zůstává stejné)
let widthValue = window.matchMedia("(min-width: 930px)");
widthValue.addEventListener("change", function(event) {
    if (widthValue.matches) {
        let hamMenuIcon = document.querySelector(".hamMenuIcon");
        let mainNavMenu = document.querySelector(".mainNavMenu");
        let navBarContainer = document.querySelector(".navbar_container");

        if (hamMenuIcon) hamMenuIcon.classList.remove("active");
        if (mainNavMenu) mainNavMenu.classList.remove("active", "box_glass_effect");
        document.body.classList.remove('no-scroll');
        if (navBarContainer) navBarContainer.classList.remove("ham_active");
    }
});