// JavaScript Logic for NK Digital Services Exam Portal
let currentSet = [];
let curIdx = 0;
let score = 0;

/**
 * Starts the quiz by filtering questions based on difficulty
 * @param {string} lvl - 'easy', 'hard', or 'expert'
 */
function startQuiz(lvl) {
    // 1. Assign the correct question list from your DB
    currentSet = db[lvl]; 
    curIdx = 0; 
    score = 0;

    // 2. Hide folder screen, show quiz screen
    document.getElementById('folder-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';
    
    // 3. Set the header label
    document.getElementById('level-tag').innerText = lvl.toUpperCase() + " LEVEL";
    
    loadQuestion();
}

function loadQuestion() {
    const q = currentSet[curIdx];
    
    // Update progress text
    document.getElementById('progress').innerText = `${curIdx + 1} / ${currentSet.length}`;
    document.getElementById('question-text').innerText = q.q;
    
    const box = document.getElementById('options-box');
    box.innerHTML = ''; // Clear old options

    // Create option buttons
    q.a.forEach((opt, i) => {
        const div = document.createElement('div');
        div.className = 'option';
        div.innerHTML = `<span>${opt}</span> <i class="status-icon"></i>`;
        div.onclick = () => checkResult(i, q.c, div);
        box.appendChild(div);
    });

    document.getElementById('next-btn').style.display = 'none';
}

function checkResult(selected, correct, element) {
    const allOptions = document.querySelectorAll('.option');
    
    // Disable further clicks
    allOptions.forEach(opt => opt.classList.add('disabled'));

    if (selected === correct) {
        element.classList.add('correct');
        score++;
    } else {
        element.classList.add('wrong');
        allOptions[correct].classList.add('correct'); // Show correct answer
    }

    document.getElementById('next-btn').style.display = 'block';
}

function nextQuestion() {
    curIdx++;
    if (curIdx < currentSet.length) {
        loadQuestion();
    } else {
        showFinalResult();
    }
}

function showFinalResult() {
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
    
    const scoreDisplay = document.getElementById('score-display');
    scoreDisplay.innerText = `${score} / ${currentSet.length}`;
    
    const percent = (score / currentSet.length) * 100;
    const msg = document.getElementById('msg-display');
    
    if (percent >= 80) {
        msg.innerHTML = "बधाई छ! <br> तपाईं सफल हुनुभयो।";
        msg.style.color = "green";
    } else {
        msg.innerHTML = "खेद छ! <br> फेरि प्रयास गर्नुहोस्।";
        msg.style.color = "red";
    }
}
