const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('Most Recent Score');

const highScores = JSON.parse(localStorage.getItem('High Scores')) || [];

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
  saveScoreBtn.disabled = !username.value.length;
});


saveHighScore = e => {
  event.preventDefault();
  console.log('Clicked');

  const score = {
    score: mostRecentScore,
    name: username.value
  };
  console.log(score);
  highScores.push(score);
  console.log(highScores);
  username.value = '';
}
