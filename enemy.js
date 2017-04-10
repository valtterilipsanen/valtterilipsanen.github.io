function enemy(x,y,r,speed,dir) {
 this.x = x;
 this.y = y;
 this.r = r;
 this.speed = speed;
 this.dir = dir;
}

function direction(ang){
    this.ang = ang;
    this.x = Math.cos(ang);
    this.y = Math.sin(ang);
}


var eSize = 20;
var eSpeed = 5;
    

var dirs = ["N","NE","E","SE","S","SW","W","NW"]
var enemies = []; 

function drawEnemies(context) {

  for(i = 0; i < enemies.length; i++){
  var e = enemies[i];
  
  context.beginPath();
  context.fillStyle = '#ffff00';
  context.arc(e.x,e.y,e.r,0,2*Math.PI);
  context.fill();
  context.closePath();  
  }

}



function moveEnemies() {
     for(i = 0; i < enemies.length; i++){
         var e = enemies[i];
         var oldX = e.x;
         var oldY = e.y;
         e.x = e.x + (e.dir.x * e.speed);
         e.y = e.y + (e.dir.y * e.speed);
         
         if(e.x < e.r){
             e.x = e.r;
             e.dir = new direction(Math.PI - (e.dir.ang % (2 * Math.PI)) );
         }
         if(e.x > width - e.r){
             e.x = width - e.r;
             e.dir = new direction(Math.PI - (e.dir.ang % (2 * Math.PI)) );
             
         }
         if(e.y < e.r){
             e.y = e.r;
             e.dir = new direction(-e.dir.ang);
         }
         if(e.y > height - e.r){
             e.y = height - e.r;
             e.dir = new direction(-e.dir.ang);
         }
         
         for(k = 0; k < enemies.length; k++){
            var distance = Math.sqrt(Math.pow((e.x-enemies[k].x),2) + Math.pow((e.y - enemies[k].y),2));
             if (!(e.x == enemies[k].x && e.y == enemies[k].y)){
                 
                  if(distance < 2 * e.r){
                 e.x = oldX;
                 e.y = oldY;
                 var angle = 0;
                 var en = enemies[k];
                      
                 if(e.x >= en.x && e.y <= en.y){
                     angle = Math.atan((e.y - en.y)/(e.x - en.x));      
                 } else if(e.x <= en.x && e.y <= en.y){
                     angle = Math.atan((e.y - en.y)/(e.x - en.x)) + Math.PI;
                 } else if(e.x >= en.x && e.y >= en.y){
                     angle = Math.atan((e.y - en.y)/(e.x - en.x));
                 } else if(e.x <= en.x && e.y >= en.y){
                     angle = Math.atan((e.y - en.y)/(e.x - en.x)) + Math.PI;
                 }
             
             e.dir = new direction(angle);
             en.dir = new direction(angle + Math.PI)
                      
                      
             }
           }
         }
         
         if(Math.sqrt(Math.pow((e.x-p.x),2) + Math.pow((e.y-p.y),2)) < p.r + e.r + plMod){
             e.x = oldX;
             e.y = oldY;
             var angle = 0;
             
                 if(e.x >= p.x && e.y <= p.y){
                     angle = Math.atan((e.y - p.y)/(e.x - p.x));      
                 } else if(e.x <= p.x && e.y <= p.y){
                     angle = Math.atan((e.y - p.y)/(e.x - p.x)) + Math.PI;
                 } else if(e.x >= p.x && e.y >= p.y){
                     angle = Math.atan((e.y - p.y)/(e.x - p.x));
                 } else if(e.x <= p.x && e.y >= p.y){
                     angle = Math.atan((e.y - p.y)/(e.x - p.x)) + Math.PI;
                 }
             
             e.dir = new direction(angle)
         }
         
     }
}

function changeSpeed(e,am) {
    eSpeed = am;
    e.speed = am;
}

function getRandomInteger( min, max ){
    var difference = max - min;
    
    var number = parseInt(Math.round(Math.random() * difference + min));
    return number;
}

var canAdd = true;


function addEnemy() {
    
    
    if(canAdd){
    var newX = 0;
    var newY = 0;
    var counter = 0;
    
    var flag = false;
    while(flag === false && counter < 1000){
        newX = getRandomInteger(eSize, width - eSize);
        newY = getRandomInteger(eSize, height - eSize);
      
        flag = true;
        for(k = 0; k < enemies.length; k++){
            var distance = Math.sqrt(Math.pow((newX - enemies[k].x),2) + Math.pow((newY - enemies[k].y),2));
                if(distance < 2 * eSize){
                    flag = false;
                }  
        }
        var distance = Math.sqrt(Math.pow((newX - p.x),2) + Math.pow((newY - p.y),2));
        if(distance < eSize + p.r){
            flag = false;
        }
        counter = counter + 1;
        
        if(counter >= 1000) canAdd = false;
        
    }
    if(counter < 1000){
        
      
    var dir = (parseFloat(getRandomInteger(0,360)) / 360) * 2* Math.PI;
    
    enemies.push(new enemy(newX, newY, eSize, eSpeed, new direction(dir)));
    
    }
}
}

function removeEnemy(clickX, clickY) {
     for(k = 0; k < enemies.length; k++){
        var distance = Math.sqrt(Math.pow((clickX - enemies[k].x),2) + Math.pow((clickY - enemies[k].y),2));
            if(distance < eSize){
                enemies.splice(k,1);
                canAdd = true;
                }  
     }
}

/**







var canAdd = true;
function addEnemy() {
    console.log(canAdd);
    if(canAdd){
    var x = 0;
    var y = 0;
    var counter = 0;
    
    var flag = false;
    while(flag === false && counter < 1000){
    x = getRandomInteger((eSize / 2), width - (eSize / 2));
    y = getRandomInteger((eSize / 2), height - (eSize / 2));
    
    flag = true;
    for(i = 0; i < enemies.length; i++){
        if((enemies[i].x + eSize) > x && (enemies[i].x - eSize) < x){
           if((enemies[i].y + eSize) > y && (enemies[i].y - eSize) < y){
            flag = false;
        }
        }
      } 
        counter = counter + 1;
        console.log(counter);
        if(counter >= 1000) canAdd = false;
    }
    var d = dirs[getRandomInteger(0, dirs.length - 1)]
    if(counter < 1000){
    enemies.push(new enemy(x, y, eSize, eSpeed, d))
    }
  }
}

function getRandomInteger( min, max ){
    var difference = max - min;
    
    var number = parseInt(Math.round(Math.random() * difference + min));
    return number;
}
*/





/**
 for(i = 0; i < enemies.length; i++){
        if(e.dir != enemies[i].dir &&(enemies[i].x + eSize) >= e.x && (enemies[i].x + eSize) <= e.x && (enemies[i].y + eSize) >= e.y && (enemies[i].y + eSize) <= e.y){
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
*/
