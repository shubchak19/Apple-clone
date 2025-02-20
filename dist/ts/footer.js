"use strict";
const footerNavHeading = document.querySelectorAll(".footer-nav-heading");
Array.from(footerNavHeading).forEach((element) => {
    element.addEventListener("click", () => {
        let footerNav = element.parentElement;
        if (footerNav) {
            if (footerNav.classList.contains("footer-nav-open")) {
                footerNav.classList.remove("footer-nav-open");
            }
            else {
                footerNav.classList.add("footer-nav-open");
            }
        }
    });
});
