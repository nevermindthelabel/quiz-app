const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('Most Recent Score');
const addScore = document.getElementById('score');
const highScores = JSON.parse(localStorage.getItem('High Scores')) || [];
const maxNumHighScores = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
  saveScoreBtn.disabled = !username.value.length;
});


saveHighScore = e => {
  event.preventDefault();
  console.log('Clicked');

  const score = {
    score: Math.floor(Math.random() * 100),
    name: username.value
  };
  username.value = '';
  console.log(score);
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);
  localStorage.setItem('High Scores', JSON.stringify(highScores));
}
