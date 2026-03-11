document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("availability-toggle");
  const note = document.getElementById("availability-note");

  if (!toggleButton || !note) {
    return;
  }

  let showingStatus = false;

  toggleButton.addEventListener("click", () => {
    showingStatus = !showingStatus;

    if (showingStatus) {
      note.textContent = "I am open to internships and new opportunities.";
      toggleButton.textContent = "Hide status";
      return;
    }

    note.textContent = "Click the button to see my current status.";
    toggleButton.textContent = "Show status";
  });
});
