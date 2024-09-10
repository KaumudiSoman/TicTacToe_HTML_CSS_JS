let boxes = document.querySelectorAll('.box')
let resetBtn = document.querySelector('#reset-btn')
let newGameBtn = document.querySelector('#new-btn') 
let winnerMsg = document.querySelector('#winner')

let turn0 = true
let count = 0

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if(turn0) {
            box.innerText = 'O'
            box.style.color = '#F50000'
            turn0 = false
        }
        else {
            box.innerText = 'X'
            box.style.color = '#0044FF'
            turn0 = true
        }
        box.disabled = true
        count++

        let Winner = checkWinner();
        if(count === 9 && !Winner) {
            drawGame()
        }
    })
});

const checkWinner = () => {
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText
        let pos2Val = boxes[pattern[1]].innerText
        let pos3Val = boxes[pattern[2]].innerText

        if(pos1Val != '' && pos2Val != '' && pos3Val != '') {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val)
                return true
            }
        }
    }
};

const showWinner = (winner) => {
    winnerMsg.innerHTML = `Congratulations, Winner is ${winner}!!`
    for(let box of boxes) {
        box.disabled = true
    }
}

const drawGame = () => {
    winnerMsg.innerHTML = `It is a tie. Try again.`
    for(let box of boxes) {
        box.disabled = true
    }
}

const resetGame = () => {
    for(let box of boxes) {
        box.disabled = false
        box.innerText = ''
    }
    winnerMsg.innerText = ''
}

resetBtn.addEventListener('click', resetGame)
newGameBtn.addEventListener('click', resetGame)