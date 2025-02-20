import { handleResize, handleSlide, initializeCarousel } from "./carousel.js";
import { debounce } from "./utils.js";
const carousel = document.querySelector("#carousel");
const leftButton = document.querySelector(".left-button");
const rightButton = document.querySelector(".right-button");
const playPauseBtn = document.querySelector(".play-pause-btn");
let intervalId = 0;
function startAutoPlay() {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
        handleSlide(1);
    }, 3000);
    playPauseBtn === null || playPauseBtn === void 0 ? void 0 : playPauseBtn.classList.add("play");
    if (carousel)
        observer.observe(carousel);
}
function stopAutoPlay() {
    clearInterval(intervalId);
    playPauseBtn === null || playPauseBtn === void 0 ? void 0 : playPauseBtn.classList.remove("play");
    intervalId = 0;
}
leftButton === null || leftButton === void 0 ? void 0 : leftButton.addEventListener("click", debounce(() => {
    stopAutoPlay();
    if (carousel)
        observer.unobserve(carousel);
    handleSlide(-1);
}, 100));
rightButton === null || rightButton === void 0 ? void 0 : rightButton.addEventListener("click", debounce(() => {
    stopAutoPlay();
    if (carousel)
        observer.unobserve(carousel);
    handleSlide(1);
}, 100));
playPauseBtn === null || playPauseBtn === void 0 ? void 0 : playPauseBtn.addEventListener("click", () => {
    if (intervalId) {
        stopAutoPlay();
        if (carousel)
            observer.unobserve(carousel);
    }
    else {
        startAutoPlay();
    }
});
window.addEventListener("resize", debounce(() => handleResize(), 100));
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            startAutoPlay();
        }
        else {
            stopAutoPlay();
        }
    });
}, { threshold: 0.5 });
initializeCarousel();
window.addEventListener("DOMContentLoaded", () => {
    if (carousel)
        observer.observe(carousel);
});
