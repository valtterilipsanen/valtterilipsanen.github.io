var width = window.innerWidth - 20
var height = window.innerHeight - 20


$(document).ready(function() {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);

/* Player */
var player = {
  x: 200,
  y: 200,
  w: 40,
  h: 40,
  speed: 10
};

function drawPlayer(context) {
  var x = player.x - (player.w / 2);
  var y = player.y - (player.h / 2);
  context.fillStyle = '#FF0000';
  context.fillRect(x,y, player.w, player.h);
}
  
function movePlayer(dir) {
  switch (dir) {
    case "left": 
      player.x -= player.speed;
      if (player.x < 20) {
        player.x = 20;
      }
      break;
    case "right":
      player.x += player.speed;
      if (player.x > width - 20) {
        player.x = width - 20;
      }
      break;
    case "up":
      player.y -= player.speed;
      if (player.y < 20) {
        player.y = 20;
      }
      break;
    case "down":
      player.y += player.speed;
      if (player.y > height - 20) {
        player.y = height - 20;
      }
      break;
  }
}
  
/* Listen to keyboard events */
  var keysDown = {};
  
  window.addEventListener("keydown", function(e) {
     keysDown[e.keyCode] = true;
  }, false);
  
  window.addEventListener("keyup", function(e) {
    delete keysDown[e.keyCode];
  });
  
  
  
/* Draw everything */
var render = function() {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0,0,width,height);
  drawPlayer(ctx);
};

/* Update stuff every loop */
var update = function(delta) {
    if (38 in keysDown) {
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