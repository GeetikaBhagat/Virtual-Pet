//Create variables here
var dog, happyDog, dogImg;
var database;
var foodS, foodStock;

function preload() {
  //load images here
  dogImg = loadImage('dogImg.png');
  happyDog = loadImage('dogImg1.png');
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250, 250);
  dog.addImage(dogImg);
  dog.scale=0.5

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

}


function draw() {

  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDog);
    dog.scale = 0.5;
  }
  drawSprites();
  //add styles here
  textSize(20);
  fill('red');
  stroke('white');
  text('Press UP arrow to feed the Dog.', 150, 50);

}
function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  database.ref('/').update({
    FOOD: x
  })
}
