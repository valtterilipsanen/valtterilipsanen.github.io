
function cow (x,y, r, lives){
    this.x = x;
    this.y = y;
    this.r = r;
    this.lives = lives;
}

var c = new cow(width / 2 - 150, height / 2, 50, 5);
var cMod = -5;


 var cowReady = false;
  var cowImage = new Image();
  cowImage.onload = function () {
  cowReady = true;
  };
  cowImage.src = "assets/holycow.png";

 var exReady = false;
  var exImage = new Image();
  exImage.onload = function () {
  exReady = true;
  };
  exImage.src = "assets/explosion.png";

 function drawCow(ctx){
    var x = c.x - c.r;
    var y = c.y - c.r;
    if(exReady && c.lives == 0){
        ctx.drawImage(exImage, x - 50, y - 50);
    } else if(cowReady){
        ctx.drawImage(cowImage, x, y);
    }
    
 }