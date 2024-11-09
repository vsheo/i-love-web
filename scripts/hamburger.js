// // https://www.w3schools.com/howto/howto_js_mobile_navbar.asp

// /* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
// function menuAppear() {
//     // alle ul die in een nav zitten
//     const all_nav = document.querySelectorAll("nav ul");
    
//     // 1 voor 1 door alle nav
//     all_nav.forEach(nav => {
//         if (nav.style.display === "block" || nav.style.display === "") {
//             nav.style.display = "none";
//         } else {
//             nav.style.display = "block";
//         }
//     });
// }


// Open het menu bij klikken op de hamburger
function menuAppear() {
    const navContainer = document.querySelector('.nav_container');
    navContainer.classList.toggle('active'); // Toggle de 'active' class op de nav-container
}

// Toggle voor submenu bij klikken op een li-item
function toggleSubmenu(element) {
    const li = element.parentElement; // Vind het li-element waar het submenu onder zit
    li.classList.toggle('active'); // Toggle de 'active' class voor het submenu
}
