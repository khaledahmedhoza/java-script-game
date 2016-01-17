window.onload = function(){
/--------------------------Gloabl Variables------------------------------/
var canvas = document.getElementById("mazecanvas");
var context = canvas.getContext("2d");
var currRectX = 425;
var currRectY = 3;
var mazeWidth = 556;
var mazeHeight = 556;
var intervalVar;
var element = document.getElementById("image1");
var xP,yP;
var level1Image = "img/easy.png";
var level2Image = "img/mid.png";
var level3Image = "img/hard.png";
var snd = new Audio("crazy_frog.mp3");
var hitting = new Audio("hitting.mp3");
var winsound = new Audio("winning.mp3");
var ending=0;
var xend,yend;

/***********************************/
function playsound(){
  var repeting = setInterval(function(){
    snd.play();
    //stop the music
    if(ending){ 
      clearInterval(repeting);
      snd.pause();
      snd.currentTime=0;
    }
  },1000);
}

/***********************************/
function stopsound(){
  snd.stop();
}

/***********************************/
function collisionDetection(xP,yP){
  index = (xP+(yP*canvas.width))*4;
  var imgData=context.getImageData(0,0,canvas.width,canvas.height);
  pixelColor = imgData.data[index]+imgData.data[index+1]+imgData.data[index+2];
  if (pixelColor >= 0 && pixelColor <= 500)
  //if (imgData.data[index]<250 && imgData.data[index+1]<250 && imgData.data[index+2]<250)
   return false;
  else 
   return true;
}

/***********************************/
function makeWhite(x, y, w, h) {
    context.beginPath();
    context.rect(x, y, w, h);
    context.closePath();
    context.fillStyle = "white";
    context.fill();
}
/***********************************/
function drawMaze(level) {
    element.src = "img/greenS.svg";
    var mazeImg = new Image();
    mazeImg.onload = function () { // when the image is loaded, draw the image, the rectangle and the circle
        context.drawImage(mazeImg, 0, 0);
    };
   playsound();
   
   if (level == 1){
     mazeImg.src = level1Image;
     createtimer(120);
	 xend=240; yend=460;
   }
   else if (level == 2){
     mazeImg.src = level2Image;
     createtimer(200);
	 xend=245; yend=450;
   }
   else {
     mazeImg.src = level3Image;
     createtimer(300);
	 xend=252; yend=470;
   }
    
}

/***********************************/

function leftArrowPressed(evt) {
//changechardirection("l");
 if(parseInt(element.style.left) > 0 && collisionDetection(xP-10,yP) == true){
  element.style.left = parseInt(element.style.left) - 5 + 'px';
 }
 else{
  hitting.play();
 }
}

/***********************************/

function rightArrowPressed() {
//changechardirection("r");           
if (parseInt(element.style.left) < 990 && collisionDetection(xP+10,yP) == true)
element.style.left = parseInt(element.style.left) + 5 + 'px';
else{
  hitting.play();
 }
}
/***********************************/
function upArrowPressed() {
//changechardirection("up");
if (parseInt(element.style.top) > 0 && collisionDetection(xP,yP-10) == true)
element.style.top = parseInt(element.style.top) - 5 + 'px';
else{
  hitting.play();
 }
}
/***********************************/
function downArrowPressed() {
  //changechardirection("dn");
if ( collisionDetection(xP,yP+10) == true)
element.style.top = parseInt(element.style.top) + 5 + 'px';
else{
  hitting.play();
 }
}

/***********************************/
function moveSelection(evt) {
                 
 xP = parseInt(element.style.left);
 yP = parseInt(element.style.top);
                switch (evt.keyCode) {
                    case 37:
                    leftArrowPressed(evt);
                    break;
                    case 39:
                    rightArrowPressed(evt);
                    break;
                    case 38:
                    upArrowPressed(evt);
                    break;
                    case 40:
                    downArrowPressed(evt);
                    break;
                    }
                };
/***********************************/
function createtimer(seconds){
    var intervalVar = setInterval(function(){
      // makeWhite(mazeWidth, 0, canvas.width - mazeWidth, canvas.height);
        if (seconds === 0) {
            clearInterval(intervalVar);
           window.removeEventListener("keydown", moveSelection);
            //makeWhite(0, 0, canvas.width, canvas.height);
            context.font = "40px Arial";
            context.fillStyle = "red";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText("Time's up!", canvas.width / 2, canvas.height / 2);
            return;
        }
    ///////////////////////////// winning condition
    if(parseInt(element.style.top) > yend && (parseInt(element.style.left)<=xend+5 && parseInt(element.style.left)>xend-5 )){
      ending=1;
      clearInterval(intervalVar);
      window.removeEventListener("keydown", moveSelection);
	  window.location="page1.html";
	  
    }
    //*********************************/
    
    //////////
    ////////////
    ///////////condition to stop music 
    if(seconds == 1) ending=1;
    //////////////////
        context.font = "20px Arial";
        if (seconds <= 15 && seconds > 5) {
            context.fillStyle = "orange";
        }
        else if (seconds <= 5) {
            context.fillStyle = "red";
        }
        else {
            context.fillStyle = "green";
        }
        context.textAlign = "center";
        context.textBaseline = "middle";
		context.font="30px Arial";
        var minutes = Math.floor(seconds / 60);
        var secondsToShow = (seconds - minutes * 60).toString();
        if (secondsToShow.length === 1) {
            secondsToShow = "0" + secondsToShow; // if the number of seconds is '5' for example, make sure that it is shown as '05'
        }
        context.clearRect(mazeWidth-50,0,300,60)
        context.fillText(minutes.toString() + ":" + secondsToShow, mazeWidth+10, 40);
        seconds--;
    },1000);
  }
/***********************************/
//onkeydown="";
var mazelev =localStorage.level; 
setposition();
function setposition(){
	if(mazelev==1){
	element.style.position="absolute";
	element.style.left= 240;
	element.style.top= 5;
}else if(mazelev==2){
	element.style.position="absolute";
	element.style.left= 245;
	element.style.top= 5;
}else{
	element.style.position="absolute";
	element.style.left= 230;
	element.style.top= 3;
}
}

drawMaze(mazelev);
window.addEventListener('keydown', moveSelection);
}
 

