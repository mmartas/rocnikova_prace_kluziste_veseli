let ArrowToScroll = document.getElementById("arrow_top_scroll")

window.addEventListener("scroll", function(event){
    ArrowToScroll.hidden = this.window.scrollY < 2000;
});

ArrowToScroll.addEventListener("click", function(event){
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});