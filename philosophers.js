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

      philosopherAnswerText.textContent =
        data.answer ||
        "Sorry, I couldn't generate an answer.";

    } catch (error) {

      console.error(error);

      philosopherAnswerText.textContent =
        "Sorry, something went wrong. Please try again.";
    }

  });

});
