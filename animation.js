


$(document).ready(function() {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext("2d");
  canvas.width = windowWidth;
  canvas.height = windowHeight;
  document.body.appendChild(canvas);
  addEnemy();
  addEnemy();
  addEnemy();
  addEnemy();
  addEnemy();
  addEnemy();
  addEnemy();
  addEnemy();
  addEnemy();
        

  var score = 0; 
  var lives = 5;
// Background image
  var bgReady = false;
  var bgImage = new Image();
  bgImage.onload = function () {
  bgReady = true;
  };
  bgImage.src = "assets/grass.jpeg";

// Button image
  var buReady = false;
  var buImage = new Image();
  buImage.onload = function () {
  buReady = true;
  };
  buImage.src = "assets/buttons.png";

  function button(text, line, x, y){
      this.text = text;
      this.line = line;
      this.x = x;
      this.y = y;
  }
  
  function sprite (options, b) {
				
    var that = {};
	
    frameIndex = b.line;			
    
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    that.render = function (b) {

        
        that.context.drawImage(
           that.image,
           0,
           frameIndex * that.height / 2,
           that.width,
           that.height / 2,
           b.x,
           b.y,
           that.width,
           that.height / 2);
    };
      
    return that;
}
    
    
  
  var speedUp = new button("Speed Up", 0, 256 + 20 , height + 18);
  var speedDown = new button("Speed Down", 0, 10, height + 18);
  var newGame = new button("New Game", 0, 512 + 30, height + 18);
  
  var buttons = [speedUp, speedDown, newGame];
    
/* Listen to keyboard events */
  var keysDown = {};
  
    
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}
 
    
function buttonPressed(x,y){
    for(k = 0; k < buttons.length; k++){
        var b = buttons[k];
        if(x < b.x + 256 && x > b.x && y < b.y + 128 && y > b.y){
            b.line = 1;
            switch(b.text){
                case "New Game":
                    pReset();
                    eReset();
                    break;
                case "Speed Up":
                    for(e = 0; e < enemies.length; e++){
                        eChangeSpeed(enemies[e], 1);
                    }
                    pChangeSpeed(1);
                    break;
                    
                case "Speed Down":
                    for(e = 0; e < enemies.length; e++){
                       var flag = true;
                        if(enemies[e].speed > 0){
                            eChangeSpeed(enemies[e], -1);
                        }else {
                            flag = false;
                        }
                    }
                        
                    if(p.speed > 1 && flag ){
                        pChangeSpeed(-1);
                    }
                    break;      
           }
        }
    }
}    
  window.addEventListener("keydown", function(e) {
     keysDown[e.keyCode] = true;
  }, false);
  
  window.addEventListener("keyup", function(e) {
    delete keysDown[e.keyCode];
  });

  window.addEventListener("keydown",function(e){
      if([37,38,39,40].indexOf(e.keyCode)>-1){
          e.preventDefault();
      };
  });
  canvas.addEventListener("mousedown", function(e){
     removeEnemy(getMousePos(canvas,e).x, getMousePos(canvas,e).y);
     buttonPressed(getMousePos(canvas,e).x, getMousePos(canvas,e).y);
  })
  canvas.addEventListener("mouseup", function(e){
      for(i = 0; i < buttons.length; i ++){
          buttons[i].line = 0;
      }
  })
  
    
var counter = 0;    
/* Draw everything */
var render = function() {
    counter += 1;
    if(counter > 200){
        score += p.speed;
        counter = 0;
    }
    console.log(score)
  if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
  ctx.fillStyle = 'rgb(92, 132, 0)';
  
  drawPlayer(ctx, keysDown);
  drawEnemies(ctx);
  ctx.fillRect(0, height, windowWidth, 100);
  if(buReady){
      for(k = 0; k < buttons.length; k++) {
          var bu = buttons[k];
          var buttonSprite = sprite({
            context: ctx,
            width: 256,
            height: 128,
            image: buImage   
        }, bu);
        buttonSprite.render(bu); 
        ctx.fillStyle = '#ffffff';
        ctx.font = "40px Sans Serif";
        ctx.fillText(bu.text, bu.x + 27, bu.y + 45, 200);
      } 
  }
  ctx.font = "40px Sans Serif";
  ctx.fillText("Score: " + score, 810, height + 63, 200);
  ctx.fillText("Lives: " + lives, 1000, height + 63, 200);
};

/* Update stuff every loop */
var update = function(delta) {
    if (38 in keysDown) {
       speedUp.f;
       movePlayer("up");
    } 
    if (40 in keysDown) {
       movePlayer("down");
    }
    if (37 in keysDown) {
      movePlayer("left");
    }
    if (39 in keysDown) {
      movePlayer("right");
    }
    moveEnemies()
};

/* Time-based motion animation */
var main = function() {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();

  then = now;

  // Request to do this again ASAP
  requestAnimationFrame(main);
};
  
var then = Date.now();
main();
  
});