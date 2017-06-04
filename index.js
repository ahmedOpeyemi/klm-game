// Global Vars
var PLAYER_MODES = {
    "SINGLE_PLAYER": 1,
    "TWO_PLAYER": 2
}

var PLAYER_TILES = {
    "PLAYER_ONE": "1",
    "PLAYER_TWO": "2"
}

var selectedPlayerMode = null
var activePlayer = PLAYER_TILES.PLAYER_ONE
var boxOnHold = null

// Utils
function showInstruction(text) {
    document.getElementsByClassName("instruction")[0].innerText = text
}

function clearInstruction() {
    document.getElementsByClassName("instruction")[0].innerText = ""
}

function isBoxEmpty(box) {
    clearInstruction()
    if (!box.innerText) {
        return true
    } else {
        showInstruction("You can't play on a tile a player has played on.")
        return false
    }
}

/**
 * Function to switch between the two player modes
 */
function switchPlayerMode(value) {
    selectedPlayerMode = value
}

// Controllers?
/**
 * Displays player alphabet in a box on a game board
 * @param {element} box: The src element or box to be marked
 */
function displayAlphabetOnBox(box, alphabet) {
    if (isBoxEmpty(box)) {
        box.innerText = alphabet
        activePlayer = activePlayer === PLAYER_TILES.PLAYER_ONE
            ? PLAYER_TILES.PLAYER_TWO
            : PLAYER_TILES.PLAYER_ONE
        showInstruction("Player "+ activePlayer +", please click on a tile")
    }
}

function holdBox(box) {
    if (isBoxEmpty(box)) {
        if (boxOnHold) {
            // clear previous box on hold if any
            boxOnHold.innerText = ""
            boxOnHold = null
        }
         var playerClassName = activePlayer === PLAYER_TILES.PLAYER_ONE
            ? "player-one-color"
            : "player-two-color"
        boxOnHold = box
        boxOnHold.innerText = "?"
        boxOnHold.className = boxOnHold.className.concat(" " + playerClassName)
        showInstruction("Player "+ activePlayer + ", please enter your alphabet")
    }
}

function getBoxOnHold() {
    // looks simple now, but we might want to do
    // some more checks to determine if the box is on hold in future
    return boxOnHold === null ? false : boxOnHold
}

function clearBoxOnHold() {
    
}

function onKeyPress(event) {
    console.log("key is pressed...", event)
    var boxOnHold = getBoxOnHold()
    if (!boxOnHold) {
        showInstruction("Player "+ activePlayer +", please click on a tile")
        return
    }
    displayAlphabetOnBox(boxOnHold, event.key.toUpperCase())
}

window.onkeydown = onKeyPress

// Init
function init() {
    var columns = document.getElementsByClassName("game-board-col")
    for (var i = 0; i < columns.length; i++) {
        columns[i].onclick = function (event) {
            holdBox(event.srcElement)
        }
    }
    showInstruction("Click on a tile/box to begin")
}

init()