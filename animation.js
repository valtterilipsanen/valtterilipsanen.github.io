var score = 0;
var gameOn = true;
var gamePaused = false;
var menuOn = true;
var startPressed = false;
var helpPressed = false;
var helpOn = false;
var easterEgg = true;



$(document).ready(function() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext("2d");
  canvas.width = windowWidth;
  canvas.height = windowHeight;
  document.body.appendChild(canvas);

  var bgImg = new Image();
  bgImg.src = "assets/sprites/yellowGrass.jpg"
  var menu = new Image();
  menu.src = "assets/sprites/menu.png"
  var menuStart = new Image();
  menuStart.src = "assets/sprites/menuStart.png"
  var menuHelp = new Image();
  menuHelp.src = "assets/sprites/menuHelp.png"
  var help = new Image();
  menuHelp.src = "assets/sprites/help.png"
  var end = new Image();
  end.src = "assets/sprites/ending.svg"

/* Listen to keyboard events */
  var keysDown = {};



  var music = new Audio('assets/sounds/music.mp3');
  var startSound = new Audio('assets/sounds/start.wav');
  var tSound = new Audio('assets/sounds/tractor sound.wav');

  function startGame(){
  easterEgg = true;
  gameOn = true;
  cows = [];
  hippies = [];
  gMen = [];
  splats = [];
  poops = [];
  p = new player(width / 2, height / 2, 40, pSpeed, 0);
  addCow();
  addCow();
  addCow();
  addCow();
  addCow();
  music.pause();
  music.currentTime = 0;
  tSound.pause();
  tSound.currentTime = 0;
  startSound.play();
  }
  startGame();

  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}


function buttonPressed(x,y){
    if(x > 250 && x < 500 && y < 520 && y > 470){
      startPressed = true;
    }
    if(x > 510 && x < 765 && y < 520 && y > 470){
      helpPressed = true;
    }
}
function buttonReleased(x,y){
  if(x > 250 && x < 500 && y < 520 && y > 470){
    menuOn = false;
    startGame();
  }
  if(x > 510 && x < 765 && y < 520 && y > 470){
    helpOn = true;

  }
}

canvas.addEventListener("mousedown", function(e){
     buttonPressed(getMousePos(canvas,e).x, getMousePos(canvas,e).y);
  });
canvas.addEventListener("mouseup", function(e){
    buttonReleased(getMousePos(canvas,e).x, getMousePos(canvas,e).y);
    startPressed = false;
  });
  // Sound looping
  //http://stackoverflow.com/questions/7330023/gapless-looping-audio-html5
  // user: shooting_sparks
  startSound.addEventListener('timeupdate', function(){
                var buffer = 0.5;
                if(this.currentTime > this.duration - buffer){
                    tSound.play();
                    music.play();
                }}, false);
  tSound.addEventListener('timeupdate', function(){
                var buffer = 0.44;
                if(this.currentTime > this.duration - buffer){
                    this.currentTime = 0;
                    this.play();
                }}, false);

  music.addEventListener('timeupdate', function(){
                var buffer = 0.44;
                if(this.currentTime > this.duration - buffer){
                this.currentTime = 0;
                this.play();
                }}, false);



  window.addEventListener("keydown", function(e) {
     keysDown[e.keyCode] = true;
     if(e.keyCode == 19){
       pauseGame();
     }
     if(e.keyCode == 13){
       startGame();
     }
  }, false);

  window.addEventListener("keyup", function(e) {
    delete keysDown[e.keyCode];
    if((37 in keysDown && 39 in keysDown) || !((37 in keysDown || 39 in keysDown))){
      p.img = "s";
    }
    if(!(38 in keysDown)){
      p.speed = pSpeed;
    }
  });

  window.addEventListener("keydown",function(e){
      if([37,38,39,40].indexOf(e.keyCode)>-1){
          e.preventDefault();
      }
  });




var render = function() {
if(menuOn){

  if(startPressed){
    ctx.drawImage(menuStart,0,0)
  }else if(helpPressed){
    ctx.drawImage(menuHelp,0,0)
  } else {
    ctx.drawImage(menu,0,0)
  }
  if(helpOn){
    ctx.drawImage(help,0,0)
  }
} else {
  if(gameOn && !gamePaused){
  for(i = 0; i < width / 200; i++){
    for(k = 0; k < height / 200; k++){
      ctx.drawImage(bgImg, i * 200, k * 200, 200, 200);
    }
  }
  ctx.drawImage(bgImg,0,0, 100, 100)
  cowTick();
  gManTick();
  hippieTick();
  playerTick();
  splatTick();
  moveCows();
  movePlayer();
  moveHippies();
  moveGMen();
  drawSplatter(ctx);
  drawPoops(ctx);
  drawHippies(ctx);
  drawCows(ctx);
  drawGMen(ctx)
  drawPlayer(ctx);
  ctx.fillStyle = '#000000';
  ctx.font = "40px Georgia"
  ctx.fillText("Pisteet: " + score, 5, 30);
} else {
  ctx.drawImage(end,0,0);
}
  }
};

function pauseGame(){
  if(gamePaused){
    gamePaused = false;
  }else {
    gamePaused = true;
  }
}
/* Update stuff every loop */
var update = function(delta) {

  if(37 in keysDown && 39 in keysDown){
    p.img = "s";
  } else if (37 in keysDown) {
      p.img = "l";
      changeDir("left");
    }else if(39 in keysDown) {
      p.img = "r";
      changeDir("right");
    }else if (38 in keysDown){
      p.speed = pSpeed * 1.5;
    } else if (27 in keysDown) {
      menuOn = true;
      helpOn = false;
      startPressed = false;
      helpPressed = false;

    }
    if(cows.length == 0){
      gameOn = false;
    }

    if(67 in keysDown && 79 in keysDown && 87 in keysDown && 83 in keysDown){
      if(easterEgg){
        easterEgg = false;
        window.open("https://www.youtube.com/watch?v=FavUpD_IjVY")
     }
    }



};

/* Time-based motion animation */
var main = function() {
  var now = Date.now();
  var delta = now - then;

if(!gamePaused){
  update(delta / 1000);
  render();
}else{
  ctx.fillStyle = '#000000';
  ctx.font = "50px Georgia"
  ctx.fillText("Tauko", 450, 300);
}
  then = now;

  // Request to do this again ASAP
  requestAnimationFrame(main);
};

var then = Date.now();
main();

});

function getRandomInteger( min, max ){
    var difference = max - min;

    var number = parseInt(Math.round(Math.random() * difference + min));
    return number;
}
