let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

var heroes = ["Cyclops", "SpiderMan", "Hulk", "Vision", "Wolverine", "Groot", "Thor", "Deadpool", "Gamora"];
let wins = 0;
let losses = 0;
let maxGuesses = 7;

let word = "";
let wordChars = 0;
let wrongLetters = new Set();
let turns = 0;
let guessed = [];

resetGame();

document.onkeydown = function (event) {

    let letter = event.key.toLowerCase();
    console.log(letter)

    checkLetterInWord(letter);
    //checkWrongLetter(letter);
}




function checkLetterInWord(letter) {
    if (guessed.includes("_") && turns < maxGuesses) {
        let foundLetter = false;
        for (let i = 0; i < wordChars; i++) {
            if (word[i].toLowerCase() === letter) {
                foundLetter = true;
                guessed[i] = word[i];
                document.getElementById("currentWord").innerHTML = guessed.join(" ");

                if (!guessed.includes("_")) {
                    wins++;
                    document.getElementById("wins").innerHTML = wins;
                    playWinAudio();
                    resetGame();
                }
            }
        }

        if (!foundLetter) {
            turns++;
            wrongLetters.add(letter)
            document.getElementById("lettersGuessed").innerHTML = Array.from(wrongLetters).join(" "); //what letters you have guessed
            document.getElementById("guessesLeft").innerHTML = (maxGuesses - turns).toString();

            if (turns === maxGuesses) {
                losses++;
                playLoseAudio();
                document.getElementById("losses").innerHTML = losses;
                resetGame();
                return;
            }
        }
    }
}


/*function checkWrongLetter(letter) {
    if (guessed.includes("_") && turns < maxGuesses) {
        typedLetters.push(letter);
        document.getElementById("lettersGuessed").innerHTML = typedLetters.join(" ");
        turns += 1;
        document.getElementById("lettersGuessed").innerHTML = parseInt(maxGuesses - turns);

        if (turns === maxGuesses) {
            losses++;
            playLoseAudio();
            document.getElementById("losses").innerHTML = losses;
            resetGame();
            return;
        }
    }
}*/

function resetGame() {
    word = heroes[Math.floor(Math.random() * heroes.length)];
    wordChars = word.length;
    wrongLetters = new Set();
    turns = 0;
    guessed = [];

    console.log(word);
    for (let i = 0; i < wordChars; i++) {
        guessed[i] = "_"
    }

    document.getElementById("guessesLeft").innerHTML = maxGuesses; //how many turns you have left
    document.getElementById("wins").innerHTML = wins; //how many wins you have
    document.getElementById("losses").innerHTML = losses; //how many losses you have
    document.getElementById("lettersGuessed").innerHTML = Array.from(wrongLetters).join(" "); //what letters you have guessed
    document.getElementById("currentWord").innerHTML = guessed.join(" ");
}




function playWinAudio() {
    let audioWin = document.getElementById("winning");
    audioWin.play();
}

function playLoseAudio() {
    let audioLose = document.getElementById("losing");
    audioLose.play();
}



