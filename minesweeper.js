function makeGrid(level) {
    let dimension = 0;
    let grid = "\n                   ";
    let squares = " ";
    let spacing = "\n\n                ";
    let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    if(level === "easy") {
        dimension = 9;
    }
    for(let i = 1; i <= dimension; i++) {
        grid += i + "   ";
        squares += " -  ";
    }
    for(let i = 0; i < dimension; i++) {
        grid += spacing;
        grid += letters[i];
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
        let randomRow = Math.random();
        let randomCol = Math.random();
        minesList.push(`${randomRow} ${randomCol}`);
    }
    return minesList;
}

let grid = makeGrid("easy");

function startGame() {
    const logo = " __  __ ___ _   _ _____ ______        _______ _____ ____  _____ ____  \n|  \\/  |_ _| \\ | | ____/ ___\\ \\      / / ____| ____|  _ \\| ____|  _ \\ \n| |\\/| || ||  \\| |  _| \\___ \\\\\ \\ /\\ / /|  _| |  _| | |_) |  _| | |_) |\n| |  | || || |\\  | |___ ___) |\\ V  V / | |___| |___|  __/| |___|  _ < \n|_|  |_|___|_| \\_|_____|____/  \\_/\\_/  |_____|_____|_|   |_____|_| \\_\\ \n";
    process.stdout.write(logo);
    process.stdout.write(grid);
    process.stdout.write("\n       HOW TO PLAY: MARK SQUARES BY TYPING \"m x,y\" WHERE x IS THE \n           ROW LETTER AND y IS THE COLUMN NUMBER. TYPE \"f x,y\"\n               TO FLAG POTENTIAL MINES. TYPE \"q\" TO QUIT.\n");
    process.stdout.write("\n> ");
}

startGame();
setMines();

function updateGrid(cmd, x, y, currGrid) {
    let newGrid = currGrid;
    return newGrid;
}

function checkCommand(cmd, row, col, grid) {
    switch(cmd) {
        case 'q':
            process.stdout.write("Thanks for playing! (:\n");
            process.exit();
        case 'm':
            (row.length && col.length) ? process.stdout.write(updateGrid(cmd, row, col, grid))
            : process.stdout.write("Please specify the coordinates of the square you want to mark.");
            break;
        case 'f':
            (row.length && col.length) ? process.stdout.write(`FLAG ${row} ${col}`)
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
    if(input.length) checkCommand(cmd, row, col, grid);
    process.stdout.write("\n> ");
})