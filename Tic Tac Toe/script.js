const cellElements = document.querySelectorAll(".cell");
const winningMessage = document.querySelector("#winningMessage");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const restartButton = document.querySelector("#restartButton")

//vars 
const X_CLASS = "x";
const O_CLASS = "o";
let circleTurn = false;

//arrays
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

cellElements.forEach(cell => {
    cell.addEventListener("click", handleClick, {once: true})
})

restartButton.addEventListener("click", function(){
    window.location.reload();
})


//functions
function handleClick(e){
    //placeMarks
    const cell = e.target;
    const currentClass = circleTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass)

    //check win
    if(checkWin(currentClass)){
        endGame(false)
    }else if(isDraw()){
        endGame(true)
    }
    //swith turns
    swapTurns()
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn = !circleTurn;
}

function checkWin(currentClass){
     return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    })
}

function endGame(draw){
    if(draw){
        winningMessageTextElement.textContent = "Draw!"
    }else{
        winningMessageTextElement.textContent = `${circleTurn ? "O" : "X"} Win!`
    }

    winningMessage.classList.add("show")
}