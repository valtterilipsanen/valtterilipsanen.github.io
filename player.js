var tImg = new Image();
var t2Img = new Image();
var tOImg = new Image();
var tO2Img = new Image();
var tVImg = new Image();
var tV2Img = new Image();

var pickSound;


$(document).ready(function() {

tImg.src = "assets/sprites/traktorit/traktori.png"
t2Img.src = "assets/sprites/traktorit/traktori2.png"
tOImg.src = "assets/sprites/traktorit/traktoriO.png"
tO2Img.src = "assets/sprites/traktorit/traktoriO2.png"
tVImg.src = "assets/sprites/traktorit/traktoriV.png"
tV2Img.src = "assets/sprites/traktorit/traktoriV2.png"

pickSound = new Audio('assets/sounds/pickup.wav')
});

function player(x,y,r,speed,dir) {
 this.x = x;
 this.y = y;
 this.r = r;
 this.speed = speed;
 this.dir = dir;
 this.ticks = 0;
 this.img = "s"
 this.speedUp = false;
};


var pSpeed = 3;
var windowWidth = 1000;
var windowHeight = 700;

var width = 1000;
var height = 700;


var p = new player(width / 2, height / 2, 40, pSpeed, 0);

function playerTick(){
  p.ticks += 1
  if(p.ticks > 10){
    p.ticks = 0;
  }
}
function changeDir(dir) {
  switch(dir) {
    case "left":
    p.dir = p.dir - 0.05;
    break;
    case "right":
    p.dir = p.dir + 0.05;
    break;
  }
}




function drawPlayer(context) {
  var x = p.x;
  var y = p.y;

  context.save();
  context.translate(x, y);
  context.rotate(p.dir + Math.PI / 2);
  if(p.img == "s"){
    if(p.ticks >= 5){
    context.drawImage(tImg, -p.r, -p.r, 2 * p.r, 2 * p.r );
  } else {
      context.drawImage(t2Img, -p.r, -p.r, 2 * p.r, 2 * p.r );
  }
}else if(p.img == "l"){
    if(p.ticks >= 5){
    context.drawImage(tVImg, -p.r, -p.r, 2 * p.r, 2 * p.r );
  } else {
      context.drawImage(tV2Img, -p.r, -p.r, 2 * p.r, 2 * p.r );
  }
}else if(p.img == "r"){
    if(p.ticks >= 5){
    context.drawImage(tOImg, -p.r, -p.r, 2 * p.r, 2 * p.r );
  } else {
      context.drawImage(tO2Img, -p.r, -p.r, 2 * p.r, 2 * p.r );
  }
  }else{
    context.drawImage(tImg, -p.r, -p.r, 2 * p.r, 2 * p.r );
  }

  context.restore();

}


function movePlayer() {
var sp = p.speed;
if(p.img != "s"){
  sp = 0.7 * p.speed;
}
var x = sp * Math.cos(p.dir);
var y = sp * Math.sin(p.dir);
var oldX = p.x;
var oldY = p.y;

p.x = p.x + x;
p.y = p.y + y;

if(p.x <= p.r ||p.x >= width - p.r){
  p.x = oldX;
}
if(p.y <= p.r || p.y >= height - p.r){
  p.y = oldY;
}

for(i = 0; i < cows.length; i++){
var e = cows[i];
var dist = Math.sqrt(Math.pow((p.x - e.x),2) + Math.pow((p.y - e.y),2));
if(dist < p.r + e.r - 10){
  killCow(i);
 }
}

 for(i = 0; i < hippies.length; i++){
 var e = hippies[i];
 var dist = Math.sqrt(Math.pow((p.x - e.x),2) + Math.pow((p.y - e.y),2));
 if(dist < p.r + e.r){
   killHippie(i);
   score -= 2;
  }
}

for(i = 0; i < gMen.length; i++){
var e = gMen[i];
var dist = Math.sqrt(Math.pow((p.x - e.x),2) + Math.pow((p.y - e.y),2));
if(dist < p.r + e.r){
  killGMan(i);
 }
}

for(i = 0; i < poops.length; i++){
  var e = poops[i];
  var dist = Math.sqrt(Math.pow((p.x - e.x),2) + Math.pow((p.y - e.y),2));
  if(dist < p.r + e.r){
    pickSound.pause();
    pickSound.currentTime = 0;
    pickSound.play();
    poops.splice(i,1);
    score += 1;
   }
}

}
