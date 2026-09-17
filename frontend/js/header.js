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

// Načtení hlavička a patičky z externích souborů a obarvení aktivního odkazu v menu
document.addEventListener("DOMContentLoaded", function() {
    // 1. Zjistíme, jestli jsme na podstránce (zda URL obsahuje složku /pages/)
    const isSubpage = window.location.pathname.includes('/pages/');
    const basePath = isSubpage ? '../' : '';

    // 2. Načtení hlavičky
    fetch(basePath + 'includes/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;

            // Zjistíme název aktuálního souboru (např. 'index.html', 'price_list.html')
            const currentPath = window.location.pathname;
            let currentFile = currentPath.split('/').pop();
            if (!currentFile || currentFile === '') currentFile = 'index.html';

            // Získáme všechny odkazy v menu
            const headerLinks = document.querySelectorAll('#header-placeholder nav a');
            headerLinks.forEach(link => {
                let href = link.getAttribute('href');

                // A) Úprava cest v menu podle umístění
                if (isSubpage) {
                    if (href === 'index.html' || href === '/index.html') {
                        link.setAttribute('href', '../index.html');
                    } else if (href && href.startsWith('pages/')) {
                        link.setAttribute('href', href.replace('pages/', ''));
                    }
                }

                // B) Zjištění finálního odkazu pro porovnání
                const updatedHref = link.getAttribute('href');

                // C) Nastavení červené aktivní třídy
                // Pokud odkaz odpovídá aktuálnímu souboru, přidáme třídu "active"
                if (updatedHref && updatedHref.includes(currentFile)) {
                    link.classList.add('active');
                }
            });
        });

    // 3. Načtení patičky
    fetch(basePath + 'includes/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
});