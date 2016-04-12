<<<<<<< HEAD
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
=======
function updatePlanet() {
	
	ctx.fillStyle='white';
	ctx.fillRect(0,0,c.width, c.height);
	
	ctx.font="25px Verdana";
    ctx.fillStyle='black';
    ctx.fillText("Fractional Distillation Of Air",20,40);
	
	ctx.fillStyle='black';
	ctx.fillRect(c.width/2-107,c.height/2-252,204,504);
	
	ctx.fillRect(c.width/2-70-150,c.height/2-12+150,150,24);
	
	ctx.fillRect(c.width/2-2,c.height/2-12-270,252,24);
	ctx.fillRect(c.width/2-2,c.height/2-270,24,40);
	
	ctx.fillRect(c.width/2-2,c.height/2-12+270,252,24);
	ctx.fillRect(c.width/2-2,c.height/2+230,24,40);
	ctx.fillStyle='grey';
	ctx.fillRect(c.width/2-105,c.height/2-250,200,500)
	
	ctx.fillRect(c.width/2-70-150,c.height/2-10+150,150,20);
	
	ctx.fillRect(c.width/2,c.height/2-10-270,250,20);
	ctx.fillRect(c.width/2,c.height/2-270,20,40);
	
	ctx.fillRect(c.width/2,c.height/2-10+270,250,20);
	ctx.fillRect(c.width/2,c.height/2+230,20,40);
	
	
	
	ctx.fillStyle='lightBlue';
	ctx.fillRect(c.width/2-400,c.height/2+50,200,25);
	if(mouseInBox(c.width/2-400,c.height/2+50,200,25)){
	ctx.fillStyle='darkBlue';
	ctx.fillRect(c.width/2-400,c.height/2+50,200,25);
	ctx.font="15px Verdana";
    ctx.fillStyle='white';
    ctx.fillText("IN: Liquified air at -200*C",c.width/2-395,c.height/2+67);
	}
	
	ctx.fillStyle='lightBlue';
	ctx.fillRect(c.width/2+400,c.height/2-250,200,25);
	if(mouseInBox(c.width/2+400,c.height/2-250,200,25)){
	ctx.fillStyle='darkBlue';
	ctx.fillRect(c.width/2+400,c.height/2-250,200,25);
	ctx.font="15px Verdana";
    ctx.fillStyle='white';
    ctx.fillText("OUT: Nitrogen (as a gas)",c.width/2+405,c.height/2-230);
	}
	
	ctx.fillStyle='lightBlue';
	ctx.fillRect(c.width/2+400,c.height/2+250,200,25);
	if(mouseInBox(c.width/2+400,c.height/2+250,200,25)){
	ctx.fillStyle='darkBlue';
	ctx.fillRect(c.width/2+400,c.height/2+250,200,25);
	ctx.font="15px Verdana";
    ctx.fillStyle='white';
    ctx.fillText("OUT: Liquid oxygen",c.width/2+405,c.height/2+265);
	}
	
	ctx.fillStyle='lightBlue';
	ctx.fillRect(c.width/2-30,c.height/2+150,100,25);
	if(mouseInBox(c.width/2-30,c.height/2+150,100,25)){
	ctx.fillStyle='darkBlue';
	ctx.fillRect(c.width/2-30,c.height/2+150,100,25);
	ctx.font="15px Verdana";
    ctx.fillStyle='white';
    ctx.fillText("-185*C",c.width/2,c.height/2+165);
	}
	
	ctx.fillStyle='lightBlue';
	ctx.fillRect(c.width/2-30,c.height/2-150,100,25);
	if(mouseInBox(c.width/2-30,c.height/2-150,100,25)){
	ctx.fillStyle='darkBlue';
	ctx.fillRect(c.width/2-30,c.height/2-150,100,25);
	ctx.font="15px Verdana";
    ctx.fillStyle='white';
    ctx.fillText("-190*C",c.width/2,c.height/2-135);
	}
	
	/*
	var grd=ctx.createRadialGradient(planetX,planetY,200,planetX,planetY,210);
	grd.addColorStop(0,"lightBlue");
>>>>>>> d448f90c12a688c9a0321df8885a6a1703ea92a9
	grd.addColorStop(1,"black");
	ctx.fillStyle=grd;
	ctx.beginPath();
	ctx.arc(planetX,planetY,210,0,2*Math.PI);
	ctx.closePath();
	ctx.fill();
	
	ctx.beginPath();
	ctx.arc(planetX,planetY,200,0,2*Math.PI);
<<<<<<< HEAD
	ctx.fillStyle=planetBack;
=======
	ctx.fillStyle='blue';
>>>>>>> d448f90c12a688c9a0321df8885a6a1703ea92a9
	ctx.fill();
	
	// Save the state, so we can undo the clipping
    ctx.save();
 
    // Create a circle
    ctx.beginPath();
    ctx.arc(planetX,planetY,200,0,2*Math.PI);
    // Clip to the current path
    ctx.clip();
<<<<<<< HEAD
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
=======
    ctx.fillStyle='red';
    ctx.fillRect(c.width/2-250+p,c.height/2,50,40)
 
    // Undo the clipping
    ctx.restore();
    
    barGrad=ctx.createLinearGradient(0,0,c.width,100);
    if (barGrad>0.1){
        barGrad.addColorStop(barGC-0.1,"lightBlue")
        }
    barGrad.addColorStop(barGC,"darkBlue");
    if (barGrad<1){
    barGrad.addColorStop(barGC+0.1,"lightBlue");
    }
    barGC++;
    if(barGC>1){
      barGC = 0;   
    }
    //Oxygen
    ctx.font="30px Verdana";
    ctx.fillStyle='white';
    ctx.fillText("O",20,40);
    ctx.font="20px Verdana";
    ctx.fillText("2",43,45);
    ctx.fillStyle=barGrad;
    ctx.fillRect(60,18,50,30);
    //Nitrogen
    ctx.font="30px Verdana";
    ctx.fillStyle='white';
    ctx.fillText("N",20,80);
    ctx.font="20px Verdana";
    ctx.fillText("2",43,85);

	p++;
	if(p>800){
            p=0;
	}
	
	*/
	
	requestAnimationFrame(updatePlanet);
}

function mouseInBox(bx,by,l,h) {

    if (mousePos.x >= bx && mousePos.x <= (l+bx)) {
		console.log(mousePos);
        if (mousePos.y >= by && mousePos.y <= (h+by)) {
            return true;
        }
    }
    return false;
};

 function getMousePos(evt) {
        var rect = c.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
	
	
function startPlanet(){
	c = document.getElementById("planetCanvas");
	ctx = c.getContext("2d");
	
	planetX = c.width/2;
	planetY = c.height/2;
	p=0;
    barGC=0;
	mousePos= {x:0,y:0};
	
	 c.addEventListener('mousemove', function(evt) {
        mousePos = getMousePos(evt);
      }, false);
>>>>>>> d448f90c12a688c9a0321df8885a6a1703ea92a9
	
	requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;
<<<<<<< HEAD
        mouseDown=false;
        mousePos={x:0,y:0};
        document.addEventListener('mousedown', function() {mouseDown=true;}, false);
        document.addEventListener('mouseup', function() {mouseDown=false;},   false);
        document.addEventListener('mousemove',getCanvasMousePos, false);
=======
							
/*	var input = new CanvasInput({
		canvas: document.getElementById('planetCanvas'),
		 borderRadius: 0,
		 width: 200,
		 boxShadow: '0px 0px 0px #fff',
		 x: planetX-100,
		 y: planetY,
		 placeHolder: 'Enter your name here'
	});*/
>>>>>>> d448f90c12a688c9a0321df8885a6a1703ea92a9
 
	updatePlanet();
}

window.onload = function(){
	$(document).ready(function() {Tipped.create('.inline');});
	startPlanet();
}