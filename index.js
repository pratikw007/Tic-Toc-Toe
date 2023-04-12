const boxes = document.querySelectorAll(".box")
const gameInfo = document.querySelector(".game-info")
const newGameBtn = document.querySelector(".btn")

let currentPlayer; //X or 0
let gameGrid;

// stored wining position
const winningPosition = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,3],
        [2,5,8],
        [0,4,8],
        [2,4,6]
];
// let's create a function to initialize the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // UI pr Empty bhi karna padega
    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvent="all";
        // one more thing is missing , inittialise box with css properties again
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

function swapTurn(){
            if (currentPlayer ===  "X") {
               currentPlayer = "0"; 
            }else {
                currentPlayer = "X"
            }
            // UI Update
            gameInfo.innerText = `Current Player - ${currentPlayer}`
}

function checkGameOver(){
       let answer = "";

        winningPosition.forEach((position)=>{
            // all 3 boxes are non-empty and exactly same in value
            if ((gameGrid[position[0]]!=="" || gameGrid[position[1]] !== "" || gameGrid[position[2]]!=="")
            && (gameGrid[position[0]]===gameGrid[position[1]])&&(gameGrid[position[1]]===gameGrid[position[2]])) {
            
                    // check if winner is X
                    if(gameGrid[position[0]]==="X")
                        answer = "X";
                    else 
                    answer = "0";

                    // disable pointer event
                boxes.forEach((box)=>{
                    box.style.pointerEvent = "none";
                })

                    // now we know X/0 is winner
                    boxes[position[0]].classList.add("win");
                    boxes[position[1]].classList.add("win");
                    boxes[position[2]].classList.add("win");
            }
        });
        // ------------------------------------------------
        // it means we have a winner
        if(answer !==""){
            gameInfo.innerHTML = `Winner Player - ${answer}`;
            newGameBtn.classList.add("active");
            return;
        }


        // let's checkwhen there is no Tie(no winner)
        // winner nhi mila
        let fillCount  = 0;
        gameGrid.forEach((box)=>{
            if(box !== "")
            fillCount++;
        });
        // board is Filled , Game is Tie

        if(fillCount === 9){
            gameInfo.innerText = "Game Tied !!";
            newGameBtn.classList.add("active");
        }

}

function handleClick(index){
        if (gameGrid[index]==="") {
            boxes[index].innerHTML = currentPlayer; //box k under 0/X  //ye line UI mai change krti hai         
            gameGrid[index] = currentPlayer;
             boxes[index].style.pointerEvent="none";
            // swap karo turn ko
            swapTurn();
            // swapped kro turn ko
            checkGameOver();

        }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",() => {
        handleClick(index);//apne aap se index genrate kr dega 
    })
})

newGameBtn.addEventListener("click",initGame);  






