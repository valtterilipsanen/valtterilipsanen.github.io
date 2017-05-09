function poop(x,y){
  this.x = x;
  this.y = y;
  this.r = 10;
}

var pooImgReady = false;
var pooImg = new Image();
pooImg.onload = function () {
    pooImgReady = true;
};
pooImg.src = "assets/sprites/poop.png";

var poops = [];

function drawPoops(ctx) {
  for(i = 0; i < poops.length; i++){
    var e = poops[i];
    var x = e.x;
    var y = e.y;
    ctx.save();
    ctx.translate(x,y);
    ctx.drawImage(pooImg, -e.r, -e.r, 2*e.r, 2*e.r);
    ctx.restore();
  }

  }

  function addPoop(x,y){
    poops.push(new poop(x,y));
  }
