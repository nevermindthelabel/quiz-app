const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem('High Scores')) || [];

highScores.map(score => {
  console.log(`${score.name} : ${score.score}`);
});
