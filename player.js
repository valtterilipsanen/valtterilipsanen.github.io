
function player(x,y,r,speed,dir,frame,ticks) {
 this.x = x;
 this.y = y;
 this.r = r;
 this.speed = speed;
 this.dir = dir;
 this.frame = frame;
 this.ticks = ticks;
 
}


var width = Math.min(window.innerWidth - 25, 1920);
var height = Math.min(window.innerHeight - 25, 1276);
    
/* Player */
var plMod = -27;

var p = new player(width / 2,height / 2,69,4, 'E', 0, 0); 

function row(){
    switch (p.dir){
        case 'E':
            return 0;
            break;
        case 'N':
            return 1;
            break;
        case 'W':
            return 7;
            break;
        case 'S':
            return 4;
            break;
      }
}

function sprite (options) {			
    var that = {};  
    frameIndex = p.frame,
    rowIndex = row(),
    tickCount = p.ticks,
    ticksPerFrame = 5,
    numberOfFrames = options.numberOfFrames || 1,
    
					
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
    that.loop = options.loop;
    that.key = options.key;
    
      
    that.update = function (k) {
                if(38 in k){
                    rowIndex = 1;
                }
                if(39 in k){
                    rowIndex = 0; 
                }
                if(40 in k){
                    rowIndex = 4;
                }
                if(37 in k){
                    rowIndex = 7;
                }
        
        
        p.ticks += 1;
        console.log(frameIndex)
			
        if (tickCount > ticksPerFrame) {
        
        	p.ticks = 0;
        	
            if (frameIndex < numberOfFrames - 1) {	
                // Go to the next frame
                p.frame += 1;
            }	else if (that.loop) {
                p.frame = 0;
            }
        }
    };
    
      
    that.render = function () {

        // Draw the animation
        that.context.drawImage(
           that.image,
           frameIndex * that.width / numberOfFrames,
           rowIndex * that.height / numberOfFrames,
           that.width / numberOfFrames,
           that.height / numberOfFrames,
           p.x - p.r,
           p.y - p.r,
           that.width / numberOfFrames,
           that.height / numberOfFrames);
    };
    
      

    return that;
 }


function drawPlayer(ctx, keys) {
  
  var plReady = false;
  var plImage = new Image();
  plImage.onload = function () {
  plReady = true;
  };
  plImage.src = "assets/plWalk.png";
    
  var pl = sprite({
    context: ctx,
    width: 1104,
    height: 1104,
    image: plImage,
    loop: true,
    key: keys,
    numberOfFrames: 8,
    
    
});
pl.update(keys); 
pl.render();
}

 


function movePlayer(dir) {
    var oldX = p.x;
    var oldY = p.y;
  switch (dir) {
    case "left": 
      p.x -= p.speed;
      if (p.x < p.r + plMod) {
        p.x = p.r  + plMod;
          
      }
      break;
    case "right":
      p.x += p.speed;
      if (p.x  + plMod> width - p.r) {
        p.x = width - p.r - plMod;
      }
      break;
    case "up":
      p.y -= p.speed;
      if (p.y < p.r  + plMod) {
        p.y = p.r + plMod;
      }
      break;
    case "down":
      p.y += p.speed;
      if (p.y + plMod > height - p.r) {
        p.y = height - p.r - plMod;
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

