// filepath: /Apple-clone/Apple-clone/src/ts/search.ts
const searchBtn = document.querySelector(".search-icon");
const submitBtn = document.querySelector(".search-submit-icon");
const navCloseBtn = document.querySelector(".close-icon");
const searchBar = document.querySelector(
  ".search-icon-wrapper"
) as HTMLElement | null;
const navContainer = document.querySelector(".nav-box-container");
const recentWrapper = document.querySelector(".recent-search-wrapper");
const recentContainer = document.querySelector(
  ".recent-container"
) as HTMLElement | null;
const searchInput = document.querySelector(
  ".search-input"
) as HTMLInputElement | null;
const cancelBtnContainer = document.querySelector(".cancel-btn-container");
const curtain = document.querySelector(".curtain");
const header = document.querySelector(".header") as HTMLElement | null;
const menuBtn = document.querySelector(".menu-btn");

export function handleSearchAnimation(close = false) {
  if (!curtain) return;
  if (close) {
    curtain.classList.remove("open-search");
  } else {
    curtain.classList.add("open-search");
    if (searchInput) searchInput.focus();
  }
}

function handleMobileSearchAnimation(close = false) {
  if (navContainer && recentContainer && header && cancelBtnContainer) {
    if (close) {
      navContainer.classList.remove("nav-hide");
      recentContainer.classList.remove("recent-show");
      header.style.transform = "translateY(0)";
      cancelBtnContainer.classList.remove("cancel-show");
    } else {
      if (window.matchMedia("(max-width: 1100px)").matches) {
        navContainer.classList.add("nav-hide");
        recentContainer.classList.add("recent-show");
        header.style.transform = "translateY(-3.5em)";
        cancelBtnContainer.classList.add("cancel-show");
      }
    }
  }
}

export function closeSearch() {}

function setAnimationDelay(
  target: HTMLElement[] | HTMLElement,
  delay: number,
  additionalDelay = 0
) {
  if (target instanceof HTMLElement) {
    target.style.animationDelay = `${delay + additionalDelay}ms`;
    return delay + additionalDelay;
  } else {
    const computedStyle = window.getComputedStyle(target[0]);
    const totalDuration =
      parseFloat(computedStyle.animationDuration) * 1000 + additionalDelay;
    target.forEach((element, index) => {
      const delayValue = ((totalDuration * delay) / 100) * index;
      element.style.animationDelay = `${delayValue}ms`;
    });
    return ((totalDuration * delay) / 100) * target.length - 1;
  }
}

function handleAnimationDelay(reverse = false) {
  if (!navContainer || !recentWrapper) return;
  const navItems = Array.from(navContainer.children) as HTMLElement[];
  const recentSearch = Array.from(recentWrapper.children) as HTMLElement[];

  if (reverse) {
    setAnimationDelay(navItems, 15);
    setAnimationDelay(recentSearch, 0);
  } else {
    let delay = setAnimationDelay(navItems.reverse(), 15);
    if (recentContainer) delay = setAnimationDelay(recentContainer, 30, delay);
    delay = setAnimationDelay(recentSearch, 15, delay);
    if (searchBar) setAnimationDelay(searchBar, 0, delay);
  }
}

function handleNavAnimation(reverse = false) {
  if (!navContainer) return;
  const navItems = Array.from(navContainer.children) as HTMLElement[];
  navItems.forEach((item) => {
    if (reverse) {
      item.classList.remove("shrink");
      item.classList.add("expand");
    } else {
      item.classList.add("shrink");
      item.classList.remove("expand");
    }
  });
}

searchBtn?.addEventListener("click", () => {
  handleAnimationDelay();
  handleNavAnimation();
  handleSearchAnimation();
});

navCloseBtn?.addEventListener("click", () => {
  handleAnimationDelay(true);
  handleNavAnimation(true);
  handleSearchAnimation(true);
});

menuBtn?.addEventListener("click", () => {
  header && header.classList.toggle("open-menu");
});

searchInput?.addEventListener("click", () => handleMobileSearchAnimation());

cancelBtnContainer?.addEventListener("click", () =>
  handleMobileSearchAnimation(true)
);

submitBtn?.addEventListener("click", (e) => {
  e.preventDefault();
});
