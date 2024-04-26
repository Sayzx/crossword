const emptyPuzzle =
    `2001
0..0
1000
0..0`;

const words= [
    'casa',
    'alan',
    'ciao',
    'anta',
]

crosswordSolver();

function crosswordSolver() {

    if (words.length === 0 || emptyPuzzle === '' || typeof emptyPuzzle !== 'string' || words.some(word => typeof word !== 'string')){
        return console.log("Error");
    }

    for (let i = 0; i < words.length - 1; i++) {
        if (words[i] === words[i + 1]) {
            return console.log("Error");
        }
    }

    let lines = emptyPuzzle.split('\n');

    let numberOfRows = lines.length;

    let numberOfColumns = lines[0].length;

    let puzzleMap = lines.map(line => line.split(''));

    let newMap = new Array(numberOfRows).fill('').map(() => new Array(numberOfColumns).fill(''));

    for (let y = 0; y < numberOfColumns; y++) {
        for (let x = 0; x < numberOfRows; x++) {

            if (puzzleMap[x][y] === '.') {
                newMap[x][y] = '.';
            } else if (puzzleMap[x][y] === '2') {
                let firstWord = words[0];
                let secondWord = '';

                for (let i = 1; i < words.length; i++) {
                    if (firstWord[0] === words[i][0]) {
                        secondWord = words[i];
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

            }
        }
    }

    console.log("Nombre de lignes (x) :" + numberOfRows);
    console.log("Nombre de colonnes (y) :" + numberOfColumns);

    console.log("PuzzleMap :", puzzleMap);

    console.log("NewMap :", newMap);
}
