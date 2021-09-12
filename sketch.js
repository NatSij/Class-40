var canvas, backgroundImage;
var xVel;
var yVel;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var rock, rockImage;
var rocks;

var form, player, game;
var whiteCar, redCar, blueCar, blackCar;
var cars, car1, car2, car3, car4;
var ground;
var track;


function preload(){
rockImage = loadImage("images/Rock Obstacle Image.png");
whiteCar = loadImage("images/car1.png");
redCar = loadImage("images/car2.png");
blueCar = loadImage("images/car3.png");
blackCar = loadImage("images/car4.png");
ground = loadImage("images/ground.png");
track = loadImage("images/track.jpg");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  xVel = 0;
  yVel = 0;
  rocks = createGroup();
  for(var i = 0; i < 5; i++){
  w = random(200, 900);
  h = random(-height*4, height - 300);
  rock = createSprite(w, h);
  rock.addImage("rock", rockImage);
  rocks.add(rock);
  }
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end(); 
  }
}
