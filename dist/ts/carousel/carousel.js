import { promoData } from "./promoData.js";
import { getItemWidth, translateCarousel } from "./utils.js";
const carouselContainer = document.querySelector("#carousel");
const carousel = document.querySelector(".promo-container");
const indicatorContainer = document.querySelector(".indicator-container");
let currentIndex = 0;
export function handleSlide(direction) {
    if (!carousel)
        return;
    const isAtFirstItem = currentIndex === 0;
    const isAtLastItem = currentIndex === promoData.length - 1;
    if ((direction === -1 && isAtFirstItem) ||
        (isAtLastItem && direction === 1)) {
        carousel.style.transition = "none";
        goToItem(isAtFirstItem ? promoData.length : -1);
        setTimeout(() => {
            carousel.style.transition = "transform 0.5s ease-in-out";
            currentIndex = isAtFirstItem ? promoData.length - 1 : 0;
            goToItem(currentIndex);
        }, 10);
    }
    else {
        goToItem(currentIndex + direction);
    }
}
function createItem({ image, phoneImage, name, type, data }) {
    return `
    <div class="promo">
      <a href="#carousel" class="cover-link"></a>
      <figure class="cover-image">
        <img class="desktop" src="${image}" alt="Promo Image" />
        <img class="phone" src="${phoneImage}" alt="Promo Image" />
      </figure>
      <div class="movie-info">
        <figure class="tv-icon"></figure>
        <figure class="movie-name">
          <img src="${name}" alt="Movie Name" />
        </figure>
      </div>
      <div class="promo-info">
        <p class="promo-text light">
          <span class="promo-type">${type}</span>
          <span class="bullet-point">•</span>
          ${data}
        </p>
        <div class="cta-link-wrapper">
          <a href="#carousel" class="cta-button">Stream now</a>
        </div>
      </div>
    </div>`;
}
export function initializeCarousel() {
    let allItems = "";
    let allIndicators = "";
    promoData.forEach((itemData, index) => {
        allItems += createItem(itemData);
        allIndicators += `<li id=${itemData.id} class="indicator-wrapper ${index === currentIndex ? "active" : ""}">
      <div class="indicator"></div>
    </li>`;
    });
    const lastItem = createItem(promoData[promoData.length - 1]);
    const firstItem = createItem(promoData[0]);
    allItems = lastItem + allItems + firstItem;
    if (carousel) {
        carousel.innerHTML = allItems;
        carousel.style.transition = "transform 0.5s ease-in-out";
    }
    if (indicatorContainer) {
        indicatorContainer.innerHTML += allIndicators;
        Array.from(indicatorContainer.children).forEach((indicator, index) => {
            indicator.addEventListener("click", () => {
                goToItem(index);
            });
        });
    }
    goToItem(currentIndex);
}
export function goToItem(index) {
    if (!carousel || !indicatorContainer || !carouselContainer)
        return;
    const itemWidth = getItemWidth(carousel);
    const translateValue = index * itemWidth;
    translateCarousel(carousel, translateValue);
    Array.from(carousel.children).forEach((child) => {
        child.classList.remove("active");
    });
    carousel.children[index + 1].classList.add("active");
    indicatorContainer.children[currentIndex].classList.remove("active");
    if (index >= 0 && index < promoData.length) {
        indicatorContainer.children[index].classList.add("active");
    }
    currentIndex = index;
}
let resizeTimeoutId = 0;
export function handleResize() {
    if (carousel)
        carousel.style.transition = "none";
    goToItem(currentIndex);
    clearTimeout(resizeTimeoutId);
    resizeTimeoutId = setTimeout(() => {
        if (carousel)
            carousel.style.transition = "transform 0.5s ease-in-out";
    }, 100);
}
