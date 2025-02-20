export function getItemWidth(carousel) {
    if (!carousel)
        return 0;
    return carousel.offsetWidth / carousel.children.length;
}
export function translateCarousel(carousel, value) {
    if (carousel) {
        carousel.style.transform = `translateX(${-value}px)`;
    }
}
export function debounce(func, wait) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), wait);
    };
}
