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
  var player = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'player');
  player.setScale(4);
  player.setOrigin(.5);
  
  this.anims.create({
    key: 'player_anim',
    frames: this.anims.generateFrameNumbers('player', { start: 0, end: 8 }),
    repeat: -1
  });

  player.anims.play('player_anim');

}

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