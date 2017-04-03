function enemy(x,y,w,h,speed,dir) {
 this.x = x;
 this.y = y;
 this.w = w;
 this.h = h;
 this.speed = speed;
 this.dir = dir;
}


var width = window.innerWidth - 25;
var height = window.innerHeight - 25;
var eSize = 20;
var eSpeed = 7;
    

var dirs = ["N","NE","E","SE","S","SW","W","NW"]
var enemies = [new enemy(300,300,20,20,eSpeed,"E"), new enemy(500,305,20,20,eSpeed,"NW") ]; 

function drawEnemies(context) {
  for(i = 0; i < enemies.length; i++){
  var e = enemies[i]
  var x = e.x - (e.w / 2);
  var y = e.y - (e.h / 2);
  context.fillStyle = '#ffff00';
  context.fillRect(x,y, e.w, e.h);  
  }

}

function changeDirection(e) {
    switch(e.dir) {
      case "W":
        e.dir = "E"; 
        break;
      case "NW":
        e.dir = "SE"; 
        break;
      case "N":
        e.dir = "S"; 
        break;
      case "NE":
        e.dir = "SW"; 
        break;
      case "E":
        e.dir = "W"; 
        break;
      case "SE":
        e.dir = "NW"; 
        break;
      case "S":
        e.dir = "W"; 
        break;
      case "SW":
        e.dir = "NE"; 
        break;
    }
}


function collide(e){
   for(a = 0; a < enemies.length; a++){
        if(e != enemies[a] && (enemies[a].x + eSize) > e.x && (enemies[a].x - eSize) < e.x) {
         
            if((enemies[a].y + eSize) > e.y && (enemies[a].y - eSize) < e.y){
                console.log(true);
            changeDirection(e);
            changeDirection(enemies[a]);
            }
        }
       
       }
       
      if(e.x - (eSize / 2) < p.x + (p.w / 2) && e.x + (eSize/2) > p.x - (p.w / 2) && e.y - (eSize / 2) < p.y + (p.h / 2) && e.y + (eSize/2) > p.y - (p.h / 2)){
           changeDirection(e);
      }
    
  }


function moveEnemies() {
  for(i = 0; i < enemies.length; i++){
  var e = enemies[i];
  switch (e.dir) {
    case "W": 
      e.x -= e.speed;
      collide(e);
      if (e.x < (e.w / 2)) {
        e.x = (e.w / 2);
        e.dir = "E";
      }
      break;
    case "E":
      e.x += e.speed;
      collide(e);
      if (e.x > width - (e.w / 2)) {
        e.x = width - (e.w / 2);
        e.dir = "W";
      }
      break;
    case "N":
      e.y -= e.speed;
      collide(e);  
      if (e.y < (e.w / 2)) {
        e.y = (e.w / 2);
        e.dir = "S";
      }
      break;
    case "S":
      e.y += e.speed;
      collide(e); 
      if (e.y > height - (e.w / 2)) {
        e.y = height - (e.w / 2);
        e.dir = "N"
      }
      break;
    case "SW": 
      e.x -= e.speed;
      e.y += e.speed;
      collide(e); 
      if (e.x < (e.w / 2)) {
        e.x = (e.w / 2);
        e.dir = "SE";
        addEnemy()
      }
      if (e.y > height - (e.w / 2)) {
        e.y = height - (e.w / 2);
        e.dir = "NW";
      }
      break;
    case "NE":
      e.x += e.speed;
      e.y -= e.speed;
      collide(e); 
      if (e.x > width - (e.w / 2)) {
        e.x = width - (e.w / 2);
        e.dir = "NW";
      }
      if (e.y < (e.w / 2)) {
        e.y = (e.w / 2);
        e.dir = "SE";
      }
      break;
    case "SE":
      e.x += e.speed;
      e.y += e.speed;
      collide(e); 
      if (e.y > height - (e.w / 2)) {
        e.y = height - (e.w / 2);
        e.dir = "NE";
      }
      if (e.x > width - (e.w / 2)) {
        e.x = width - (e.w / 2);
        e.dir = "SW";
      }
      break;
    case "NW":
      e.x -= e.speed;
      e.y -= e.speed;
      collide(e); 
      if (e.x < (e.w / 2)) {
        e.x = (e.w / 2);
        e.dir = "NE";
      }
      if (e.y < (e.w / 2)) {
        e.y = (e.w / 2);
        e.dir = "SW";
      }
      break;
  }
  }
}

function changeSpeed(e,am) {
    e.speed = am;
}


function addEnemy() {
    var x = 0;
    var y = 0;
    var flagX = false;
    var flagY = false;
    console.log(flagX === false || flagY === false)
    while(flagX === false || flagY === false){
    x = getRandomInteger((eSize / 2), width - (eSize / 2));
    console.log(flagX);
    flagX = true;
    for(i = 0; i < enemies.length; i++){
        if((enemies[i].x + eSize) > x && (enemies[i].x + eSize) < x){
            flagX = false;
        }
      }
        
    y = getRandomInteger((eSize / 2), height - (eSize / 2));
        
    flagY = true;
    for(i = 0; i < enemies.length; i++){
        if((enemies[i].y + eSize) > y && (enemies[i].y + eSize) < y){
            flagY = false;
            console.log(flagY);
        }
      }   
    }
    var d = dirs[getRandomInteger(0, dirs.length - 1)]
    
    enemies.push(new enemy(x, y, eSize, eSize, eSpeed, d))
}

function getRandomInteger( min, max ){
    var difference = max - min;
    
    var number = parseInt(Math.round(Math.random() * difference + min));
    return number;
}





/**
 for(i = 0; i < enemies.length; i++){
        if(e.dir != enemies[i].dir &&(enemies[i].x + eSize) >= e.x && (enemies[i].x + eSize) <= e.x && (enemies[i].y + eSize) >= e.y && (enemies[i].y + eSize) <= e.y){
        }
      }
*/
