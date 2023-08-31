const cells = document.querySelectorAll(".playBox");
const statusText = document.querySelector("#current");
const restartBtn = document.querySelector("#restart");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}
function cellClicked(){
    const playBoxIndex = this.getAttribute("playBoxIndex");

    if(options[playBoxIndex] != "" || !running){
        return;
    }

    updateCell(this, playBoxIndex);
    checkWinner();
}
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function checkWinner(){
    let check = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const box1 = options[condition[0]];
        const box2 = options[condition[1]];
        const box3 = options[condition[2]];

        if(box1 == "" || box2 == "" || box3 == ""){
            continue;
        }
        if(box1 == box2 && box2 == box3){
            check = true;
            break;
        }
    }

    if(check){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }
    else{
        currentPlayer = (currentPlayer == "X") ? "O" : "X";
        statusText.textContent = `${currentPlayer}'s turn`;

    }
}
function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
