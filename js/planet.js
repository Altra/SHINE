function getCanvasMousePos(evt) {
    var rect = c.getBoundingClientRect();
    mousePos = {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function isMouseInArea(x,y,l,h){
    if(mousePos.x>x && mousePos.x<(x+l)){
     if(mousePos.y>y && mousePos.y<(y+h)){
      return true;
    }   
   }
   return false;
}

function popup() {
 ctx.fillStyle="rgba(77, 179, 179, 0.7)";
 ctx.fillRect(px,py,600,500);
 ctx.fillRect(px+25,py+20,550,50);
 
 ctx.fillRect(px+25,py+100,550,50);
 ctx.fillRect(px+25,py+160,550,50);
 ctx.fillRect(px+25,py+220,550,50);

 ctx.fillStyle="rgba(220, 90, 90, 0.5)";
if(isMouseInArea(px+25,py+100,550,50)){
    if(mouseDown){
         ctx.fillStyle="rgba(220, 90, 90, 1)";
     ctx.fillRect(px+25,py+100,550,50);
     } else{
        ctx.fillRect(px+25,py+100,550,50);
    }
}
else if(isMouseInArea(px+25,py+160,550,50)){
     ctx.fillRect(px+25,py+160,550,50);
}
else if(isMouseInArea(px+25,py+220,550,50)){
     ctx.fillRect(px+25,py+220,550,50);
}

 ctx.font="30px Verdana";
 ctx.fillStyle='white';
 question="This is the Question?";
 ctx.fillText(question,px+300-(ctx.measureText(question).width/2), py+55);

}

function menu(){
 ctx.fillStyle="rgba(77, 179, 179, 1)";
 ctx.fillRect(px+25,py+100,550,50);
  ctx.fillStyle="rgba(0, 10, 225, 0.3)";
  if(isMouseInArea(px+25,py+100,550,50)){
    if(mouseDown){
     ctx.fillStyle="rgba(0, 10, 225, 1)";
      ctx.fillRect(px+25,py+100,550,50);
      onMenu=false;
     } else{
        ctx.fillRect(px+25,py+100,550,50);
    }
 }
 
 ctx.font="30px Verdana";
 ctx.fillStyle='white';
 words="Start";
 ctx.fillText(words,c.width/2-(ctx.measureText(words).width/2), py+135);
}

function updatePlanet() {
	
	ctx.fillStyle='black';
	ctx.fillRect(0,0,c.width, c.height);
	
	if(onMenu){
	    menu();
	} else {
	    
	if(time==0){
	    oxygen=37;
	   nitrogen=80;
	   carbon=18; //carbon dioxide percent
	    atmosCol="#b59a84";
	    planetBack="#e0986e";
	} else {
	   atmosCol="#8ccbff";	
	  planetBack='blue';
	}
	var grd=ctx.createRadialGradient(planetX,planetY,200,planetX,planetY,210);
	grd.addColorStop(0,atmosCol);
	grd.addColorStop(1,"black");
	ctx.fillStyle=grd;
	ctx.beginPath();
	ctx.arc(planetX,planetY,210,0,2*Math.PI);
	ctx.closePath();
	ctx.fill();
	
	ctx.beginPath();
	ctx.arc(planetX,planetY,200,0,2*Math.PI);
	ctx.fillStyle=planetBack;
	ctx.fill();
	
	// Save the state, so we can undo the clipping
    ctx.save();
 
    // Create a circle
    ctx.beginPath();
    ctx.arc(planetX,planetY,200,0,2*Math.PI);
    // Clip to the current path
    ctx.clip();
    ctx.drawImage(t1,c.width/2-600+t1c,c.height/2-200);
    ctx.drawImage(t2,c.width/2-600+t2c,c.height/2-200);
    
    var grd=ctx.createRadialGradient(planetX,planetY,180,planetX,planetY,200);
	grd.addColorStop(0,"rgba(0, 0, 0, 0)");
	grd.addColorStop(1,"rgba(0, 0, 0, 0.3)");
	ctx.fillStyle=grd;
	ctx.beginPath();
	ctx.arc(planetX,planetY,200,0,2*Math.PI);
	ctx.closePath();
	ctx.fill();    
    // Undo the clipping
    ctx.restore();

    //Oxygen
    ctx.font="30px Verdana";
    ctx.fillStyle='white';
    ctx.fillText("O",25,40);
    ctx.font="20px Verdana";
    ctx.fillText("2",48,45);
    ctx.fillText(oxygen+"%",170,40);
    ctx.fillStyle="#262626";
    ctx.fillRect(65,18,100,30);
    ctx.fillStyle="#33cccc";
    ctx.fillRect(65,18,oxygen,30);
    //Nitrogen
    ctx.font="30px Verdana";
    ctx.fillStyle='white';
    ctx.fillText("N",25,80);
    ctx.font="20px Verdana";
    ctx.fillText("2",48,85);
    ctx.fillText(nitrogen+"%",170,80);
    ctx.fillStyle="#262626";
    ctx.fillRect(65,58,100,30);
    ctx.fillStyle="#33cccc";
    ctx.fillRect(65,58,nitrogen,30);
    //CO2
    ctx.font="30px Verdana";
    ctx.fillStyle='white';
    ctx.fillText("CO",7,120);
    ctx.font="20px Verdana";
    ctx.fillText("2",50,125);
    ctx.fillText(carbon+"%",170,120);
    ctx.fillStyle="#262626";
    ctx.fillRect(65,98,100,30);
    ctx.fillStyle="#33cccc";
    ctx.fillRect(65,98,carbon,30);
    
    ctx.font="30px Verdana";
    ctx.fillStyle='white';
    ctx.fillText("Present",(c.width/2)-(ctx.measureText("Present").width/2),c.height-15);
    
    t1c++;
    if(t1c==800){
     t1c=0;
    }
    t2c++;
    if(t2c==800){
     t2c=0;
    }

 if(showingPopup){
  popup();
 }
 }
 requestAnimationFrame(updatePlanet);
}	

function startPlanet(){
	c = document.getElementById("planetCanvas");
	ctx = c.getContext("2d");
	 t1 = new Image();
 	 t1.src = 'Images/te1.png';
	 t2 = new Image();
 	 t2.src = 'Images/t2.png';
 	 t1c = 400;
 	 t2c = 0;
 	 
	planetX = c.width/2;
	planetY = c.height/2;
	 px=c.width/2-300;
         py=c.height/2-250;
	
	//PlanetValues
	oxygen=37;
	nitrogen=71;
	carbon=0.02; //carbon dioxide percentage
	temp=0; ///Adverage surface temp
	time=0;
	atmosCol="#8ccbff";
	planetBack='blue';
	
	showingPopup = false;
	onMenu = true;
	
	requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;
        mouseDown=false;
        mousePos={x:0,y:0};
        document.addEventListener('mousedown', function() {mouseDown=true;}, false);
        document.addEventListener('mouseup', function() {mouseDown=false;},   false);
        document.addEventListener('mousemove',getCanvasMousePos, false);
 
	updatePlanet();
}

window.onload = function(){
	$(document).ready(function() {Tipped.create('.inline');});
	startPlanet();
}