let lyrics = "";
        let lyricsArray = [];
        let currentIndex = 0;
        const lyricsInput = document.getElementById('lyricsInput');
        const displayLyrics = document.getElementById('displayLyrics');
        const loadLyricsButton = document.getElementById('loadLyrics');
        const userInput = document.getElementById('userInput');
        const accuracyDisplay = document.getElementById('accuracy');
        const wpmDisplay = document.getElementById('wpm');
        let startTime = null;

        function updateLyricsDisplay() {
            displayLyrics.innerHTML = lyricsArray.slice(currentIndex, currentIndex + 4).join('<br>');
            userInput.value = "";
        }

        loadLyricsButton.addEventListener('click', () => {
            lyrics = lyricsInput.value.trim();
            lyricsArray = lyrics.split('\n');
            currentIndex = 0;
            updateLyricsDisplay();
            accuracyDisplay.textContent = "100%";
            wpmDisplay.textContent = "0";
            startTime = null;
        });

        userInput.addEventListener('input', () => {
            if (!startTime) startTime = new Date();
            
            const inputText = userInput.value.split('\n');
            const targetText = lyricsArray.slice(currentIndex, currentIndex + 4);
            let correctChars = 0;
            let formattedText = "";
            let allCorrect = true;
            
            for (let i = 0; i < targetText.length; i++) {
                let line = targetText[i] || "";
                let inputLine = inputText[i] || "";
                let lineFormatted = "";
                
                for (let j = 0; j < line.length; j++) {
                    if (j < inputLine.length) {
                        if (inputLine[j] === line[j]) {
                            lineFormatted += `<span class='correct'>${line[j]}</span>`;
                            correctChars++;
                        } else {
                            lineFormatted += `<span class='incorrect'>${line[j]}</span>`;
                            allCorrect = false;
                        }
                    } else {
                        lineFormatted += line[j];
                        allCorrect = false;
                    }
                }
                formattedText += lineFormatted + "<br>";
            }
            
            displayLyrics.innerHTML = formattedText;
            
            const accuracy = targetText.join('').length > 0 ? (correctChars / targetText.join('').length) * 100 : 100;
            accuracyDisplay.textContent = accuracy.toFixed(2) + '%';
            
            const elapsedTime = (new Date() - startTime) / 60000;
            const wordsTyped = userInput.value.trim().split(/\s+/).length;
            const wpm = elapsedTime > 0 ? (wordsTyped / elapsedTime) : 0;
            wpmDisplay.textContent = Math.round(wpm);
            
            if (allCorrect && inputText.length === targetText.length && inputText.every((line, index) => line.trim() === targetText[index].trim())) {
                currentIndex += 4;
                if (currentIndex < lyricsArray.length) {
                    setTimeout(updateLyricsDisplay, 500);
                } else {
                    displayLyrics.innerHTML = "<span class='correct'>🎉 You've completed the lyrics! 🎉</span>";
                }
            }
        });