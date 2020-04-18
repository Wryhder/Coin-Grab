// Store player's ethereum account as a global variable
var account;

var player;
var cursors;
var coins = new Array();
var score;
var score_text;
var frames;
var frames_text;
var timer;
var timer_text;
var rand_x, rand_y;

// Check if web3 has been injected by the browser (MetaMask)
if (typeof web3 !== 'undefined') {
  // Use provider
  var web3js = new Web3(web3.currentProvider);
  console.log("web3 has been injected");

  // Require player to first login to MetaMask
  ethereum.enable()
    .then(function (a) {
      // ethereum.enable() returns a promise of an array of hex-prefixed ethereum address strings
      // We can store the first entry into our global 'account' variable
      account = a[0];

      // The configuration and creation of our Phaser game is now here,
      // the game won't start until the player logs in to MetaMask
      var config = {
        type: Phaser.WEBGL,
        parent: 'ivan-game',
        width: 800,
        height: 600,
        backgroundColor: 'black',
        scene: {
          preload: preload,
          create: create,
          update: update
        },
        pixelArt: true,
        audio: {
          disableWebAudio: true
        }
      }

      var game = new Phaser.Game(config);

    })
    .catch(function (error) {
      // Handle error. Likely the user rejected the login
      console.error(error);
    });
} else {
  // If the code goes here, this means the player doesn't have MetaMask installed
  console.log('No web3? You should consider trying MetaMask!');
}
 
// Preload game assets
function preload() {
  this.load.image('coin', '../assets/Coin.png');
  this.load.spritesheet('player', '../assets/pixel guy.png', {
    frameWidth: 32,
    frameHeight: 32
  });
}

// Define game objects
function create() {
  // Initialize player score
  score = 0;

  // Counts the number of frames game has run
  frames = 0;

  // Initialize timer to 20 seconds
  timer = 20;

  // Place a text label to display timer at top-right corner of screen
  timer_text = this.add.text(this.cameras.main.width - 25, 10, timer, null);
  
  // Display player score on top-left corner of screen
  score_text = this.add.text(10, 10, score, null);

  player = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'player');
  player.setScale(4);
  player.setOrigin(.5);

  this.anims.create({
    key: 'player_anim',
    frames: this.anims.generateFrameNumbers('player', { start: 0, end: 8 }),
    repeat: -1
  });

  player.anims.play('player_anim');

  cursors = this.input.keyboard.createCursorKeys();

  // Populate `coins` array with coin sprites randomly placed on screen
  for (var i = 0; i < 10; i++) {
    rand_x = Math.floor(Math.random() * Math.floor(800));
    rand_y = Math.floor(Math.random() * Math.floor(600));

    var coin = this.add.sprite(rand_x, rand_y, 'coin');

    // Set position of coin sprite at center of graphic
    coin.setOrigin(.5);

    coins.push(coin);
  }
}

// Engine loop
function update() {
  // Increment frame counter after every update
  frames++;

  // Decrement timer every second (or 60 frames)
  if (frames % 60 == 0) {
    timer--;
    timer_text.setText(timer);

    // End game when timer reaches 0
    if (timer == 0) {
      window.alert("GAME OVER");

      // TODO: Helper function for game-over logic
    }
  }

  // move the player up when up arrow key is pressed
  if (cursors.up.isDown) {
    player.y -= 2;
  }
  // move the player down when down arrow key is pressed
  if (cursors.down.isDown) {
    player.y += 2;
  }
  // move the player left when left arrow key is pressed
  if (cursors.left.isDown) {
    player.x -= 2;
  }
  // move the player right when right arrow key is pressed
  if (cursors.right.isDown) {
    player.x += 2;
  }

  coinCollection();
}

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
      score_text.setText(score);
    }
  }
}
