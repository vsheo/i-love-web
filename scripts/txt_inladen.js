
let articleScroll = document.querySelector('article')

articleLink.addEventListener('scroll', scrollAnimation)

function scrollAnimation(event) {
  event.target.classList.toggle('alternatecolor')
}
//  met innerHTML
