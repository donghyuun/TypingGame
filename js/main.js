const GAME_TIME = 3;
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let checkInterval;

const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

//바로 실행되는 함수 
init();

function init() {
  getWords();
  wordInput.addEventListener('input', checkMatch)
}

//게임끝나면 실행되는 함수, 현 상태를 체크
function checkStatus() {
  if (!isPlaying && time === 0) {
    buttonChange("게임시작")
    clearInterval(checkInterval)//이미 게임종료로 바뀌었으니까
  }
}

//단어 불러오기
function getWords() {
  axios.get('https://random-word-api.herokuapp.com/word?number=100')
  .then(function (response) {
    words = response.data;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

  buttonChange('게임시작')
  }

  


//단어일치 체크, 단어가 일치할때 socre++, 단어 교체가 된다.
function changeNewWord(){
  const randomIndex = Math.floor(Math.random() * words.length);//새로 올릴 단어선택
  wordDisplay.innerText = words[randomIndex]
}


function checkMatch() {
  if (wordInput.value === wordDisplay.innerText) {
    wordInput.value="";//input란 비우기
    if(!isPlaying){ return; }//값이 일치해도 !isPlaying이면 score올릴 수 없으므로 return
    score++;
    scoreDisplay.innerText = score;
    time = GAME_TIME;//시간 원상복귀
    changeNewWord();
  }
}

//setInterval(countDown, 1000);

//loading이 다 됬을때 실행할 함수인듯
buttonChange('게임시작');

function run() {//button눌렀을때 실행되는 함수
if(isPlaying){return;}
  changeNewWord();
  isPlaying = true;
  time = GAME_TIME; //없어도 될 것 같은데, 아 게임다시 시작할때 필요할듯
  wordInput.focus();
  scoreDisplay.innerText = 0;//점수 초기화
  timeInterval = setInterval(countDown, 1000);//시간 카운트
  checkInterval = setInterval(checkStatus, 50);//상태체크해서 게임종료면 게임종료라고 버튼에 표시
  buttonChange('게임중')
};

//숫자를 세고 게임중인지 아닌지 상태를 정의함
function countDown() {
  //isPlaying은 게임이 시작되지 않은상태
  time > 0 ? time-- : isPlaying = false;
  if (!isPlaying) {
    clearInterval(timeInterval)
  }//시간(time)이 끝나면 countDown을 계속 할 필요 없으니까 종료
  timeDisplay.innerText = time;
};

function buttonChange(text) {
  button.innerText = text;
  text === '게임시작' ? button.classList.remove('loading') : button.classList.add('loading');
  //text가 게임시작이면 loading이 다 된거니까 class를 없앰, 그게 아니면 loading중이므로 class추가
}