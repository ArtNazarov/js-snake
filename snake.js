  	var example = document.getElementById("example"),
			    ctx     = example.getContext('2d');
			

  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;

var numx = 20;
var numy = 20;

function initSnake(){
  var arr = [{x:numx/2,y:numy/2}];
  for (var i=1;i<3;i++){
    arr.push({x:arr[i-1].x+1,y:arr[i-1].y});
  }
  return arr;
}

function initApples(){
  var arr = [];
  for (var i=0;i<3;i++){
    arr.push({x:Math.floor(Math.random()*numx),
              y:Math.floor(Math.random()*numy)})
  }
  return arr;
}

var Snake = initSnake();
var Apples = initApples();
console.log(Snake);

const wx = example.width / numx;
const wy = example.height / numy;

function drawBg(){
  ctx.fillStyle='#00ff00';
  ctx.stokeStyle='#ffffff';
  ctx.fillRect(0, 0, example.width, example.height);
  for (var x=0;x<=numx;x++){
    for (var y=0;y<=numy;y++){
      ctx.strokeRect((x-1)*wx,(y-1)*wy,wx, wy);
    }
  }

}

function drawSnake(){
  ctx.fillStyle='#ff0000';
  for (var k=0;k<Snake.length;k++){
    ctx.fillRect(
        (Snake[k].x-1)*wx, 
        (Snake[k].y-1)*wy,
        wx, wy);
  }
  ctx.fillStyle='#ffffff';
  ctx.fillRect(
    (Snake[0].x-1)*wx,
    (Snake[0].y-1)*wy,
    wx, wy);
}

function drawApples(){
  ctx.fillStyle='#ff00ff';
  for (var k=0;k<Apples.length;k++){
    ctx.fillRect(
        (Apples[k].x-1)*wx, 
        (Apples[k].y-1)*wy,
        wx, wy);
  }
  
}

function doShift(){ 
  for(var i=Snake.length-1;i>0;i--)
    {
        Snake[i].x=Snake[i-1].x;
        Snake[i].y=Snake[i-1].y;
    }
}

function repaint(){
  drawBg();
  drawApples();
  drawSnake();
}

function onAppleCatch(){
  for (var a=0;a<Apples.length;a++){
    if ( (Snake[0].x==Apples[a].x) && (Snake[0].y == Apples[a].y)){
      Snake = [{},...Snake];  
      Snake[0].x = Apples[a].x;
      Snake[0].y = Apples[a].y;
      repaint();
      console.log(Apples[a]);
      Apples[a].x = (numx+Math.floor(Math.random()*(1+numx)))%numx;
      Apples[a].y = (numy+Math.floor(Math.random()*(1+numy)))%numy;
      console.log(Apples[a]);
      repaint();
      break;
    }
  }
}

function moveLt(){
  doShift();
  Snake[0].x = (numx+Snake[0].x-1) % numx;
  onAppleCatch();
  repaint();
}

function moveRt(){
 doShift();
  Snake[0].x = (Snake[0].x+1) % (1+numx);
  onAppleCatch();
  repaint();
}

function moveUp(){
  doShift();
  Snake[0].y = (numy+Snake[0].y-1) % numy;
  onAppleCatch();
  repaint();
}

function moveDn(){
  doShift();
  Snake[0].y = (Snake[0].y+1) % (1+numy);
  onAppleCatch();
  repaint();
}

setInterval( ()=>{
  dx = Snake[0].x-Snake[1].x;
  dy = Snake[0].y-Snake[1].y;
  if (dx > 0) moveRt();
  if (dx < 0) moveLt();
  if (dy > 0) moveDn();
  if (dy < 0) moveUp();
}, 1000);

repaint();

document.addEventListener('keydown', (event) => {
 switch(event.keyCode){
   case LEFT : {moveLt(); break;}
   case RIGHT : {moveRt(); break;}
   case UP : {moveUp();break;}
   case DOWN : {moveDn(); break;}
 }
});