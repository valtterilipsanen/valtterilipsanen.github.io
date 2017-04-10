
function player(x,y,r,speed,dir) {
 this.x = x;
 this.y = y;
 this.r = r;
 this.speed = speed;
 this.dir = dir;
}


var width = window.innerWidth - 25;
var height = window.innerHeight - 25;
    
/* Player */
var plMod = -27;

var p = new player(width / 2,height / 2,69,4, 'E'); 

function drawPlayer(context) {
  
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
        if(distance < p.r + plMod + enemies[k].r){
            p.x = oldX;
            p.y = oldY;
            var angle = 0;
            var en = enemies[k];
            
                      
            if(p.x >= en.x && p.y <= en.y){
                 angle = Math.atan((p.y - en.y)/(p.x - en.x));      
             } else if(p.x <= en.x && p.y <= en.y){
                 angle = Math.atan((p.y - en.y)/(p.x - en.x)) + Math.PI;
             } else if(p.x >= en.x && p.y >= en.y){
                  angle = Math.atan((p.y - en.y)/(p.x - en.x));
             } else if(p.x <= en.x && p.y >= en.y){
                  angle = Math.atan((p.y - en.y)/(p.x - en.x)) + Math.PI;
              }
             
             en.dir = new direction(angle + Math.PI);
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

