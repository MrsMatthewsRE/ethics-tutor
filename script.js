const API_URL =
  "https://ethics-tutor-ai.matthewsjude15.workers.dev/";

const questionBox =
  document.getElementById("question");

const answerSection =
  document.getElementById("answerSection");

const answerBox =
  document.getElementById("answer");

const answerTitle =
  document.getElementById("answerTitle");

const robot =
  document.getElementById("robot");

const robotStatus =
  document.getElementById("robotStatus");

const allViewsButton =
  document.getElementById("allViewsButton");

const readButton =
  document.getElementById("readButton");

const stopButton =
  document.getElementById("stopButton");


function getQuestion() {

  const question =
    questionBox.value.trim();

  if (!question) {

    alert(
      "Type your ethics question first."
    );

    questionBox.focus();

    return null;
  }

  return question;
}


function startThinking(name) {

  robot.classList.remove("speaking");

  robot.classList.add("thinking");

  robotStatus.textContent =
    `Dr Ethos is thinking about ${name}...`;
}


function stopThinking() {

  robot.classList.remove("thinking");

  robotStatus.textContent =
    "Answer ready!";
}


async function askEthicsTutor(
  perspective = "ALL"
) {

  const question = getQuestion();

  if (!question) return;


  startThinking(
    perspective === "ALL"
      ? "all the ethical views"
      : perspective
  );


  answerSection.classList.add("hidden");


  try {

    const response =
      await fetch(API_URL, {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({

          question:
            perspective === "ALL"

            ? question

            :
            `Answer this question ONLY from the perspective of ${perspective}.

Question:
${question}`

        })

      });


    const data =
      await response.json();


    if (!response.ok) {

      throw new Error(
        data.error ||
        "The AI could not answer."
      );
    }


    answerTitle.textContent =
      perspective === "ALL"

      ? "All Ethical Perspectives"

      : perspective;


    renderMarkdown(
      data.answer
    );


    answerSection.classList.remove(
      "hidden"
    );


    stopThinking();


    answerSection.scrollIntoView({
      behavior: "smooth"
    });


  } catch (error) {

    console.error(error);

    stopThinking();

    robotStatus.textContent =
      "Something went wrong.";

    answerBox.textContent =
      "Sorry, Dr Ethos couldn't answer that question. Please try again.";

    answerSection.classList.remove(
      "hidden"
    );
  }
}


/* SIMPLE MARKDOWN DISPLAY */

function renderMarkdown(text) {

  const safe =
    text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");


  const formatted =
    safe
      .replace(
        /^### (.*)$/gm,
        "<h3>$1</h3>"
      )

      .replace(
        /^## (.*)$/gm,
        "<h2>$1</h2>"
      )

      .replace(
        /^# (.*)$/gm,
        "<h1>$1</h1>"
      )

      .replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
      )

      .replace(
        /\n\n/g,
        "<br><br>"
      );


  answerBox.innerHTML =
    formatted;
}


/* ETHICS BUTTONS */

document
  .querySelectorAll(
    ".ethics-button, .thinker-button"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        askEthicsTutor(
          button.dataset.perspective
        );

      }
    );

  });


/* ALL VIEWS */

allViewsButton.addEventListener(
  "click",
  () => {

    askEthicsTutor("ALL");

  }
);


/* READ ANSWER */

readButton.addEventListener(
  "click",
  () => {

    if (
      !("speechSynthesis" in window)
    ) {

      alert(
        "Your browser doesn't support text-to-speech."
      );

      return;
    }


    window.speechSynthesis.cancel();


    const text =
      answerBox.innerText;


    const speech =
      new SpeechSynthesisUtterance(
        text
      );


    speech.rate = 0.95;
    speech.pitch = 1;


    speech.onstart = () => {

      robot.classList.add(
        "speaking"
      );

      robotStatus.textContent =
        "Dr Ethos is reading...";
    };


    speech.onend = () => {

      robot.classList.remove(
        "speaking"
      );

      robotStatus.textContent =
        "Ready for another question!";
    };


    window.speechSynthesis.speak(
      speech
    );

  }
);


/* STOP READING */

stopButton.addEventListener(
  "click",
  () => {

    window.speechSynthesis.cancel();

    robot.classList.remove(
      "speaking"
    );

    robotStatus.textContent =
      "Reading stopped.";

  }
);
