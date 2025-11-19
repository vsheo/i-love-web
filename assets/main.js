const detailsElements = document.querySelectorAll(".details-container details");

detailsElements.forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (detail.open) {
      detailsElements.forEach((other) => {
        if (other !== detail) {
          other.open = false;
        }
      });
    }
  });
});
