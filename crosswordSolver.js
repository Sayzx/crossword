function crosswordSolver(emptyPuzzle, words) {
    // Check if emptyPuzzle and words are not empty, emptyPuzzle is a string, words is an array and emptyPuzzle is not 0
    if (words.length === 0 || emptyPuzzle === '' || typeof emptyPuzzle !== 'string' || !Array.isArray(words)|| emptyPuzzle === 0) {
        return console.log("Error");
    }

    // Check if emptyPuzzle has only 0, 1, 2
    if (/[3-9]/.test(emptyPuzzle)) {
        return console.log("Error");
    }

    //Check if there is more of word start than words available
    let startWords = 0;
    for (let i = 0; i < emptyPuzzle.length; i++) {
        if (emptyPuzzle[i] >= '1' && emptyPuzzle[i] <= '2') {
            startWords += parseInt(emptyPuzzle[i])
        }
    }
    if (startWords > words.length) {
        return console.log("Error");
    }

    // Check if we don't have the 2 same words and if we have 2 palindromes or more.
    let isPalindrome = 0;
    for (let i = 0; i < words.length; i++) {
        for (let j = i + 1; j < words.length; j++) {
            if (words[i] === words[j]) {
                return console.log("Error");
            }
        }
        if (words[i] === words[i].split('').reverse().join('')){
            isPalindrome++;
        }
    }
    if (isPalindrome >= 2) {
        return console.log("Error");
    }

    // Check if word have 3 or more consecutive letters
    if (words.some(word => /(.)\1\1/.test(word))) {
        return console.log("Error");
    }

    let lines = emptyPuzzle.split('\n');
    let numberOfRows = lines.length;
    let numberOfColumns = lines[0].length;
    let puzzleMap = lines.map(line => line.split(''));
    let newMap = new Array(numberOfRows).fill('').map(() => new Array(numberOfColumns).fill(''));
    for (let x = 0; x < numberOfRows; x++) {
        for (let y = 0; y < numberOfColumns; y++) {

            if (puzzleMap[x][y] === '.') {
                newMap[x][y] = '.';

            } else if (puzzleMap[x][y] === '2') {
                let firstWord = words[0];
                let secondWord = '';

                for (let i = 1; i < words.length; i++) {
                    if (firstWord[0] === words[i][0]) {
                        secondWord = words[i];
                        words.splice(i, 1);
                        words.splice(0, 1);
                    }
                }

                for (let i = 0; i < firstWord.length; i++) {
                    if (puzzleMap[x][i] !== '.'){
                        newMap[x][i] = firstWord[i];
                    }else {
                        return console.log("Error");
                    }
                }

                for (let i = 0; i < secondWord.length; i++) {
                    if (puzzleMap[i][y] !== '.'){
                        newMap[i][y] = secondWord[i];
                    }else {
                        return console.log("Error");
                    }
                }

            }else if (puzzleMap[x][y] === '1') {
                let currentWord = words[0];
                words.splice(0, 1);

                if (currentWord.length > numberOfColumns - y) {
                    for (let i = 0; i < currentWord.length; i++) {
                        if (puzzleMap[x + i][y] !== '.'){
                            newMap[x + i][y] = currentWord[i];
                        }else {
                            return console.log("Error");
                        }
                    }

                }else if (currentWord.length <= numberOfColumns - y) {
                    for (let i = 0; i < currentWord.length; i++) {
                        if (puzzleMap[x][y + i] !== '.') {
                            newMap[x][y + i] = currentWord[i];
                        } else {
                            return console.log("Error");
                        }
                    }
                }
            }
        }
    }

    console.log(newMap.map(line => line.join('')).join('\n'));
}

const emptyPuzzle = `2001
0..0
1000
0..0`

const words = ['casa', 'alan', 'ciao', 'anta'];

crosswordSolver(emptyPuzzle, words);