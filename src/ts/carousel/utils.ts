export function getItemWidth(carousel: HTMLElement | null) {
  if (!carousel) return 0;
  return carousel.offsetWidth / carousel.children.length;
}

export function translateCarousel(carousel: HTMLElement | null, value: number) {
  if (carousel) {
    carousel.style.transform = `translateX(${-value}px)`;
  }
}

export function debounce(func: Function, wait: number){
let timeoutId: number | undefined;
return function (...args:any[]){
  clearTimeout(timeoutId);
  timeoutId = setTimeout(()=> func(...args), wait);
}
}