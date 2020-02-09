/* Implement a spreadsheet in the console. 
TIER 1: Create an object with a constructor method, a method for adding a value to the spreadsheet,
and a method for printing the spreadsheet to the terminal. 
TIER 2: Add method called ‘prettyPrint’ that prints the spreadsheet to the terminal. However, everything
must be centered in their column. 
TIER 3: Create a method that sums up a column starting at an index and I think an ending index. If no
index is provided, assume it starts at 0 and sums the entire column. Watch out for strings in
columns and how to handle that.
TIER 4: A user can insert ‘=SUM()’ as a string into the spreadsheet. If its a valid formula, display the
output (not the formula) in the spreadsheet (update the prettyPrint method). */

class Spreadsheet {
    constructor(row, col, val) {
        this.row = row;
        this.col = col;
        this.val = val;
    }

    addVal(val) {

    }

    printVal(val) {

    }
}
