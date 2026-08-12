const askButton = document.getElementById("askButton");

const questionBox =
  document.getElementById("question");

const answerSection =
  document.getElementById("answerSection");

const answerBox =
  document.getElementById("answer");

const loading =
  document.getElementById("loading");

const API_URL =
  "https://ethics-tutor-ai.matthewsjude15.workers.dev/";

askButton.addEventListener("click", async () => {

  const question =
    questionBox.value.trim();

  if (!question) {
    alert("Please enter an ethics question.");
    return;
  }

  answerSection.classList.add("hidden");
  loading.classList.remove("hidden");

  askButton.disabled = true;
  askButton.textContent = "Thinking...";

  try {

    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        question: question
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong.");
    }

    answerBox.textContent = data.answer;

    answerSection.classList.remove("hidden");

  } catch (error) {

    answerBox.textContent =
      "Sorry, the Ethics Tutor couldn't answer that question. Please try again.";

    answerSection.classList.remove("hidden");

    console.error(error);
  }

  loading.classList.add("hidden");

  askButton.disabled = false;
  askButton.textContent = "Ask Ethics Tutor";
});
