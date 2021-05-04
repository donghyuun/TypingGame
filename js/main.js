const GAME_TIME = 3;
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;

const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

wordInput.addEventListener('input', () => {

  if (wordInput.value === wordDisplay.innerText) {
    score++;
    scoreDisplay.innerText = score;
    wordInput.value = "";
  }
});

//setInterval(countDown, 1000);

//loading이 다 됬을때 실행할 함수인듯
buttonChange('게임시작');

function run(){//button눌렀을때 실행되는 함수
  isPlaying = true;
  time = GAME_TIME;
  timeInterval = setInterval(countDown, 1000);
};

//숫자를 세는 함수
function countDown(){
  //isPlaying은 게임이 시작되지 않은상태
  time > 0 ? time-- : isPlaying = false;
  if(!isPlaying){
    clearInterval(timeInterval)
  }//시간(time)이 끝나면 countDown을 계속 할 필요 없으니까 종료
  timeDisplay.innerText = time;
};

function buttonChange(text){
  button.innerText = text;
  text === '게임시작' ? button.classList.remove('loading') : button.classList.add('loading');
  //text가 게임시작이면 loading이 다 된거니까 class를 없앰, 그게 아니면 loading중이므로 class추가
}//31:13