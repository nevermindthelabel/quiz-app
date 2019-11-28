const username = document.getElementById('username');

username.addEventListener('keyup', () => {
  console.log(username.value);
});


saveHighScore = e => {
  event.preventDefault();
  console.log('Clicked')
}
