<script>
    function startQuiz(level) {
        console.log("Folder clicked: " + level); // This helps you debug
        currentLevel = allQuestions[level];
        currentIndex = 0;
        score = 0;
        
        document.getElementById('folder-screen').style.display = 'none';
        document.getElementById('quiz-box').style.display = 'block';
        document.getElementById('level-label').innerText = level.toUpperCase() + " LEVEL";
        
        loadQuestion();
    }
    
    // ... rest of your code
</script>
