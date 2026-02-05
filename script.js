const clickSound = new Audio('click.mp3');
const resetSound = new Audio('reset.mp3');
const celebration = new Audio('celebration.mp3');
const img = document.querySelector('.img');

const btn = document.querySelectorAll('.btn');
const resetBtn = document.querySelector('.reset');
const para = document.querySelector('.para');
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

let turnX = true;

btn.forEach(btn => {
  btn.addEventListener('click', () => {
    clickSound.play();
    if(turnX) {
     btn.textContent = 'X';
     para.textContent = 'Turn For 0';
     btn.style.color = ' rgb(118, 11, 11)';
     turnX = false;
    } else {
      btn.textContent = '0';
      para.textContent = 'Turn For X';
      btn.style.color = 'rgb(22, 22, 84)';
      turnX = true;
    }
    btn.disabled = true;
    checkWin();
    count++;
    if(count === 9) {
      para.textContent = 'Tie, play again!';
      disableBtn();
    }
  })
})

function checkWin() {
  winPatterns.forEach(pattern => {
      let pos1Val = btn[pattern[0]].textContent;
      let pos2Val = btn[pattern[1]].textContent;
      let pos3Val = btn[pattern[2]].textContent;

      if(pos1Val && pos2Val && pos3Val !== '') {
        if(pos1Val === pos2Val && pos2Val === pos3Val) {
          para.textContent = pos1Val + ' Won';
          celebration.play();
          disableBtn();
          img.style.width = '20vmin';
          count = 0;
        }
      }
   })
}

function disableBtn() {
  btn.forEach(btn => {
    btn.disabled = true;
  })
}

function resetGame() {
  resetSound.play();
  para.textContent = 'Turn For X';
  btn.forEach(btn => {
    btn.textContent = '';
    btn.disabled = false;
    turnX = true;
    img.style.width = '0px';
    celebration.pause();
    count = 0;
  })
}


resetBtn.addEventListener('click', resetGame);
