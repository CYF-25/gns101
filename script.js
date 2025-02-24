document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const homePage = document.getElementById("home-page");
    const instructionsPage = document.getElementById("instructions-page");
    const testPage = document.getElementById("test-page");
    const reviewPage = document.createElement("div");
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
    let timeLeft = 10 * 60;
    let timerInterval;
    const answers = {};
    let selectedQuestions = [];

    const allQuestions = [
        { type: "mcq", question: "Which of the following is not a time management tool?", options: ["A) Timetable", "B) Organizer", "C) Timepiece", "D) To-do list"], answer: "D" },
        { type: "fill_blank", question: "__________ is the conscious experience of duration.", answer: "Time" },
        { type: "mcq", question: "What is the first step in time management?", options: ["A) Prioritizing", "B) Creating a to-do list", "C) Setting deadlines", "D) Avoiding distractions"], answer: "B" },
        { type: "mcq", question: "Which technique breaks tasks into short intervals?", options: ["A) Pomodoro", "B) Eisenhower Matrix", "C) Time Blocking", "D) Task Batching"], answer: "A" },
        { type: "mcq", question: "What is the best way to handle procrastination?", options: ["A) Wait until motivated", "B) Start with hardest task", "C) Ignore task", "D) Work only when necessary"], answer: "B" },
        { type: "fill_blank", question: "Setting __________ goals helps achieve tasks effectively.", answer: "SMART" },
        { type: "mcq", question: "Which is NOT a benefit of time management?", options: ["A) Increased stress", "B) Higher productivity", "C) Work-life balance", "D) Improved focus"], answer: "A" },
        { type: "fill_blank", question: "__________ is a tabulated list of the times at which events or activities are required to occur.", answer: "Timetable" },
        { type: "fill_blank", question: "__________ is the conscious experience of duration, the period in which an action or event occurred.", answer: "Time" },
        { type: "fill_blank", question: "__________ is also a dimension representing a succession of such actions or events.", answer: "Time" },
        { type: "fill_blank", question: "__________ is the skillful handling or use of resources such as people (human capital), money, materials, and time.", answer: "Management" },
        { type: "fill_blank", question: "__________ is the proper use of available time for the accomplishment of set tasks.", answer: "Time Management" },
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
        { type: "mcq", question: "Which of the following is the first step in effective time management?", options: ["A) Prioritizing tasks", "B) Creating a to-do list", "C) Setting deadlines", "D) Avoiding distractions"], answer: "B" },
        { type: "mcq", question: "What is the primary goal of time management?", options: ["A) Completing tasks as quickly as possible", "B) Maximizing efficiency and productivity", "C) Avoiding responsibilities", "D) Reducing the number of tasks"], answer: "B" },
        { type: "fill_blank", question: "A __________ is a detailed plan that outlines tasks, their deadlines, and the time allocated for them.", answer: "Schedule" },
        { type: "mcq", question: "Which time management technique involves breaking tasks into short, timed intervals?", options: ["A) Pomodoro Technique", "B) Eisenhower Matrix", "C) Time Blocking", "D) Task Batching"], answer: "A" },
        { type: "mcq", question: "What is the best way to handle procrastination?", options: ["A) Wait until you feel motivated", "B) Start with the hardest task first", "C) Ignore the task", "D) Work only when necessary"], answer: "B" },
        { type: "fill_blank", question: "Setting __________ goals helps individuals achieve tasks in a realistic and timely manner.", answer: "SMART" },
        { type: "fill_blank", question: "The __________ Matrix is a decision-making tool that helps prioritize tasks based on urgency and importance.", answer: "Eisenhower" },
        { type: "mcq", question: "Which of the following is NOT a benefit of good time management?", options: ["A) Increased stress", "B) Higher productivity", "C) Better work-life balance", "D) Improved focus"], answer: "A" },
        { type: "fill_blank", question: "Using a __________ can help track daily, weekly, and monthly goals effectively.", answer: "Planner" },
        //additional questions Part 2
        { type: "mcq", question: "One of the factors that inhibit efficient reading is ____.", options: ["A) A well-equipped library", "B) Good health", "C) Noise", "D) Proper feeding"], answer: "C" },
        { type: "mcq", question: "The act of reading through a text to acquire superficial information is referred to as ____.", options: ["A) Scanning", "B) Skimming", "C) Anticipation", "D) Writing"], answer: "B" },
        { type: "mcq", question: "The sentence that bears the main information in a paragraph is known as the ____.", options: ["A) Introduction sentence", "B) Main point sentence", "C) Topic sentence", "D) All of the above"], answer: "C" },
        { type: "mcq", question: "An introductory paragraph is usually written in the ____.", options: ["A) Past tense", "B) Present tense", "C) Present continuous tense", "D) Past participle tense"], answer: "B" },
        { type: "mcq", question: "Which of the following is a signal word?", options: ["A) In addition", "B) Similarly", "C) Furthermore", "D) All of the above"], answer: "D" },
        { type: "mcq", question: "Reading is important for all these except ___.", options: ["A) Achievement and advancement in life", "B) Enjoyment or leisure", "C) Professional development", "D) None of the above"], answer: "D" },
        { type: "mcq", question: "All these are strategies of reading except ___.", options: ["A) Anticipation", "B) Skimming", "C) Scamming", "D) Identifying main ideas and supporting details"], answer: "C" },
        { type: "fill_blank", question: "A noisy environment may constitute a/an __________ hindrance to effective reading.", answer: "Environmental" },
        { type: "mcq", question: "Which of the following reading habits should be avoided?", options: ["A) Carefully concentrating on every word as you read", "B) Making equal use of the two types of eye movement in reading", "C) Not using a pen to trace each word but using a finger instead", "D) Varying your reading speed"], answer: "D" },
        { type: "mcq", question: "Which of these is NOT recommended for efficient reading?", options: ["A) Reading with preconceived ideas in mind", "B) Generation of guide questions as you read", "C) Adopting a flexible reading speed", "D) Employing memory-enhancing devices"], answer: "A" },
        { type: "mcq", question: "Which of the following parts in the process of writing a term paper comes first?", options: ["A) Drafting; re-drafting", "B) Editing and writing a clear copy", "C) Discussing the topic with group members", "D) Getting others to read the essay and make suggestions"], answer: "C" },
        { type: "fill_blank", question: "Setting __________ goals helps achieve tasks effectively.", answer: "SMART" },
        { type: "mcq", question: "Which technique breaks tasks into short intervals?", options: ["A) Pomodoro", "B) Eisenhower Matrix", "C) Time Blocking", "D) Task Batching"], answer: "A" },
        { type: "mcq", question: "What is the best way to handle procrastination?", options: ["A) Wait until motivated", "B) Start with the hardest task", "C) Ignore task", "D) Work only when necessary"], answer: "B" },
        { type: "fill_blank", question: "The __________ Matrix helps prioritize tasks.", answer: "Eisenhower" },
        { type: "mcq", question: "Which of the following parts in the process of writing a term paper comes last?", options: ["A) Structuring the essay", "B) Selecting the useful materials", "C) Reading widely around the topic", "D) Gathering materials from different sources"], answer: "A" },
        { type: "mcq", question: "Which of the following is NOT an inefficient reading strategy?", options: ["A) Word-by-word reading", "B) Reading critically", "C) Finger pointing", "D) Head movement"], answer: "B" },
        { type: "mcq", question: "Which of the following is NOT an efficient reading strategy?", options: ["A) Paying attention to signal words/phrases", "B) Vocalization and sub-vocalization", "C) Phrase-by-phrase reading", "D) Concentrating on concepts rather than the words"], answer: "B" },
        { type: "fill_blank", question: "A badly ventilated classroom may constitute a/an __________ hindrance to effective reading.", answer: "Environmental" },
        { type: "fill_blank", question: "A headache may constitute a/an __________ hindrance to effective reading.", answer: "Physiological" },
        { type: "fill_blank", question: "Stress may constitute a/an __________ hindrance to effective reading.", answer: "Psychological" },
        { type: "mcq", question: "Which of the following parts in the process of writing a term paper comes first?", options: ["A) Narrowing the topic", "B) Preparing an outline", "C) Selecting the useful materials", "D) Gathering materials from different sources"], answer: "A" },
        { type: "fill_blank", question: "Extreme cold while studying at night may constitute a/an __________ hindrance to effective reading.", answer: "Environmental" },
        { type: "mcq", question: "Which part of a term paper usually contains illustrations, graphs, and data?", options: ["A) Introduction", "B) Conclusion", "C) Main body", "D) All of the above"], answer: "C" },
        { type: "fill_blank", question: "The act of going through a passage rapidly to search for specific information is called __________.", answer: "Scanning" },
        { type: "mcq", question: "Which of the following are signal phrases likely to be found in the conclusion of a term paper?", options: ["A) ‘To summarize’ and ‘In summary’", "B) ‘Definition of terms’", "C) ‘General overview’ and ‘Area under consideration’", "D) All of the above"], answer: "A" },
        { type: "mcq", question: "Which of the following is NOT part of the process involved in writing a term paper?", options: ["A) Gathering materials from different sources", "B) Reading widely around the topic", "C) Submitting the term paper online", "D) None of the above"], answer: "C" },
        
        { type: "mcq", question: "Which of the following is NOT an inefficient reading strategy?", options: ["A) Word-by-word reading", "B) Vocalization and sub-vocalization", "C) Establishing a purpose for reading", "D) Poor visual perception"], answer: "C" },

        { type: "mcq", question: "Which of these is NOT considered an efficient reading strategy?", options: ["A) Paying attention to signal words/phrases", "B) Vocalization and sub-vocalization", "C) Phrase-by-phrase reading", "D) Concentrating on concepts rather than the words"], answer: "B" },
        
        { type: "fill_blank", question: "A well-ventilated environment is crucial for effective __________.", answer: "reading" },
        
        { type: "mcq", question: "Which of the following can negatively impact reading efficiency?", options: ["A) Noise", "B) Proper lighting", "C) Good posture", "D) A quiet room"], answer: "A" },
        
        { type: "fill_blank", question: "The process of quickly reviewing a text to locate specific information is called __________.", answer: "scanning" },
        
        { type: "mcq", question: "Which of the following is NOT a recommended reading habit?", options: ["A) Skipping some passages and focusing on key points", "B) Making equal use of the two types of eye movements", "C) Carefully concentrating on every word while reading", "D) Varying your reading speed"], answer: "C" },
        
        { type: "mcq", question: "Which factor is a physiological hindrance to effective reading?", options: ["A) Poor lighting", "B) Emotional problems", "C) Hunger", "D) Lack of interest"], answer: "C" },
        
        { type: "fill_blank", question: "The sentence that expresses the main idea of a paragraph is called the __________ sentence.", answer: "topic" },
        
        { type: "mcq", question: "Which section of a term paper provides an overview of the paper’s content and structure?", options: ["A) Introduction", "B) Main body", "C) Conclusion", "D) References"], answer: "A" },
        
        { type: "fill_blank", question: "A __________ environment can disrupt concentration and reduce reading efficiency.", answer: "noisy" },
        
        { type: "mcq", question: "Which reading strategy involves quickly identifying the main idea of a text?", options: ["A) Scanning", "B) Skimming", "C) Vocalization", "D) Intensive reading"], answer: "B" },
        
        { type: "mcq", question: "Which of the following is NOT a part of writing a term paper?", options: ["A) Gathering materials from different sources", "B) Copying an essay from an online source", "C) Structuring the essay", "D) Preparing an outline"], answer: "B" },
        
        { type: "fill_blank", question: "A poorly ventilated room is an example of an __________ hindrance to effective reading.", answer: "environmental" },
        
        { type: "mcq", question: "Which type of reading involves in-depth analysis and comprehension?", options: ["A) Scanning", "B) Skimming", "C) Critical reading", "D) Speed reading"], answer: "C" },
        
        { type: "fill_blank", question: "A lack of __________ can make reading inefficient and difficult.", answer: "interest" },
        
        { type: "mcq", question: "Which of the following best helps in prioritizing tasks effectively?", options: ["A) Skimming", "B) The Eisenhower Matrix", "C) Multitasking", "D) Passive reading"], answer: "B" },
        
        { type: "fill_blank", question: "A well-structured __________ helps in effective essay writing.", answer: "outline" },
        
        { type: "mcq", question: "What is the first step in the writing process of a term paper?", options: ["A) Drafting", "B) Selecting a topic", "C) Editing", "D) Gathering materials"], answer: "B" },
        
        { type: "mcq", question: "Which of the following is a key factor in effective reading?", options: ["A) Poor lighting", "B) Background noise", "C) Good posture", "D) Fatigue"], answer: "C" },
        
        { type: "fill_blank", question: "Effective __________ skills enhance comprehension and information retention.", answer: "reading" },
        
        { type: "mcq", question: "Which of the following should be avoided for efficient reading?", options: ["A) Establishing a purpose for reading", "B) Using signal words", "C) Vocalization and sub-vocalization", "D) Adjusting reading speed based on difficulty"], answer: "C" },
        
        { type: "fill_blank", question: "A good reading habit includes focusing on __________ rather than individual words.", answer: "concepts" },
        
        { type: "mcq", question: "Which of these is an advanced indicator of an essay’s structure?", options: ["A) The introduction", "B) The main body", "C) The conclusion", "D) The bibliography"], answer: "A" },
        
        { type: "fill_blank", question: "Emotional problems can be a __________ hindrance to effective reading.", answer: "psychological" },
        
        { type: "mcq", question: "Which of these is NOT a part of a well-structured paragraph?", options: ["A) Topic sentence", "B) Supporting details", "C) Conclusion sentence", "D) Title"], answer: "D" },
        
        { type: "fill_blank", question: "The phrase ‘in addition’ is an example of a __________ word.", answer: "signal" },
        
        { type: "mcq", question: "Which of the following is NOT an example of an environmental hindrance to reading?", options: ["A) Poor lighting", "B) Noise", "C) Emotional stress", "D) Poor ventilation"], answer: "C" },
        
        { type: "fill_blank", question: "A well-structured __________ enhances comprehension in academic writing.", answer: "paragraph" }
        
        ];
        
        // Add these questions to your existing questions array
      //  questions.push(...additionalQuestions);];

    function selectRandomQuestions() {
        const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
        selectedQuestions = shuffled.slice(0, totalQuestions);
    }

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent form refresh
        
        const matricNo = document.getElementById("matric-no").value.trim();
        const password = document.getElementById("password").value.trim();
    
        if (matricNo === "" || password === "") {
            alert("Please enter both Matric No and Password.");
            return;
        }
    
        userMatric.textContent = matricNo;
        userMatricTest.textContent = matricNo;
        
        
        // Hide home page and show instructions page
        homePage.classList.add("hidden");
        instructionsPage.classList.remove("hidden");
    });
    

    startTestBtn.addEventListener("click", () => {
        instructionsPage.classList.add("hidden");
        testPage.classList.remove("hidden");
        selectRandomQuestions();
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
        const q = selectedQuestions[currentQuestion - 1];
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
                optionsDiv.appendChild(document.createElement("br"));
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



    //lk
       





    submitButton.addEventListener("click", submitTest);

    function submitTest() {
        clearInterval(timerInterval);
        testPage.classList.add("hidden");

        let correctAnswers = 0;
        reviewPage.innerHTML = "<h2>Test Submitted! Review Your Answers</h2>";

        selectedQuestions.forEach((q, index) => {
            const userAnswer = answers[index + 1] || "Not Answered";
            const isCorrect = q.type === "mcq" 
                ? (userAnswer.charAt(0).toUpperCase() === q.answer.toUpperCase())
                : (userAnswer.trim().toLowerCase() === q.answer.trim().toLowerCase());

            if (isCorrect) correctAnswers++;

            reviewPage.innerHTML += `
                <p><strong>Question ${index + 1}:</strong> ${q.question}</p>
                <p><strong>Your Answer:</strong> ${userAnswer}</p>
                <p><strong>Correct Answer:</strong> ${q.answer}</p>
                <p style="color: ${isCorrect ? 'green' : 'red'}; font-weight: bold;">
                    ${isCorrect ? "✔ Correct" : "✘ Incorrect"}
                </p>
            `;
        });

        reviewPage.innerHTML = `<h3>You scored ${correctAnswers} out of ${totalQuestions}.</h3>` + reviewPage.innerHTML;
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
