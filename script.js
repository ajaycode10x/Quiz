let questions = [];
let currentQuestionIndex = 0;

// Fetch the questions from questions.json
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        displayQuestion();
    })
    .catch(error => {
        console.error('Error fetching questions:', error);
    });

function displayQuestion() {
    if (questions.length === 0) return;

    const questionObj = questions[currentQuestionIndex];
    document.getElementById("question").innerText = questionObj.question;

    // Get all option buttons and display options
    const optionButtons = document.querySelectorAll(".option-btn");
    optionButtons.forEach((btn, index) => {
        btn.innerText = questionObj.options[index];
        // Set correct answer in data attribute
        btn.dataset.correct = (questionObj.options[index] === questionObj.answer).toString();
        // Enable the buttons for answering
        btn.disabled = false;
    });

    // Clear any previous result
    document.getElementById("result").innerText = "";
}

function checkAnswer(selectedOptionIndex) {
    const selectedOption = document.querySelectorAll(".option-btn")[selectedOptionIndex];
    const resultText = document.getElementById("result");

    // Show the correct answer message
    if (selectedOption.dataset.correct === "true") {
        resultText.innerText = "Correct!";
    } else {
        resultText.innerText = "Incorrect, try again.";
    }

    // Disable buttons after answer is selected
    const optionButtons = document.querySelectorAll(".option-btn");
    optionButtons.forEach(button => button.disabled = true);

    // Auto-refresh to the next question after a delay
    setTimeout(() => {
        nextQuestion();
    }, 2000); // Delay of 2 seconds before loading the next question
}

function nextQuestion() {
    document.getElementById("result").innerText = "";  // Clear result text
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;  // Loop back to the first question after the last
    displayQuestion();
}
