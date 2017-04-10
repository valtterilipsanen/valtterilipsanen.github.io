


$(document).ready(function() {
  var width = window.innerWidth - 25;
  var height = window.innerHeight - 25;
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);
  addEnemy();
  addEnemy();
  addEnemy();
  addEnemy();
  addEnemy();


// Background image
  var bgReady = false;
  var bgImage = new Image();
  bgImage.onload = function () {
  bgReady = true;
  };
  bgImage.src = "assets/grass.jpeg";

  var plReady = false;
  var plImage = new Image();
  plImage.onload = function () {
  plReady = true;
  };
  plImage.src = "assets/plWalk.png";
    
    
  function sprite (options) {
				
    var that = {};
					
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
    
    that.render = function () {

        // Draw the animation
        that.context.drawImage(
           that.image,
           0,
           0,
           that.width,
           that.height,
           p.x - p.r,
           p.y - p.r,
           that.width,
           that.height);
    };
    
      

    return that;
 }
 var pl = sprite({
    context: ctx,
    width: 138,
    height: 138,
    image: plImage,
});
  
/* Listen to keyboard events */
  var keysDown = {};
  
    
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
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
     console.log("MOUSEX" + e.pageX)
      console.log("MOUSEy" + e.pageY)
  })
  
  
/* Draw everything */
var render = function() {
  if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
  
  drawEnemies(ctx);
  drawPlayer(ctx);
  pl.render();
};

/* Update stuff every loop */
var update = function(delta) {
    if (38 in keysDown) {
        addEnemy();
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