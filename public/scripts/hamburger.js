
const openMenu = document.querySelector(".open-menu");
const menu = document.querySelector("nav");


openMenu.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});