function coinCollection() {
  for (var coin of coins) {
    if (player.x > (coin.x - coin.width / 2)
      && player.x < (coin.x + coin.width / 2)
      && player.y > (coin.y - coin.height / 2)
      && player.y < (coin.y + coin.height / 2)) {

      // collision; move coin to some other random location
      rand_x = Math.floor(Math.random() * Math.floor(800));
      rand_y = Math.floor(Math.random() * Math.floor(600));
      coin.x = rand_x;
      coin.y = rand_y;

      // Increase player score
      score += 1;

      // Update score display
      score.text.setText(score);
    }
  }
}

export {
  coinCollection
};