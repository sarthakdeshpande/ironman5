//Declaring variables for every object
var bg, backgroundImg;
var ironman, ironmanImg;
var stoneImg, stoneGroup;
var diamondGroup, diamondImg;
var spikeGroup, spikeImg;;
var score = 0;

//funcion preload to all assects
function preload() {
  //loading images to our game objects
  backgroundImg = loadImage("images/bg.jpg");
  ironmanImg = loadImage("images/iron.png");
  stoneImg = loadImage("images/stone.png");
  diamondImg = loadImage("images/diamond.png");
  spikeImg = loadImage("images/spikes.png");
}

//setup function for placing objects on screen
function setup() {

  //creating game screen
  createCanvas(1000, 600);

  //adding background to the screen
  bg = createSprite(580, 300);
  bg.addImage(backgroundImg)

  //creating ironman and adding image to it
  ironman = createSprite(100, 400, 50, 100);
  ironman.addImage(ironmanImg)
  ironman.scale = 0.3;
  //ironman.debug=true;
  ironman.setCollider("rectangle", 100, 0, 200, 400)

  //creating groups
  stoneGroup = new Group();
  diamondGroup = new Group();
  spikeGroup = new Group();
}

//function draw for setting properties of your character
function draw() {
  //giving keyboard controls for ironman
  if (keyDown("up")) {
    ironman.velocityY = -10;
  }
  if (keyDown("left")) {
    ironman.x = ironman.x - 5;
  }
  if (keyDown("right")) {
    ironman.x = ironman.x + 5;
  }
  ironman.velocityY = ironman.velocityY + 0.5;

  //calling the functions to generate the objects
  GenerateStone();
  GenerateDiamonds();
  GenerateSpikes();

  //making only one object of the group destory if mario touches it
  for (var i = 0; i < stoneGroup.length; i++) {
    var temp = stoneGroup.get(i)
    ironman.collide(temp);
  }

  for (var i = 0; i < diamondGroup.length; i++) {
    var temp = diamondGroup.get(i)

    if (temp.isTouching(ironman)) {
      score++
      temp.destroy();
      temp = null;
    }
  }

  for (var i = 0; i < spikeGroup.length; i++) {
    var temp = spikeGroup.get(i)

    if (temp.isTouching(ironman)) {
      score = score - 5;
      temp.destroy();
      temp = null;
    }
  }
  //adding drawsprites to draw the sprites on the screen
  drawSprites();

  //giving color and size to the text
  fill("white")
  textSize(25);
  text("Score : " + score, 100, 100);
}


function GenerateDiamonds() {
  if (frameCount % 110 == 0) {
    var diamonds = createSprite(random(10, 900), 30, 100, 50);
    diamonds.addImage(diamondImg);
    diamonds.scale = 0.5;
    diamonds.velocityY = 2;
    diamonds.lifetime = 500;
    //diamonds.debug=true
    diamonds.setCollider("rectangle", 0, 0, 80, 80)
    diamondGroup.add(diamonds);
  }
}

function GenerateStone() {
  if (frameCount % 120 == 0) {
    var stone = createSprite(random(10, 900), 30, 100, 50);
    stone.addImage(stoneImg);
    stone.velocityY = 2;
    stone.lifetime = 500;
    //stone.debug=true;
    stone.setCollider("rectangle", 0, 0, 200, 40)
    stoneGroup.add(stone);
  }
}

function GenerateSpikes() {
  if (frameCount % 120 == 0) {
    var spikes = createSprite(random(10, 900), 30, 100, 50);
    spikes.addImage(spikeImg);
    spikes.velocityY = 2;
    spikes.lifetime = 500;
    //spikes.debug=true;
    spikes.setCollider("rectangle", 0, 0, 50, 50)
    spikeGroup.add(spikes);
  }
}