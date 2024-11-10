
let questions = [];
let currentQuestionIndex = 0;

// Fetch the questions from questions.json
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        displayQuestion();
    });

function displayQuestion() {
    const questionObj = questions[currentQuestionIndex];
    document.getElementById("question").innerText = questionObj.question;
    const optionButtons = document.querySelectorAll(".option-btn");
    optionButtons.forEach((btn, index) => {
        btn.innerText = questionObj.options[index];
        btn.dataset.correct = questionObj.options[index] === questionObj.answer;
    });
}

function checkAnswer(selectedOptionIndex) {
    const selectedOption = document.querySelectorAll(".option-btn")[selectedOptionIndex];
    const resultText = document.getElementById("result");
    if (selectedOption.dataset.correct === "true") {
        resultText.innerText = "Correct!";
    } else {
        resultText.innerText = "Incorrect, try again.";
    }
}

function nextQuestion() {
    document.getElementById("result").innerText = "";
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    displayQuestion();
}
