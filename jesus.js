const API_URL =
  "https://ethics-tutor-ai.matthewsjude15.workers.dev/";

const jesusQuestion =
  document.getElementById("jesusQuestion");

const askJesusButton =
  document.getElementById("askJesusButton");

const jesusAnswer =
  document.getElementById("jesusAnswer");

const jesusAnswerText =
  document.getElementById("jesusAnswerText");

askJesusButton.addEventListener("click", async () => {

  const question =
    jesusQuestion.value.trim();

  if (!question) {
    alert("Please type a question first.");
    return;
  }

  jesusAnswer.classList.remove("hidden");
  jesusAnswerText.textContent = "Thinking...";

  askJesusButton.disabled = true;
  askJesusButton.textContent = "Thinking...";

  try {

    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        question: question,
        perspective: "Jesus"
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Something went wrong."
      );
    }

    jesusAnswerText.innerHTML =
      formatJesusAnswer(
        data.answer ||
        "Sorry, I couldn't generate an answer."
      );

  } catch (error) {

    console.error(error);

    jesusAnswerText.textContent =
      "Sorry, something went wrong. Please try again.";

  }

  askJesusButton.disabled = false;
  askJesusButton.textContent = "Ask";
});


function formatJesusAnswer(text) {

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
