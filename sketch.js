//Create variables here
var dog, happyDog, dogImg;
var database;
var foodS, foodStock;

function preload() {
  //load images here
  dogImg = loadImage('images/dogImg.png');
  happyDog = loadImage('images/dogImg1.png');
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250, 250);
  dog.addImage(dogImg);
  dog.scale = 0.5

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

}


function draw() {

  background(46, 139, 87);
  if (foodS !== undefined) {

    if (keyWentDown(UP_ARROW)) {
      writeStock(foodS);
      dog.addImage(happyDog);
    }
    if (keyWentUp(UP_ARROW)) {
      dog.addImage(dogImg);
    }
    drawSprites();
  }
  //add styles here
  textSize(20);
  fill('red');
  stroke('white');
  text('Press UP arrow to feed the Dog.', 150, 50);
  text("Bottles left: " + foodS, 250, 480);
}


function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if (x <= 0) {
    x = 0;
  }
  else {
    x = x - 1;
  }
  database.ref('/').update({
    FOOD: x
  })
}
