// Global Vars
var PLAYER_MODES = {
    "SINGLE_PLAYER": 1,
    "TWO_PLAYER": 2
}

var PLAYER_TILES = {
    PLAYER_ONE: {
        code: "1",
        class: "player-one-color"
    },
    PLAYER_TWO: {
        code: "2",
        class: "player-two-color"
    }
}

var selectedPlayerMode = null
var activePlayer = PLAYER_TILES.PLAYER_ONE
var boxOnHoldClassName = ""

// Utils
function showInstruction(text) {
    document.getElementsByClassName("instruction")[0].innerText = text
}

function clearInstruction() {
    document.getElementsByClassName("instruction")[0].innerText = ""
}

function isBoxEmpty(box, acknowledgeQuestionMark) {
    clearInstruction()
    if (!box.innerText || (acknowledgeQuestionMark === true && box.innerText === "?")) {
        return true
    } else {
        showInstruction("You can't play on a tile a player has played on.")
        return false
    }
}

function getBox(className) {
    return className ? document.getElementsByClassName(className)[0] : {}
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
    var activeBox = box
    if (isBoxEmpty(activeBox, true)) {
        activeBox.innerText = alphabet
        activePlayer = activePlayer === PLAYER_TILES.PLAYER_ONE
            ? PLAYER_TILES.PLAYER_TWO
            : PLAYER_TILES.PLAYER_ONE
        clearBoxOnHold()
        showInstruction("Player "+ activePlayer.code +", please click on a tile")
    }
}

function holdBox(className) {
    var box = getBox(className)
    if (isBoxEmpty(box, false)) {
        if (boxOnHoldClassName) {
            var currentlyHeldBox = getBox(boxOnHoldClassName)
            currentlyHeldBox.innerText = ""
            // This sucks, do it in a better way.
            currentlyHeldBox.className = currentlyHeldBox.className.replace(PLAYER_TILES.PLAYER_ONE.class, "").trim()
            currentlyHeldBox.className = currentlyHeldBox.className.replace(PLAYER_TILES.PLAYER_TWO.class, "").trim()
        }
        clearBoxOnHold()
        var playerClassName = activePlayer.class
        var boxOnHold = box
        boxOnHold.innerText = "?"
        boxOnHold.className = boxOnHold.className.concat(" " + playerClassName)
        boxOnHoldClassName = className
        showInstruction("Player "+ activePlayer.code + ", please enter your alphabet")
    }
}

function getBoxOnHold() {
    // looks simple now, but we might want to do
    // some more checks to determine if the box is on hold in future
    return getBox(boxOnHoldClassName)
}

function clearBoxOnHold() {
    // clear previous box on hold if any
    boxOnHoldClassName = ""
}

function onKeyPress(event) {
    var boxOnHold = getBoxOnHold()
    if (!boxOnHold) {
        showInstruction("Player "+ activePlayer.code +", please click on a tile")
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
            // holdBox(event.srcElement)
            holdBox(event.srcElement.className)
        }
    }
    showInstruction("Click on a tile/box to begin")
}

init()