var h0Img = new Image();
var h1Img = new Image();
var h2Img = new Image();
var h3Img = new Image();
var h4Img = new Image();
var h5Img = new Image();
var h6Img = new Image();
var h7Img = new Image();
var h8Img = new Image();
var ph0Img = new Image();
var ph1Img = new Image();
var ph2Img = new Image();
var ph3Img = new Image();
var ph4Img = new Image();
var ph5Img = new Image();
var ph6Img = new Image();
var ph7Img = new Image();
var ph8Img = new Image();

var killSound;
var ohYeah1;
var ohYeah2;
$(document).ready(function() {

h0Img.src = "assets/sprites/hippi0.png";
h1Img.src = "assets/sprites/hippi2.png";
h2Img.src = "assets/sprites/hippi4.png";
h3Img.src = "assets/sprites/hippi6.png";
h4Img.src = "assets/sprites/hippi8.png";
h5Img.src = "assets/sprites/hippi10.png";
h6Img.src = "assets/sprites/hippi12.png";
h7Img.src = "assets/sprites/hippi14.png";
h8Img.src = "assets/sprites/hippi16.png";

ph0Img.src = "assets/sprites/phippi0.png";
ph1Img.src = "assets/sprites/phippi2.png";
ph2Img.src = "assets/sprites/phippi4.png";
ph3Img.src = "assets/sprites/phippi6.png";
ph4Img.src = "assets/sprites/phippi8.png";
ph5Img.src = "assets/sprites/phippi10.png";
ph6Img.src = "assets/sprites/phippi12.png";
ph7Img.src = "assets/sprites/phippi14.png";
ph8Img.src = "assets/sprites/phippi16.png";

killSound = new Audio('assets/sounds/death.wav')
ohYeah1 = new Audio('assets/sounds/ohYeah1.wav')
ohYeah2 = new Audio('assets/sounds/ohYeah2.wav')
});

function hippie(x,y,r,speed,dir,state,img) {
 this.x = x;
 this.y = y;
 this.r = r;
 this.speed = speed;
 this.dir = dir;
 this.state = state;
 this.img = img;
 this.poo;
 this.ticks = 0;
}

var hSize = 20;
var hSpeed = 1;
var hCount = 300;



var hippies = [];


function hippieTick(){
  for(i = 0; i < hippies.length; i++){


    var e = hippies[i];
    e.ticks += 1;
    switch(e.ticks / 10){
      case 0:
      e.img = 0;
      break;
      case 1:
      e.img = 1;
      break;
      case 2:
      e.img = 2;
      break;
      case 3:
      e.img = 3;
      break;
      case 4:
      e.img = 4;
      break;
      case 5:
      e.img = 5;
      break;
      case 6:
      e.img = 6;
      break;
      case 7:
      e.img = 7;
      break;
      case 8:
      e.img = 8;
      e.ticks = 0;
      break;
    }
  }
  hCount += 1;
  if(hCount > 400){
    hCount = 0;
    addHippie();
  }
}
function drawHippies(context) {
  for(i = 0; i < hippies.length; i++){
    var e = hippies[i];
    var x = e.x;
    var y = e.y;


    context.save();
    context.translate(x,y);
    context.rotate(e.dir);
    if(e.state){
      switch (e.img) {
        case 0:
        context.drawImage(ph0Img, -e.r, -e.r, 2*e.r, 2*e.r);
        break;
        case 1:
        context.drawImage(ph1Img, -e.r, -e.r, 2*e.r, 2*e.r);
        break;
        case 2:
        context.drawImage(ph2Img, -e.r, -e.r, 2*e.r, 2*e.r);
        break;
        case 3:
        context.drawImage(ph3Img, -e.r, -e.r, 2*e.r, 2*e.r);
        break;
        case 4:
        context.drawImage(ph4Img, -e.r, -e.r, 2*e.r, 2*e.r);
        break;
        case 5:
        context.drawImage(ph5Img, -e.r, -e.r, 2*e.r, 2*e.r);
        break;
        case 6:
        context.drawImage(ph6Img, -e.r, -e.r, 2*e.r, 2*e.r);
        break;
        case 7:
        context.drawImage(ph7Img, -e.r, -e.r, 2*e.r, 2*e.r);
        break;
        case 8:
        context.drawImage(ph8Img, -e.r, -e.r, 2*e.r, 2*e.r);
        break;
      }
    }else{
    switch (e.img) {
      case 0:
      context.drawImage(h0Img, -e.r, -e.r, 2*e.r, 2*e.r);
      break;
      case 1:
      context.drawImage(h1Img, -e.r, -e.r, 2*e.r, 2*e.r);
      break;
      case 2:
      context.drawImage(h2Img, -e.r, -e.r, 2*e.r, 2*e.r);
      break;
      case 3:
      context.drawImage(h3Img, -e.r, -e.r, 2*e.r, 2*e.r);
      break;
      case 4:
      context.drawImage(h4Img, -e.r, -e.r, 2*e.r, 2*e.r);
      break;
      case 5:
      context.drawImage(h5Img, -e.r, -e.r, 2*e.r, 2*e.r);
      break;
      case 6:
      context.drawImage(h6Img, -e.r, -e.r, 2*e.r, 2*e.r);
      break;
      case 7:
      context.drawImage(h7Img, -e.r, -e.r, 2*e.r, 2*e.r);
      break;
      case 8:
      context.drawImage(h8Img, -e.r, -e.r, 2*e.r, 2*e.r);
      break;
    }
  }

    context.restore();

  }
}


function moveHippies() {


  for(i = 0; i < hippies.length; i++){
    var e = hippies[i];
    if(!e.state && poops.length > 0){
    var poop = poops[0]
    var dist = Math.sqrt(Math.pow((e.x - poops[0].x),2) + Math.pow((e.y - poops[0].y),2));
    for(k = 1; k < poops.length; k++){
      var d =  Math.sqrt(Math.pow((e.x - poops[k].x),2) + Math.pow((e.y - poops[k].y),2));
      if(d < dist){
        dist = d;
        poop = poops[k]
      }
    }

    var angle;
    if(e.x >= poop.x && e.y <= poop.y){
       angle = Math.atan((e.y - poop.y)/(e.x - poop.x)) + Math.PI;
     } else if(e.x <= poop.x && e.y <= poop.y){
       angle = Math.atan((e.y - poop.y)/(e.x - poop.x));
     } else if(e.x >= poop.x && e.y >= poop.y){
       angle = Math.atan((e.y - poop.y)/(e.x - poop.x)) + Math.PI;
     } else if(e.x <= poop.x && e.y >= poop.y){
       angle = Math.atan((e.y - poop.y)/(e.x - poop.x));
     }

    e.dir = angle;

    var x =  e.speed * Math.cos(e.dir);
    var y = e.speed * Math.sin(e.dir);

    e.x = e.x + x;
    e.y = e.y + y;

    if(dist < e.r ){
      switch (getRandomInteger(0,1)) {
        case 0:
          ohYeah1.pause();
          ohYeah1.currentTime = 0;
          ohYeah1.play();
          break;

        case 1:
          ohYeah2.pause();
          ohYeah2.currentTime = 0;
          ohYeah2.play();
          break;
      }
      e.state = true;
      e.poo = poop;
      poops.splice(poops.indexOf(poop),1);
    }

  } else {
    var angle;
    if(e.x >= p.x && e.y <= p.y){
       angle = Math.atan((e.y - p.y)/(e.x - p.x));
     } else if(e.x <= p.x && e.y <= p.y){
       angle = Math.atan((e.y - p.y)/(e.x - p.x)) + Math.PI;
     } else if(e.x >= p.x && e.y >= p.y){
       angle = Math.atan((e.y - p.y)/(e.x - p.x));
     } else if(e.x <= p.x && e.y >= p.y){
       angle = Math.atan((e.y - p.y)/(e.x - p.x)) + Math.PI;
     }
     e.dir = angle;

     var x =  e.speed * Math.cos(e.dir);
     var y = e.speed * Math.sin(e.dir);

     e.x = e.x + x;
     e.y = e.y + y;

     if(e.x < -100){
         e.x = -100;
     }
     if(e.x > width + 100){
         e.x = width  + 100;
     }
     if(e.y < -100){
         e.y = -100;
     }
     if(e.y > height  + 100){
         e.y = height  + 100;
     }

   }
  }
}

function addHippie() {

  var newX;
  var newY;

  switch(getRandomInteger(0,3)){
    case 0:
    newX = 0;
    newY = getRandomInteger(0,height);
    break;
    case 1:
    newY = 0;
    newX = getRandomInteger(0,width);
    break;
    case 2:
    newX = width;
    newY = getRandomInteger(0, height)
    break;
    case 3:
    newY = height;
    newX = getRandomInteger(0,width);
    break;
  }

  hippies.push(new hippie(newX, newY, hSize, hSpeed, 0, false, h1Img))

  }

function killHippie(index){
  killSound.pause();
  killSound.currentTime = 0;
  killSound.play();
  addSplat(hippies[index].x, hippies[index].y);
  if(hippies[index].state){
    addPoop(hippies[index].x, hippies[index].y)
  }
  hippies.splice(index,1);
}
