const API_URL =
  "https://ethics-tutor-ai.matthewsjude15.workers.dev/";

const philosopherButtons =
  document.querySelectorAll(".philosopher-button");

const philosopherQuestion =
  document.getElementById("philosopherQuestion");

const philosopherAnswer =
  document.getElementById("philosopherAnswer");

const philosopherAnswerTitle =
  document.getElementById("philosopherAnswerTitle");

const philosopherAnswerText =
  document.getElementById("philosopherAnswerText");

philosopherButtons.forEach((button) => {

  button.addEventListener("click", async () => {

    const question =
      philosopherQuestion.value.trim();

    const philosopher =
      button.dataset.philosopher;

    if (!question) {
      alert("Please type a question first.");
      return;
    }

    philosopherAnswer.classList.remove("hidden");

    philosopherAnswerTitle.textContent =
      philosopher;

    philosopherAnswerText.textContent =
      "Thinking...";

    try {

      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          question: question,
          perspective: philosopher
        })
      });

      const data = await response.json();

      philosopherAnswerText.innerHTML =
  formatPhilosopherAnswer(
    data.answer ||
    "Sorry, I couldn't generate an answer."
  );

    } catch (error) {

      console.error(error);

      philosopherAnswerText.textContent =
        "Sorry, something went wrong. Please try again.";
    }

  });

});
function formatPhilosopherAnswer(text) {
  return text
    .replace(/^### (.*)$/gm, "<h4>$1</h4>")
    .replace(/^## (.*)$/gm, "<h3>$1</h3>")
    .replace(/^# (.*)$/gm, "<h2>$1</h2>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br>")
    .replace(/^/, "<p>")
    .replace(/$/, "</p>");
}
