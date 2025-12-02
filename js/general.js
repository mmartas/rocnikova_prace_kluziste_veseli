let ArrowToScroll = document.getElementById("arrow_top_scroll")

window.addEventListener("scroll", function(event){
    if(this.window.scrollY > 2000){
        ArrowToScroll.classList.add("active")
    } else {
        ArrowToScroll.classList.remove("active")
    }
});

ArrowToScroll.addEventListener("click", function(event){
    (document.scrollingElement || document.documentElement).scrollTo({
        top: 0,
        behavior: "smooth"
    });
});