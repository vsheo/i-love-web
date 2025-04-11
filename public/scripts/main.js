// ------------------------------------------------------------------------ header scroll ------------------------------------------------------------------------
// https://www.cssscript.com/show-hide-navbar-scroll-down-up/

const body = document.body;
const header = document.querySelector("header");
const main = document.querySelector("main");
const headerHeight = document.querySelector("header").offsetHeight;

// main.style.top = headerHeight + "px";
let lastScroll = 0;
window.addEventListener("scroll", () => {
  let currentScroll = window.pageYOffset;
  if (currentScroll - lastScroll > 0) {
    header.classList.add("scroll-down");
    header.classList.remove("scroll-up");
  } else {
    // scrolled up -- header show
    header.classList.add("scroll-up");
    header.classList.remove("scroll-down");
  }
  lastScroll = currentScroll;
})
// ------------------------------------------------------------------------ header scroll ------------------------------------------------------------------------
// ------------------------------------------------------------------------ intersection observer ------------------------------------------------------------------------
// https://www.youtube.com/watch?v=2IbRtjez6ag&t=50s
// alle article selecteren
const articles = document.querySelectorAll(".check-out")

// intersection observer aanmaken
const observer = new IntersectionObserver(entries => {
    // console.log(entries)
    entries.forEach(entry => {
        // de class wordt aan de article toegevoegd, of weg gehaald, zodra het eerste gedeelte van de article op beeld komt.
        entry.target.classList.toggle("animation1", entry.isIntersecting)
        // nadat de article in beeld is gaat het niet meer weg
        if (entry.isIntersecting) observer.unobserve(entry.target)
    })
}, {
    // alleen als de helft van de article op beeld past wordt de class aan de article toegevoegd
    threshold: 0.3,
}
);

// intersection observer toepassen op elke article
articles.forEach(article => {
    observer.observe(article)
})
// ------------------------------------------------------------------------ intersection observer ------------------------------------------------------------------------
// ------------------------------------------------------------------------ progress carousel ------------------------------------------------------------------------
// op de pagina zijn er meerdere containers
// elke container heeft zijn eigen buttone en li
// door de queery selectors in per container uit te voeren, werken de prev & next buttons alleen voor de li in dezefde container
document.querySelectorAll(".container").forEach((container) => {
    const prev = container.querySelector(".previous");
    const next = container.querySelector(".next");
    const snapElements = container.querySelectorAll(".content li");

    // aantal li in de list
    let listLength = snapElements.length;
    // console.log(listLength)

    // eerste li in de ul
    let currentPosition = 0;

    if (next && prev) {
        next.addEventListener("click", () => {
            currentPosition++;

            if (currentPosition > listLength - 1) {
                currentPosition = 0;
            }

            if (snapElements[currentPosition]) {
                snapElements[currentPosition].scrollIntoView({
                    behavior: "smooth",
                });
            }
        });

        prev.addEventListener("click", () => {
            currentPosition--;

            if (currentPosition < 0) {
                currentPosition = listLength - 1;
            }

            if (snapElements[currentPosition]) {
                snapElements[currentPosition].scrollIntoView({
                    behavior: "smooth",
                });
            }
        });
    }

    // on snap event
    // scroll eventlistener op de scroll container
    // daar berekenen hoe ver gescrolled is

    prev.hidden = false
    next.hidden = false
});

// ------------------------------------------------------------------------ progress carousel ------------------------------------------------------------------------
// ------------------------------------------------------------------------ menu details ------------------------------------------------------------------------
const allDetails = document.querySelectorAll(".menu details")

allDetails.forEach((details) => {
    details.addEventListener("toggle", (e) => {
        // console.log(e.target)
        // als de geklikte detaile element open is
        if (e.target.open) {
            // loop door alle details elementen
            allDetails.forEach((other) => {
                // console.log(other)
                // elke details element die niet geklikt is
                if (other !== e.target) {
                    // wordt dicht gemaakt
                    other.open = false;
                }
            });
        }
    });
});
// ------------------------------------------------------------------------ menu details ------------------------------------------------------------------------



