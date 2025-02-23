document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const homePage = document.getElementById("home-page");
    const instructionsPage = document.getElementById("instructions-page");
    const testPage = document.getElementById("test-page");
    const reviewPage = document.createElement("div"); // Create review page dynamically
    const userMatric = document.getElementById("user-matric");
    const userMatricTest = document.getElementById("user-matric-test");
    const startTestBtn = document.getElementById("start-test");
    const questionText = document.getElementById("question-text");
    const optionsDiv = document.getElementById("options");
    const questionIconsDiv = document.getElementById("question-icons");
    const saveButton = document.getElementById("save");
    const submitButton = document.getElementById("submit-test");
    const timerDisplay = document.createElement("div");

    let currentQuestion = 1;
    const totalQuestions = 30;
    let timeLeft = 10 * 60; // 15 minutes in seconds
    let timerInterval;
    const answers = {}; // Store user answers

    const questions = [
        { type: "mcq", question: "Which of the following is not a time management tool?", options: ["A) Timetable", "B) Organizer", "C) Timepiece", "D) To-do list"], answer: "D" },
        { type: "fill_blank", question: "__________ is a tabulated list of the times at which events or activities are required to occur.", answer: "Timetable" },
        { type: "fill_blank", question: "__________ is the conscious experience of duration, the period in which an action or event occurred.", answer: "Time" },
        { type: "fill_blank", question: "__________ is also a dimension representing a succession of such actions or events.", answer: "Time" },
        { type: "fill_blank", question: "__________ is the skillful handling or use of resources such as people (human capital), money, materials, and time.", answer: "Management" },
        { type: "fill_blank", question: "__________ is the proper use of available time for the accomplishment of set tasks.", answer: "Time Management" },
        { type: "mcq", question: "Which of the following is not a time management tool?", options: ["A) Timetable", "B) Organizer", "C) Timepiece", "D) To-do list"], answer: "D" },
        { type: "mcq", question: "Which of the following is not a sub-skill of time management?", options: ["A) Making a things-to-do list", "B) Prioritization, time budgeting", "C) Elimination of waste, micro time management", "D) Task sharing, multitasking, re-scheduling", "E) None of the above"], answer: "E" },
        { type: "fill_blank", question: "__________ is a tabulated list of the times at which an event or activities are required to occur.", answer: "Timetable" },
        { type: "fill_blank", question: "__________ is any instrument for recording or showing the time, especially one that does not strike or chime.", answer: "Timepiece" },
        { type: "fill_blank", question: "__________ is a small portable calendar and databook used for planning, or a handheld computerized device with a simple database.", answer: "Organizer" },
        { type: "mcq", question: "A realistic timetable should be all of the following except:", options: ["A) Account for all your courses & necessary activities", "B) Reflect your essential personality in content and design", "C) Made to impress", "D) Account for individual attention span", "E) B, C, E"], answer: "E" },
        { type: "mcq", question: "Which of the following is not a note-taking format?", options: ["A) Linear format", "B) Outline format", "C) Graphic or diagrammatic", "D) A and B"], answer: "D" },
        { type: "mcq", question: "In which note-taking format is there a tendency to concentrate on writing rather than listening and comprehension?", options: ["A) Linear format", "B) Graphic", "C) Diagrammatic", "D) Outline format"], answer: "A" },
        { type: "mcq", question: "Which note-taking format involves making a list of key points?", options: ["A) Linear format", "B) Outline format", "C) Graphic", "D) Diagrammatic"], answer: "B" },
        { type: "mcq", question: "Which of the following are productive skills?", options: ["A) Listening and writing", "B) Reading and writing", "C) Writing and speaking", "D) Reading and listening"], answer: "C" },
        { type: "fill_blank", question: "__________ is the ability to make and communicate meaning from and by the use of a variety of socially contextual symbols.", answer: "Literacy" },
        { type: "fill_blank", question: "__________ involves understanding some mathematical ideas, notation, and techniques.", answer: "Numeracy" },
        { type: "mcq", question: "Listening is a purposeful activity.", options: ["A) Neutral", "B) True", "C) False", "D) True and False"], answer: "B" },
        { type: "mcq", question: "Which of the following are receptive skills?", options: ["A) Listening and writing", "B) Reading and writing", "C) Writing and speaking", "D) Reading and listening"], answer: "D" },
        { type: "fill_blank", question: "__________ is the ability to read and interpret media, reproduce data, and evaluate new knowledge gained from digital environments.", answer: "Digital literacy" },
        // Add more questions...
    ];

    const additionalQuestions = [
        { type: "mcq", question: "Which of the following is the first step in effective time management?", options: ["A) Prioritizing tasks", "B) Creating a to-do list", "C) Setting deadlines", "D) Avoiding distractions"], answer: "B" },
    
        { type: "mcq", question: "What is the primary goal of time management?", options: ["A) Completing tasks as quickly as possible", "B) Maximizing efficiency and productivity", "C) Avoiding responsibilities", "D) Reducing the number of tasks"], answer: "B" },
    
        { type: "fill_blank", question: "The principle of __________ states that 80% of results come from 20% of efforts.", answer: "Pareto Principle" },
    
        { type: "fill_blank", question: "A __________ is a detailed plan that outlines tasks, their deadlines, and the time allocated for them.", answer: "Schedule" },
    
        { type: "mcq", question: "Which time management technique involves breaking tasks into short, timed intervals?", options: ["A) Pomodoro Technique", "B) Eisenhower Matrix", "C) Time Blocking", "D) Task Batching"], answer: "A" },
    
        { type: "mcq", question: "What is the best way to handle procrastination?", options: ["A) Wait until you feel motivated", "B) Start with the hardest task first", "C) Ignore the task", "D) Work only when necessary"], answer: "B" },
    
        { type: "fill_blank", question: "Setting __________ goals helps individuals achieve tasks in a realistic and timely manner.", answer: "SMART" },
    
        { type: "fill_blank", question: "The __________ Matrix is a decision-making tool that helps prioritize tasks based on urgency and importance.", answer: "Eisenhower" },
    
        { type: "mcq", question: "Which of the following is NOT a benefit of good time management?", options: ["A) Increased stress", "B) Higher productivity", "C) Better work-life balance", "D) Improved focus"], answer: "A" },
    
        // { type: "fill_blank", question: "Using a __________ can help track daily, weekly, and monthly goals effectively.", answer: "Planner" }
    ];
    
    // Add these questions to your existing questions array
    questions.push(...additionalQuestions);
    

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const matricNo = document.getElementById("matric-no").value;
        userMatric.textContent = matricNo;
        userMatricTest.textContent = matricNo;
        homePage.classList.add("hidden");
        instructionsPage.classList.remove("hidden");
    });

    startTestBtn.addEventListener("click", () => {
        instructionsPage.classList.add("hidden");
        testPage.classList.remove("hidden");
        document.body.prepend(timerDisplay);
        startTimer();
        generateQuestionIcons();
        loadQuestion();
    });

    function startTimer() {
        timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                submitTest();
            } else {
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                timerDisplay.textContent = `Time Left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
                timeLeft--;
            }
        }, 1000);
    }

    function generateQuestionIcons() {
        questionIconsDiv.innerHTML = "";
        for (let i = 1; i <= totalQuestions; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;
            btn.classList.add("question-btn");
            btn.addEventListener("click", () => {
                currentQuestion = i;
                loadQuestion();
            });
            questionIconsDiv.appendChild(btn);
        }
    }

    function loadQuestion() {
        const q = questions[currentQuestion - 1];
        questionText.textContent = `Question ${currentQuestion}: ${q.question}`;
        optionsDiv.innerHTML = "";

        if (q.type === "mcq") {
            q.options.forEach(option => {
                const label = document.createElement("label");
                const input = document.createElement("input");
                input.type = "radio";
                input.name = "answer";
                input.value = option;

                label.appendChild(input);
                label.append(option);
                optionsDiv.appendChild(label);
                optionsDiv.appendChild(document.createElement("br")); // Ensure vertical spacing
            });
        } else {
            const input = document.createElement("input");
            input.type = "text";
            input.id = "fill-answer";
            optionsDiv.appendChild(input);
        }
    }

    saveButton.addEventListener("click", () => {
        const selectedOption = document.querySelector("input[name='answer']:checked");
        const fillAnswer = document.getElementById("fill-answer");

        if (selectedOption) {
            answers[currentQuestion] = selectedOption.value;
        } else if (fillAnswer) {
            answers[currentQuestion] = fillAnswer.value;
        }

        updateQuestionIconColor();
    });

    function updateQuestionIconColor() {
        document.querySelectorAll(".question-btn").forEach((btn, index) => {
            if (answers[index + 1]) {
                btn.style.backgroundColor = "blue";
                btn.style.color = "white";
            }
        });
    }

    submitButton.addEventListener("click", submitTest);

    function submitTest() {
        clearInterval(timerInterval);
        testPage.classList.add("hidden");
    
        let correctAnswers = 0;
        reviewPage.innerHTML = "<h2>Test Submitted! Review Your Answers</h2>";
    
        questions.forEach((q, index) => {
            const userAnswer = answers[index + 1] || "Not Answered";
        
            if (/^[A-E]$/i.test(q.answer)) {
                // Multiple-choice question: Extract only A, B, C, D or E
                let extractedAnswer = userAnswer.match(/^[A-E]/i);
                extractedAnswer = extractedAnswer ? extractedAnswer[0].toUpperCase() : userAnswer;
                isCorrect = extractedAnswer === q.answer.toUpperCase();
            } else {
                // German fill-in-the-blank: Full text, case-insensitive comparison
                isCorrect = userAnswer.trim().toLowerCase() === q.answer.trim().toLowerCase();
            }
        
            if (isCorrect) {
                correctAnswers++;
            }
        
    
            const questionReview = document.createElement("div");
            questionReview.innerHTML = `
                <p><strong>Question ${index + 1}:</strong> ${q.question}</p>
                <p><strong>Your Answer:</strong> ${userAnswer}</p>
                <p><strong>Correct Answer:</strong> ${q.answer}</p>
                <p style="color: ${isCorrect ? 'green' : 'red'}; font-weight: bold;">
                    ${isCorrect ? "✔ Correct" : "✘ Incorrect"}
                </p>
            `;
    
            reviewPage.appendChild(questionReview);
        });
    
        // Display total correct answers
        const scoreDisplay = document.createElement("h3");
        scoreDisplay.textContent = `You answered ${correctAnswers} out of ${questions.length} questions correctly.`;
        reviewPage.prepend(scoreDisplay);
    
        document.body.appendChild(reviewPage);
        alert("Test submitted! Check your results.");
    }

    document.getElementById("next").addEventListener("click", () => {
        if (currentQuestion < totalQuestions) {
            currentQuestion++;
            loadQuestion();
        }
    });

    document.getElementById("prev").addEventListener("click", () => {
        if (currentQuestion > 1) {
            currentQuestion--;
            loadQuestion();
        }
    });
});
