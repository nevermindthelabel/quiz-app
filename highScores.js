const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem('High Scores')) || [];

highScoresList.innerHTML =
highScores.map(score => {
  return `<li class='high-score text-center'>${score.name} : ${score.score}</li>`
}).join('');
