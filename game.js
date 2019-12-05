const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progress-bar-full');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
        .then(res => {
  return res.json();
}).then( loadedQuestions => {
  questions = loadedQuestions.results.map(loadedQuestion => {
    const formattedQuestion = {
      question: loadedQuestion.question
    };
    const answerChoices = [...loadedQuestion.incorrect_answers];
    formattedQuestion.answer = Math.floor(Math.random() * 3) +1;
    answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestion.correct_answer);
    answerChoices.forEach((choice, i) => {
      formattedQuestion['choice' + (i + 1)] = choice;
    })
    return formattedQuestion;
  })
  startGame();
})
.catch(err => {
  console.error(err)
})

const correctBonus = 10;
const maxQuestions = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
}

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
    console.log(availableQuestions.length, questionCounter);
    localStorage.setItem('Most Recent Score', score);
    // go to the end page
    return window.location.assign('/end.html');
  }
  questionCounter ++;
  progressText.innerText = `Question ${questionCounter} / ${maxQuestions}`;
  // update the progress bar dynamically

  progressBarFull.style.width = `${(questionCounter/ maxQuestions) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach( choice => {
    const correctGuess = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + correctGuess];
  });
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;

    const selectedChoice = e.target;
    const selectedAnswer = parseInt(selectedChoice.dataset['number']);

    const classToApply = selectedAnswer === currentQuestion.answer ? 'correct' : 'incorrect';

    if (classToApply === 'correct') {
      incrementScore(correctBonus);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1500);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
}
