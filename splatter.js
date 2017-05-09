var s0Img = new Image();
var s1Img = new Image();
var s2Img = new Image();
var s3Img = new Image();
var s4Img = new Image();
var s5Img = new Image();
var splatSound;
$(document).ready(function() {

s0Img.src = "assets/sprites/blood0.png"
s1Img.src = "assets/sprites/blood1.png"
s2Img.src = "assets/sprites/blood2.png"
s3Img.src = "assets/sprites/blood3.png"
s4Img.src = "assets/sprites/blood4.png"
s5Img.src = "assets/sprites/blood5.png"

splatSound = new Audio('assets/sounds/splat.wav');
});


function splatter(x,y){
  this.x = x;
  this.y = y;
  this.r = 30;
  this.count = 0;
}

var splats = [];

function addSplat(x,y){
  splatSound.pause();
  splatSound.currentTime = 0;
  splatSound.play();
  splats.push(new splatter(x,y));
}

function splatTick(){
  for(i = 0; i < splats.length; i++){
    splats[i].count += 1;
  }
}

function drawSplatter(context){
  for(i = 0; i < splats.length; i++){
    var e = splats[i];
    var x = e.x;
    var y = e.y;
    context.save();
    context.translate(x,y);
    if(e.count < 100){
      context.drawImage(s0Img, -e.r, -e.r, 2*e.r, 2*e.r);
    } else if(e.count < 200){
      context.drawImage(s1Img, -e.r, -e.r, 2*e.r, 2*e.r);
    } else if(e.count < 300){
      context.drawImage(s2Img, -e.r, -e.r, 2*e.r, 2*e.r);
    } else if (e.count < 400){
      context.drawImage(s3Img, -e.r, -e.r, 2*e.r, 2*e.r);
    } else if (e.count < 500){
      context.drawImage(s4Img, -e.r, -e.r, 2*e.r, 2*e.r);
    } else if (e.count < 600){
      context.drawImage(s5Img, -e.r, -e.r, 2*e.r, 2*e.r);
    }
    context.restore();
  }
}
