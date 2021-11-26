function GetNextCellValue(index, rule, board) {
    const indexes = GetIndexes(index, board.length);
    const ruleNo = GetRuleNumber(indexes, board);
    return ((rule >> ruleNo) & 1) == 1;
}

function GetIndexes(index, boardSize) {
    let prevIndex = index - 1;
    const nextIndex = (index + 1) % boardSize;
    if (index == 0)
        prevIndex = boardSize - 1;
    return [prevIndex, index, nextIndex];
}

function GetRuleNumber(indexes, board) {
    let ruleNo = 0;
    for (let i = 0; i < indexes.length; i++) {
        const boardValue = board[indexes[i]];
        if (boardValue) {
            let powerOfTwo = indexes.length - 1 - i;
            let result = 1;
            while (powerOfTwo-- > 0) {
                result *= 2;
            }
            ruleNo += result;
        }
    }
    return ruleNo;
}

function GetStartingBoard(boardSize, randomStart = false) {
    let board = Array(boardSize).fill(false);
    board[Math.floor(boardSize / 2)] = true;
    if (randomStart)
        board = board.map(b => Math.random() > 0.5);
    return board;
}

function SolveBoard(rule, board) {
    const length = board.length;
    const newBoard = Array(length).fill(false);

    for (let i = 0; i < newBoard.length; i++)
        newBoard[i] = GetNextCellValue(i, rule, board);

    return newBoard;
}

function PrintBoard(board) {
    var text = board.map(val => val ? "#" : " ").join("");
    return text;
}

function runScript(args) {
    let rule = 110;
    let boardSize = 200;
    let randomStart = false;
    let iterations = 5;
    if (args != null && args.length > 0) {
        rule = +args[0];
        boardSize = +args[1];
        randomStart = +args[2] ? true : false;
        iterations = +args[3];
    }

    console.log(rule, boardSize, randomStart, iterations);
    const boards = [];
    let startingBoard = GetStartingBoard(boardSize, randomStart);
    while (iterations-- > 0) {
        const boardText = PrintBoard(startingBoard);
        boards.push(boardText);
        startingBoard = SolveBoard(rule, startingBoard);
    }
    return boards;
}