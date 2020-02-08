function makeGrid(level) {
    let dimension = 0;
    let grid = "\n                   ";
    let squares = " ";
    let spacing = "\n\n                ";
    if(level === "easy") {
        dimension = 9;
    }
    for(let i = 1; i <= dimension; i++) {
        grid += i + "   ";
        squares += " -  ";
    }
    for(let i = 1; i <= dimension; i++) {
        grid += spacing;
        grid += i
        grid += squares;
    }
    grid += "\n";
    return grid;
}

function setMines(level) {
    let mineCount = 0;
    if(level === "easy") mineCount = 10;
    let minesList = [];
    for(let i = 0; i < mineCount; i++) {
        let randomRow = Math.floor(Math.random() * 9) + 1;
        let randomCol = Math.floor(Math.random() * 9) + 1;
        if(!minesList.includes(`${randomRow},${randomCol}`)) minesList.push(`${randomRow},${randomCol}`);
    }
    console.log(minesList);
    return minesList;
}

let grid = makeGrid("easy");

function startGame() {
    const logo = " __  __ ___ _   _ _____ ______        _______ _____ ____  _____ ____  \n|  \\/  |_ _| \\ | | ____/ ___\\ \\      / / ____| ____|  _ \\| ____|  _ \\ \n| |\\/| || ||  \\| |  _| \\___ \\\\\ \\ /\\ / /|  _| |  _| | |_) |  _| | |_) |\n| |  | || || |\\  | |___ ___) |\\ V  V / | |___| |___|  __/| |___|  _ < \n|_|  |_|___|_| \\_|_____|____/  \\_/\\_/  |_____|_____|_|   |_____|_| \\_\\ \n";
    process.stdout.write(logo);
    process.stdout.write(grid);
    process.stdout.write("\n       HOW TO PLAY: REVEAL SQUARES BY TYPING \"r x,y\" WHERE x IS\n          THE ROW NUMBER AND y IS THE COLUMN NUMBER. TYPE\n         \"f x,y\" TO FLAG POTENTIAL MINES. TYPE \"q\" TO QUIT.\n");
    process.stdout.write("\n> ");
}

let mineSquares = setMines("easy");
startGame();

function updateGrid(cmd, x, y) {
    let newGrid = "\n                   ";
    let spacing = "\n\n                ";
    if(cmd === 'r') {
        const coord = `${x},${y}`;
        if(mineSquares.includes(coord)) {
            gameOver();
        } else {
            for(let i = 1; i <= 9; i++) {
                newGrid += i + "   ";
            }  
            for(let i = 1; i <= 9; i++) {
                newGrid += spacing;
                newGrid += i;
                for(let j = 1; j <= 9; j++) {
                    if(i === +x && j === +y) newGrid += "    ";
                    else newGrid += "  - ";
                }
            }
        }

    } else if(cmd === 'f') {
        for(let i = 1; i <= 9; i++) {
            newGrid += i + "   ";
        }  
        for(let i = 1; i <= 9; i++) {
            newGrid += spacing;
            newGrid += i;
            for(let j = 1; j <= 9; j++) {
                if(i === +x && j === +y) newGrid += "  X ";
                else newGrid += "  - ";
            }
        }
    }
    return newGrid;
}

function gameOver() {
    const gameOver = "             ____ ____ _  _ ____    ____ _  _ ____ ____\n             | __ |__| |\\/| |___    |  | |  | |___ |__/\n             |__] |  | |  | |___    |__|  \\/  |___ |  \\\n"
    const loseMsg = "\n             Oops! You stepped on a mine. ): Play again?\n";
    process.stdout.write(gameOver);
    process.stdout.write(loseMsg);
    process.exit();
}

function checkCommand(cmd, row, col) {
    switch(cmd) {
        case 'q':
            process.stdout.write("Thanks for playing! (:\n");
            process.exit();
        case 'r':
            (row.length && col.length) ? process.stdout.write(updateGrid(cmd, row, col))
            : process.stdout.write("Please specify the coordinates of the square you want to reveal.");
            break;
        case 'f':
            (row.length && col.length) ? process.stdout.write(updateGrid(cmd, row, col))
            : process.stdout.write("Please specify the coordinates of the square you want to flag.");
            break;
        default:
            process.stdout.write("Invalid input! Please try again.");
    }
}

process.stdin.on("data", (data) => {
    const input = data.toString().trim();
    let cmd = input.charAt(0) || "";
    let row = input.charAt(2) || "";
    let col = input.charAt(4) || "";
    if(input.length) checkCommand(cmd, row, col);
    process.stdout.write("\n> ");
})