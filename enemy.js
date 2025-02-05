function enemy(x,y,r,speed,dir,frame,row,ticks) {
 this.x = x;
 this.y = y;
 this.r = r;
 this.speed = speed;
 this.dir = dir;
 this.frame = frame;
 this.row = row;
 this.ticks = ticks;
}

function direction(ang){
    this.ang = ang;
    this.x = Math.cos(ang);
    this.y = Math.sin(ang);
}

var eMod = -5;
var eSize = 20;
var eSpeed = 2;
    


var enemies = []; 


function spriteE (options, enemy) {			
    var that = {};  
    frameIndex = enemy.frame,
    rowIndex = enemy.row,
    tickCount = enemy.ticks,
    ticksPerFrame = 0,
    numberOfFrames = options.numberOfFrames || 1,
    
					
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
    that.loop = options.loop;
    
    that.update = function (enemy) {
        enemy.ticks += 1;
        
			
        if (tickCount > ticksPerFrame) {
            
        	enemy.ticks = 0;
        	
            if(rowIndex == 3 && frameIndex == 3){
                enemy.row = (enemy.row + 1) % 4;
                enemy.frame = 0; 
            }else if (frameIndex < numberOfFrames - 1) {	
                // Go to the next frame
                enemy.frame += 1;
            }	else if (that.loop) {
                enemy.row = (enemy.row + 1) % 4;
                enemy.frame = 0;
                
            }
        }
    };
    
    that.render = function (enemy) {

        // Draw the animation
        that.context.drawImage(
           that.image,
           frameIndex * that.width / numberOfFrames,
           rowIndex * that.height / 4,
           that.width / 5,
           that.height / 4,
           enemy.x - enemy.r,
           enemy.y - enemy.r,
           enemy.r * 2,
           enemy.r * 2);
    };
    
      

    return that;
 }

function drawEnemies(ctx) {
  var EReady = false;
  var EImage = new Image();
  EImage.onload = function () {
  EReady = true;
  };
  EImage.src = "assets/rollingRock.png";
    
  

  for(i = 0; i < enemies.length; i++){
    var e = enemies[i];
    var E = spriteE({
        context: ctx,
        width: 360,
        height: 288,
        image: EImage,
        loop: true,
        numberOfFrames: 5,
        
    },e);
      E.update(e);
      E.render(e);
  }

}


function moveEnemies() {
     for(i = 0; i < enemies.length; i++){
         var e = enemies[i];
         var oldX = e.x;
         var oldY = e.y;
         e.x = e.x + (e.dir.x * e.speed);
         e.y = e.y + (e.dir.y * e.speed);
         
         if(e.x < e.r + eMod){
             e.x = e.r  + eMod;
             e.dir = new direction(Math.PI - (e.dir.ang % (2 * Math.PI)) );
         }
         if(e.x + eMod> width - e.r){
             e.x = width - e.r - eMod;
             e.dir = new direction(Math.PI - (e.dir.ang % (2 * Math.PI)) );
             
         }
         if(e.y < e.r + eMod){
             e.y = e.r + eMod;
             e.dir = new direction(-e.dir.ang);
         }
         if(e.y + eMod > height - e.r){
             e.y = height - e.r - eMod;
             e.dir = new direction(-e.dir.ang);
         }
         
         for(k = 0; k < enemies.length; k++){
            var distance = Math.sqrt(Math.pow((e.x-enemies[k].x),2) + Math.pow((e.y - enemies[k].y),2));
             if (!(e.x == enemies[k].x && e.y == enemies[k].y)){
                 
                  if(distance < 2 * e.r + eMod){
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
             en.dir = new direction(angle + Math.PI);
                      
                      
             }
           }
         }
         
         if(Math.sqrt(Math.pow((e.x-p.x),2) + Math.pow((e.y-p.y),2)) < p.r + e.r + plMod + eMod){
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
             
             e.dir = new direction(angle);
         }
         
         if(Math.sqrt(Math.pow((e.x-c.x),2) + Math.pow((e.y-c.y),2)) < c.r + e.r + cMod){
             e.x = oldX;
             e.y = oldY;
             var angle = 0;
             c.lives -= 1;
             
              if(e.x >= c.x && e.y <= c.y){
                     angle = Math.atan((e.y - c.y)/(e.x - c.x));      
                 } else if(e.x <= c.x && e.y <= c.y){
                     angle = Math.atan((e.y - c.y)/(e.x - c.x)) + Math.PI;
                 } else if(e.x >= c.x && e.y >= c.y){
                     angle = Math.atan((e.y - c.y)/(e.x - c.x));
                 } else if(e.x <= c.x && e.y >= c.y){
                     angle = Math.atan((e.y - c.y)/(e.x - c.x)) + Math.PI;
                 }
             
             e.dir = new direction(angle);
         }
         
     }
}

function eChangeSpeed(e,am) {
    e.speed += am;
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
        if(Math.sqrt(Math.pow((newX-c.x),2) + Math.pow((newY-c.y),2)) < c.r + eSize + cMod){
            flag = false;
        }
        counter = counter + 1;
        
        if(counter >= 1000) canAdd = false;
        
    }
    if(counter < 1000){
        
      
    var dir = (parseFloat(getRandomInteger(0,360)) / 360) * 2* Math.PI;
    
    enemies.push(new enemy(newX, newY, eSize, eSpeed, new direction(dir),getRandomInteger(0,4),getRandomInteger(0,3),0));
    
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


function eReset() {
    eSpeed = 2;
    enemies = [];
    addEnemy();
    addEnemy();
    addEnemy();
    addEnemy();
    addEnemy();
    addEnemy();
    addEnemy();
}








