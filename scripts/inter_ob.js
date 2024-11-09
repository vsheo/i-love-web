// https://www.youtube.com/watch?v=2IbRtjez6ag&t=50s

// alle article selecteren
const articles = document.querySelectorAll("article")

// intersection observer aanmaken
const observer = new IntersectionObserver(entries => {
    console.log(entries)
    entries.forEach(entry => {
        // de class wordt aan de article toegevoegd, of weg gehaald, zodra het eerste gedeelte van de article op beeld komt.
        entry.target.classList.toggle("animation1", entry.isIntersecting)
        // nadat de article in beeld is gaat het niet meer weg
        if (entry.isIntersecting) observer.unobserve(entry.target)
    })
}, {
    // alleen als de helft van de article op beeld past wordt de class aan de article toegevoegd
    threshold: 0.5,
}
);

// intersection observer toepassen op elke article
articles.forEach(article => {
    observer.observe(article)
})
