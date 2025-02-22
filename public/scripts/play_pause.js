// Select the video element
const video = document.getElementsByClassName("video");

// Add click event listener to the video
video.addEventListener("click", function() {
    // Toggle play/pause
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
});
