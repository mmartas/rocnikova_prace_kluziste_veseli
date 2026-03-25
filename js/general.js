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


const reveals = document.querySelectorAll(".reveal_left, .reveal_right");

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target); // spustí jen jednou
    }
  });
}, {
  threshold: 0.1 // kolik % objektu musí být vidět, aby se spustil efekt
});

// pozoruj každý element
reveals.forEach(el => observer.observe(el));