// Preload game assets
function preload() {
  this.load.image('coin', '../assets/Coin.png');
  this.load.spritesheet('player', '../assets/pixel guy.png', {
    frameWidth: 32,
    frameHeight: 32
  });
}

// Define game objects
function create() {}

// Engine loop
function update() {}

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
};

var game = new Phaser.Game(config);