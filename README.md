# Coin Grab

A 2D arcade-style game which records player scores in a smart contract on the Ethereum blockchain. Player must collect as many coins as they can before the timer runs out.

> Game builds on [this tutorial](https://ethereumdevelop.com/ethereum-game-programming/)

### Technologies

- [Phaser.js](https://phaser.io/)
- [web3](https://github.com/ethereum/web3.js/)
- [Solidity](https://github.com/ethereum/solidity)

### Todos

- Use constants rather than magic numbers. For example, the speed of the player could be defined in a constant called PLAYER_SPEED that we can assign an integer value to, instead of using the number 2 everywhere.
- Set up a more organized file structure. All the Phaser.js functions can be defined in a separate file called Game.js. All the constants can be defined in a file called Constants.js. Our helper functions can be defined in their own file. And so on.
- The game currently shows the player's highscores with window.alert() after a game ends. Retrieve the highscore before the game begins and show that on screen as the game is being played. Also, other players’ highscores are publicly accessible from within the game. Make a highscore board which displays all the players’ scores as a ranked list.
- As is, this game is not very friendly to a casual no-coiner gamer. It requires a browser extension with an unconventional login system. Additionally, since recording scores on-chain requires transactions of ETH, the player is required to manage funds. A casual player should not have to worry about these things. Look into Portis as an option for a conventional login system and the Gas Station Network to pay for small transactions on behalf of the player.
- What if playing the game required a buy-in and the total buy-in of all the players contributed to a prize pot?
- How about using NFTs as a way to have a built-in marketplace for in-game items?
