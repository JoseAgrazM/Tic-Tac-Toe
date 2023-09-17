//######################### CONSTANTS ################################//
const STATUS_DISPLAY = document.querySelector('.game-notification'),
GAME_STATE = ['','','','','','','','',''],
WINNINGS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
],
WIN_MESSAGE = () => `¡${jugador} ha ganado!`,
DRAW_MESSAGE = () => `El juego ha terminado en empate!`,
CURRENT_PLAYER_TURN = () => `Es el turno de ${jugador}`,
NAME1 = document.querySelector('.name1'),
NAME2 = document.querySelector('.name2'),
FIGURAS = document.querySelectorAll('.celda')

console.log(GAME_STATE);

//######################### VARIABLES ################################//
const jugador1 = prompt('Nombre del jugador 1');
const jugador2 = prompt('Nombre del jugador 2');


let gameActive = true,
    currentPlayer = 'X',
    contadorX = 0,
    contadorO = 0,
    jugador = jugador1;

//######################### FUNCTIONS ################################//

function main() {
    handleStatusDisplay(CURRENT_PLAYER_TURN());
    listeners()
}

main();

function handleStatusDisplay(message) {
    STATUS_DISPLAY.innerHTML = message;
    NAME1.innerHTML = `${jugador1}: ${contadorX}`;
    NAME2.innerHTML = `${jugador2}: ${contadorO}`;
}

function listeners() {
    document.querySelector('.celdas').addEventListener('click',handleCellClick),
    document.querySelector('.game-restart').addEventListener('click',handleRestartGame)
}

function handleCellClick(clickedEvent){
    const clickedCell = clickedEvent.target
    if (clickedCell.classList.contains('celda')){
        const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell);
        console.log(clickedCellIndex);
        if(GAME_STATE[clickedCellIndex] !== '' || !gameActive){
            return
        }

        handleCellPlayed(clickedCell,clickedCellIndex)
        handleResultValidation()
    };
    console.log(clickedCell);
}

function handleRestartGame(){
    gameActive = true
    // currentPlayer = 'O',
    restartGameState()
    handleStatusDisplay(CURRENT_PLAYER_TURN())
    document.querySelectorAll('.celda').forEach(cell => cell.innerText = '')
}

function restartGameState(){
    let i = GAME_STATE.length
    while (i--){
        GAME_STATE[i] = ''
    }
}

function handleCellPlayed(clickedCell,clickedCellIndex){
    GAME_STATE[clickedCellIndex] = currentPlayer
    clickedCell.innerText = currentPlayer;
    if(FIGURAS === 'X'){
        FIGURAS.style.color = 'red'
    } else if (FIGURAS === 'O'){
        FIGURAS.style.color = 'blue'
    }

}

function handleResultValidation(){
    let roundWon = false
    for (let i = 0; i < WINNINGS.length; i++){
        const winCondition = WINNINGS[i]
        let position1 = GAME_STATE[winCondition[0]],
            position2 = GAME_STATE[winCondition[1]],
            position3 = GAME_STATE[winCondition[2]]
        
        if (position1 === '' || position2 === '' || position3 === ''){
            continue;
        }
        if (position1 === position2 && position2 ===  position3){
            roundWon = true
            if (position1 === 'O'){
                contadorO++
            } else {
                contadorX++
            }
            break;
        }
    }
    if (roundWon){
        handleStatusDisplay(WIN_MESSAGE())
        gameActive = false
        return
    }

    let roundDraw = !GAME_STATE.includes('')

    if (roundDraw){
        handleStatusDisplay(DRAW_MESSAGE())
        gameActive = false
        return
    }

    handlePlayerChange()
}

function handlePlayerChange(){
    if (currentPlayer === 'O') {
        currentPlayer = 'X',
        jugador = jugador1
    } else {
        currentPlayer = 'O'
        jugador = jugador2
    }
    handleStatusDisplay(CURRENT_PLAYER_TURN())
}

