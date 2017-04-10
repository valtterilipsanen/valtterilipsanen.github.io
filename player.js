
function player(x,y,r,speed,dir,frame,ticks) {
 this.x = x;
 this.y = y;
 this.r = r;
 this.speed = speed;
 this.dir = dir;
 this.frame = frame;
 this.ticks = ticks;
 
}
var pSpeed = 3;
var windowWidth = Math.max(window.innerWidth - 25, 1150);
var windowHeight = window.innerHeight - 25;

var width = Math.min(window.innerWidth - 25, 1920);
var height = Math.min(window.innerHeight - 25, 1276) - 100;
    
/* Player */
var plMod = -30;

var p = new player(width / 2,height / 2,69,pSpeed, 'SE', 0, 0); 

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

var pImgEReady = false;
var pImgE = new Image();
pImgE.onload = function () {
    pImgEReady = true;
};
pImgE.src = "assets/Standing/east.png";

var pImgNEReady = false;
var pImgNE = new Image();
pImgNE.onload = function () {
    pImgNEReady = true;
};
pImgNE.src = "assets/Standing/northeast.png";


var pImgNReady = false;
var pImgN = new Image();
pImgN.onload = function () {
    pImgNReady = true;
};
pImgN.src = "assets/Standing/north.png";

var pImgNWReady = false;
var pImgNW = new Image();
pImgNW.onload = function () {
    pImgNWReady = true;
};
pImgNW.src = "assets/Standing/northwest.png";

var pImgWReady = false;
var pImgW = new Image();
pImgW.onload = function () {
    pImgWReady = true;
};
pImgW.src = "assets/Standing/west.png";

var pImgSWReady = false;
var pImgSW = new Image();
pImgSW.onload = function () {
    pImgSWReady = true;
};
pImgSW.src = "assets/Standing/southwest.png";


var pImgSReady = false;
var pImgS = new Image();
pImgS.onload = function () {
    pImgSReady = true;
};
pImgS.src = "assets/Standing/south.png";

var pImgSEReady = false;
var pImgSE = new Image();
pImgSE.onload = function () {
    pImgSEReady = true;
};
pImgSE.src = "assets/Standing/southeast.png";


function spriteP (options) {			
    var that = {};  
    frameIndex = p.frame,
    rowIndex = row(),
    tickCount = p.ticks,
    ticksPerFrame = 15 / pSpeed,
    numberOfFrames = options.numberOfFrames || 1,
    
					
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
    that.loop = options.loop;
    that.key = options.key;
    
      
    that.update = function (k) {
            
            if(38 in k && 39 in k){
              rowIndex = 2;
              p.dir = 'NE';
            }else if(39 in k && 40 in k){
                rowIndex = 5;
                p.dir = 'SE';
            }else if(37 in k && 38 in k){
                rowIndex = 3;
                p.dir = 'NW';
            }else if(37 in k && 40 in k){
                rowIndex = 6;
                p.dir = 'SW';
            }else if(38 in k){
                rowIndex = 1;
                p.dir = 'N';
            }else if(39 in k){
                rowIndex = 0;
                p.dir = 'E';
            }else if(40 in k){
                rowIndex = 4;
                p.dir = 'S';
            }else if(37 in k){
                rowIndex = 7;
                p.dir = 'W';
            }
        
        
        p.ticks += 1;
        
			
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
    
  var pl = spriteP({
    context: ctx,
    width: 1104,
    height: 1104,
    image: plImage,
    loop: true,
    key: keys,
    numberOfFrames: 8,
    
    
});
if(37 in keys ||38 in keys ||39 in keys ||40 in keys){
    pl.update(keys); 
    pl.render();
 }else{
     switch(p.dir){
         case 'E': 
            if(pImgEReady){ctx.drawImage(pImgE, p.x- p.r, p.y - p.r) };
             break;
         case 'NE':
             if(pImgNEReady){ctx.drawImage(pImgNE, p.x- p.r, p.y - p.r) };
             break;
         case 'N':
             if(pImgNReady){ctx.drawImage(pImgN, p.x- p.r, p.y - p.r) };
             break;
         case 'NW':
             if(pImgNWReady){ctx.drawImage(pImgNW, p.x- p.r, p.y - p.r) };
             break;
         case 'W':
             if(pImgWReady){ctx.drawImage(pImgW, p.x- p.r, p.y - p.r) };
             break;
         case 'SW':
             if(pImgSWReady){ctx.drawImage(pImgSW, p.x- p.r, p.y - p.r) };
             break;
         case 'S':
             if(pImgSReady){ctx.drawImage(pImgS, p.x- p.r, p.y - p.r) };
             break;
         case 'SE':
             if(pImgSEReady){ctx.drawImage(pImgSE, p.x- p.r, p.y - p.r) };
             break;
     }
 }
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


function pChangeSpeed(am) {
    p.speed += am;
}

function pReset() {
    p.x = width / 2;
    p.y = height / 2;
    p.speed = 3;
}

