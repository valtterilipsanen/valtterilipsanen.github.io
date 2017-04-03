function enemy(x,y,w,h,speed,dir) {
 this.x = x;
 this.y = y;
 this.w = w;
 this.h = h;
 this.speed = speed;
 this.dir = dir;
}


var width = window.innerWidth - 20;
var height = window.innerHeight - 20;
    

var dirs = ["N","NE","E","SE","S","SW","W","NW"]
var enemies = [new enemy(300,300,20,20,5,"SE"), new enemy(500,700,20,20,5,"NE") ]; 

function drawEnemies(context) {
  for(i = 0; i < enemies.length; i++){
  var e = enemies[i]
  var x = e.x - (e.w / 2);
  var y = e.y - (e.h / 2);
  context.fillStyle = '#ffff00';
  context.fillRect(x,y, e.w, e.h);  
  }

}

function moveEnemies() {
  for(i = 0; i < enemies.length; i++){
  var e = enemies[i];
  switch (e.dir) {
    case "W": 
      e.x -= e.speed;
      if (e.x < (e.w / 2)) {
        e.x = (e.w / 2);    
      }
      break;
    case "E":
      e.x += e.speed;
      if (e.x > width - (e.w / 2)) {
        e.x = width - (e.w / 2);
      }
      break;
    case "N":
      e.y -= e.speed;
      if (e.y < (e.w / 2)) {
        e.y = (e.w / 2);
      }
      break;
    case "S":
      e.y += e.speed;
      if (e.y > height - (e.w / 2)) {
        e.y = height - (e.w / 2);
      }
      break;
    case "SW": 
      e.x -= e.speed;
      e.y += e.speed;
      if (e.x < (e.w / 2)) {
        e.x = (e.w / 2);    
      }
      if (e.y > height - (e.w / 2)) {
        e.y = height - (e.w / 2);
      }
      break;
    case "NE":
      e.x += e.speed;
      e.y -= e.speed;
      if (e.x > width - (e.w / 2)) {
        e.x = width - (e.w / 2);
      }
      if (e.y < (e.w / 2)) {
        e.y = (e.w / 2);
      }
      break;
    case "SE":
      e.x += e.speed;
      e.y += e.speed;
      if (e.y > height - (e.w / 2)) {
        e.y = height - (e.w / 2);
      }
      if (e.x > width - (e.w / 2)) {
        e.x = width - (e.w / 2);
      }
      break;
    case "NW":
      e.x -= e.speed;
      e.y -= e.speed;
      if (e.x < (e.w / 2)) {
        e.x = (e.w / 2);    
      }
      if (e.y < (e.w / 2)) {
        e.y = (e.w / 2);
      }
      break;
  }
  }
}

function changeSpeed(e,am) {
    e.speed = am;
}

function addEnemy() {
    enemies += new enemy()
}

function getRandomInteger( min, max ){
    var difference = max - min;
    
    var number = parseInt(Math.round(Math.random() * difference + min));
    
}