// progress carousel
/* Schrijf hier eventueel je client-side JavaScript */
const prev = document.querySelector('.previous')
const next = document.querySelector('.next')
const snapElements = document.querySelectorAll('.content li')

// aantal li in de list
let listLength = snapElements.length
console.log(listLength)

// eerste li in de ul
let currentPosition = 0

next.addEventListener("click", () => {
    currentPosition++
    
    if (currentPosition > listLength - 1) {
        currentPosition = 0
    }

    if (snapElements[currentPosition]) {
        snapElements[currentPosition].scrollIntoView({ behavior: 'smooth' })

        indicatorElements[currentPosition - 1].classList.remove('selected')
        indicatorElements[currentPosition].classList.add('selected')
    }
});

prev.addEventListener("click", () => {
    currentPosition--

    if (currentPosition < 0 ) {
        currentPosition = listLength - 1
    }

    if (snapElements[currentPosition]) {
        snapElements[currentPosition].scrollIntoView({ behavior: 'smooth' })

        indicatorElements[currentPosition + 1].classList.remove('selected')
        indicatorElements[currentPosition].classList.add('selected')
    }
});

// on snap event
// scroll eventlistener op de scroll container
// daar berekenen hoe ver gescrolled is

prev.hidden = false
next.hidden = false