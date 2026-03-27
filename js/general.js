// šipka pro scroll nahoru
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

// plynulé zobrazení textu při scrollu
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});
reveals.forEach(el => observer.observe(el));