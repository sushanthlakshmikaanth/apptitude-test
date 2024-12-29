const categories = {
    python: [
      { question: "What is Python?", hint: "It's a programming language.", answer: "Programming language" },
      { question: "What does 'len()' do?", hint: "It gets the size of something.", answer: "Length" },
      { question: "Which keyword is used for functions?", hint: "It starts with 'd'.", answer: "def" },
      // Add more Python questions...
    ],
    java: [
      { question: "What is the extension of a Java file?", hint: "It starts with '.j'.", answer: ".java" },
      { question: "What is JVM?", hint: "It's a virtual machine.", answer: "Java Virtual Machine" },
      // Add more Java questions...
    ],
    c: [
      { question: "Who developed C?", hint: "It starts with Dennis.", answer: "Dennis Ritchie" },
      { question: "What does 'printf()' do?", hint: "It displays output.", answer: "Print" },
      // Add more C questions...
    ],
    cpp: [
      { question: "Who developed C++?", hint: "It starts with Bjarne.", answer: "Bjarne Stroustrup" },
      { question: "What is OOP?", hint: "Object-oriented programming.", answer: "Object-oriented programming" },
      // Add more C++ questions...
    ],
    database: [
      { question: "What is SQL?", hint: "Structured Query Language.", answer: "Structured Query Language" },
      { question: "What is a primary key?", hint: "Uniquely identifies a record.", answer: "Unique identifier" },
      // Add more Database questions...
    ],
    cloud: [
      { question: "What is cloud computing?", hint: "On-demand access to resources.", answer: "Cloud Computing" },
      { question: "Name a popular cloud platform.", hint: "AWS, Azure, or GCP.", answer: "AWS" },
      // Add more Cloud questions...
    ],
  };
  
  let selectedCategory = [];
  let currentQuestionIndex = 0;
  let timer;
  let timeLeft = 25;
  let score = 0;
  
  document.querySelectorAll(".category-btn").forEach((button) =>
    button.addEventListener("click", () => {
      document.getElementById("home-screen").classList.add("fade-out");
      setTimeout(() => {
        startQuiz(button.dataset.category);
      }, 800);
    })
  );
  
  function startQuiz(category) {
    selectedCategory = categories[category];
    document.getElementById("category-title").textContent = `Category: ${category}`;
    document.getElementById("home-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");
    loadQuestion();
  }
  
  function loadQuestion() {
    if (currentQuestionIndex >= selectedCategory.length) {
      endQuiz();
      return;
    }
    const question = selectedCategory[currentQuestionIndex];
    document.getElementById("question").textContent = question.question;
    document.getElementById("hint").textContent = question.hint;
    document.getElementById("hint").classList.add("hidden");
    document.getElementById("answer-input").value = "";
    timeLeft = 25;
    document.getElementById("timer").textContent = timeLeft;
    timer = setInterval(updateTimer, 1000);
  }
  
  function updateTimer() {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;
    if (timeLeft === 17) document.getElementById("hint").classList.remove("hidden");
    if (timeLeft === 0) {
      clearInterval(timer);
      currentQuestionIndex++;
      loadQuestion();
    }
  }
  
  function endQuiz() {
    clearInterval(timer);
    document.getElementById("question").textContent = "Quiz completed!";
    document.getElementById("hint").classList.add("hidden");
    document.getElementById("restart-btn").classList.remove("hidden");
    document.getElementById("score").textContent = `Your Final Score: ${score}`;
  }
  
  document.getElementById("submit-btn").addEventListener("click", () => {
    const userAnswer = document.getElementById("answer-input").value.trim().toLowerCase();
    const correctAnswer = selectedCategory[currentQuestionIndex].answer.toLowerCase();
    document.getElementById("feedback").classList.remove("hidden");
  
    if (userAnswer === correctAnswer) {
      document.getElementById("feedback").textContent = "Correct!";
      score++; // Increase score for correct answer
    } else {
      document.getElementById("feedback").textContent = "Incorrect!";
    }
  
    document.getElementById("score").textContent = `Score: ${score}`; // Update the score
    clearInterval(timer);
    setTimeout(() => {
      currentQuestionIndex++;
      loadQuestion();
    }, 2000);
  });
  
  document.getElementById("restart-btn").addEventListener("click", () => {
    location.reload();
  });
  