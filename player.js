
function player(x,y,r,speed) {
 this.x = x;
 this.y = y;
 this.r = r;
 this.speed = speed;
}


var width = window.innerWidth - 25;
var height = window.innerHeight - 25;
    
/* Player */

var p = new player(width / 2,height / 2,20,4); 

function drawPlayer(context) {
  var x = p.x;
  var y = p.y;
  context.beginPath();
  context.fillStyle = '#FF0000';
  context.arc(x,y,p.r,0,2*Math.PI);
  context.fill();
  context.closePath();
}

function x(){
    p.x;
}
function y() {
    p.y;
}




function movePlayer(dir) {
    var oldX = p.x;
    var oldY = p.y;
  switch (dir) {
    case "left": 
      p.x -= p.speed;
      if (p.x < p.r) {
        p.x = p.r;
          
      }
      break;
    case "right":
      p.x += p.speed;
      if (p.x > width - p.r) {
        p.x = width - p.r;
      }
      break;
    case "up":
      p.y -= p.speed;
      if (p.y < p.r) {
        p.y = p.r;
      }
      break;
    case "down":
      p.y += p.speed;
      if (p.y > height - p.r) {
        p.y = height - p.r;
      }
      break;
  }
    for(k = 0; k < enemies.length; k++){
        var distance = Math.sqrt(Math.pow((p.x - enemies[k].x),2) + Math.pow((p.y - enemies[k].y),2))
        if(distance < p.r + enemies[k].r){
            p.x = oldX;
            p.y = oldY;
        }
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

