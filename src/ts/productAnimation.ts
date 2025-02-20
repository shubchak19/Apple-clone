const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("slide-up");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.5,
  }
);

const animatedElements = document.querySelectorAll(".product-page, .product-card");
animatedElements.forEach((element, index) => {
  if(index) {
    observer.observe(element);
    element.classList.add("hide");
  }
});
