type Position = { row: number; col: number };

export class NumberMasterGame {
    grid: number[][];
    level: number;
    columns: number;
    score: number;

    constructor(startLevel = 1) {
        this.grid = [];
        this.level = startLevel;
        this.columns = 9;
        this.score = 0;
        this.generateInitialMatrix();
    }

    public attemptToMatch(pos1: Position, pos2: Position): boolean {
        const num1 = this.grid[pos1.row][pos1.col];
        const num2 = this.grid[pos2.row][pos2.col];

        if (this.checkNumbersAreValidPair(num1, num2) && this.isPathClear(pos1, pos2)) {
            // *** CHANGE 1: Instead of setting to 0, make the numbers negative ***
            this.grid[pos1.row][pos1.col] *= -1;
            this.grid[pos2.row][pos2.col] *= -1;
            this.score += 4;
            
            this.clearCompletedRows();
            
            if (this.grid.length === 0 || this.grid.flat().every(cell => cell <= 0)) {
               this.level++;
               this.generateInitialMatrix();
            }
            return true;
        }
        
        return false;
    }

    // --- All other methods are updated to handle the new state logic ---

    public generateInitialMatrix(): void {
        const numItems = 18 + (this.level - 1) * 2;
        const numbers: number[] = [];
        for (let i = 0; i < numItems; i++) {
            numbers.push(Math.floor(Math.random() * 9) + 1);
        }
        this.grid = [];
        while (numbers.length > 0) {
            this.grid.push(numbers.splice(0, this.columns));
        }
        if (this.grid.length > 0) {
            const lastRow = this.grid[this.grid.length - 1];
            while (lastRow.length < this.columns) {
                lastRow.push(0); // 0 is still "empty space", not a playable number
            }
        }
    }

    public addMoreNumbers(): void {
        // Only collect ACTIVE (positive) numbers
        const numbersToAdd = this.grid.flat().filter(num => num > 0);
        if (numbersToAdd.length === 0) return;

        let lastActiveRow = -1, lastActiveCol = -1;
        // Find last ACTIVE (positive) cell
        for (let r = this.grid.length - 1; r >= 0; r--) {
            for (let c = this.columns - 1; c >= 0; c--) {
                if (this.grid[r][c] > 0) {
                    lastActiveRow = r;
                    lastActiveCol = c;
                    break;
                }
            }
            if (lastActiveRow !== -1) break;
        }
        
        let currentRow = (lastActiveRow === -1) ? 0 : lastActiveRow;
        let currentCol = (lastActiveCol === -1) ? 0 : lastActiveCol + 1;
        
        for (const num of numbersToAdd) {
            if (currentCol >= this.columns) {
                currentCol = 0;
                currentRow++;
            }
            if (currentRow >= this.grid.length) {
                this.grid.push(new Array(this.columns).fill(0));
            }
            this.grid[currentRow][currentCol] = num;
            currentCol++;
        }
    }

    private checkNumbersAreValidPair(num1: number, num2: number): boolean {
        // Only positive (active) numbers can be paired
        if (num1 <= 0 || num2 <= 0) return false;
        return num1 === num2 || num1 + num2 === 10;
    }

    private clearCompletedRows(): void {
        // A row is completed if all its cells are MATCHED (negative) or EMPTY (0)
        this.grid = this.grid.filter(row => row.some(cell => cell > 0));
    }

    private isPathClear(pos1: Position, pos2: Position): boolean {
        if (pos1.row === pos2.row && pos1.col === pos2.col) return false;
        
        // Path check should only see ACTIVE (positive) numbers as obstacles
        const isObstacle = (r: number, c: number) => this.grid[r][c] > 0;

        const hasObstaclesBetween = (p1: Position, p2: Position): boolean => {
            const rowStep = Math.sign(p2.row - p1.row);
            const colStep = Math.sign(p2.col - p1.col);
            const distance = Math.max(Math.abs(p2.row - p1.row), Math.abs(p2.col - p1.col));
            for (let i = 1; i < distance; i++) {
                if (isObstacle(p1.row + i * rowStep, p1.col + i * colStep)) return true;
            }
            return false;
        };
        
        if (pos1.row === pos2.row && !hasObstaclesBetween(pos1, pos2)) return true;
        if (pos1.col === pos2.col && !hasObstaclesBetween(pos1, pos2)) return true;
        if (Math.abs(pos1.row - pos2.row) === Math.abs(pos1.col - pos2.col) && !hasObstaclesBetween(pos1, pos2)) return true;
        
        const activeNumbersWithPos: Position[] = [];
        for (let r = 0; r < this.grid.length; r++) {
            for (let c = 0; c < this.columns; c++) {
                if (this.grid[r][c] > 0) activeNumbersWithPos.push({ row: r, col: c });
            }
        }
        
        const index1 = activeNumbersWithPos.findIndex(p => p.row === pos1.row && p.col === pos1.col);
        const index2 = activeNumbersWithPos.findIndex(p => p.row === pos2.row && p.col === pos2.col);

        if (index1 !== -1 && index2 !== -1) {
            const lastIndex = activeNumbersWithPos.length - 1;
            const areAdjacent = Math.abs(index1 - index2) === 1;
            const areFirstAndLast = (index1 === 0 && index2 === lastIndex) || (index2 === 0 && index1 === lastIndex);
            if (areAdjacent || areFirstAndLast) return true;
        }

        return false;
    }
}