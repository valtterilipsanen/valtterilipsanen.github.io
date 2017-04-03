function player(x,y,w,h,speed) {
 this.x = x;
 this.y = y;
 this.w = w;
 this.h = h;
 this.speed = speed;
}


var width = window.innerWidth - 25;
var height = window.innerHeight - 25;
    
/* Player */

var p = new player(width / 2,height / 2,40,40,4); 

function drawPlayer(context) {
  var x = p.x - (p.w / 2);
  var y = p.y - (p.h / 2);
  context.fillStyle = '#FF0000';
  context.fillRect(x,y, p.w, p.h);
}

function x(){
    p.x;
}
function y() {
    p.y;
}




function movePlayer(dir) {
  switch (dir) {
    case "left": 
      p.x -= p.speed;
      if (p.x < (p.w / 2)) {
        p.x = (p.w / 2);
          
      }
      break;
    case "right":
      p.x += p.speed;
      if (p.x > width - (p.w / 2)) {
        p.x = width - (p.w / 2);
      }
      break;
    case "up":
      p.y -= p.speed;
      if (p.y < (p.w / 2)) {
        p.y = (p.w / 2);
      }
      break;
    case "down":
      p.y += p.speed;
      if (p.y > height - (p.w / 2)) {
        p.y = height - (p.w / 2);
      }
      break;
  }
}

function changeSpeed(am) {
    p.speed = am;
}

function reset() {
    p.x = 200;
    p.y = 200;
    p.speed = 10;
}

