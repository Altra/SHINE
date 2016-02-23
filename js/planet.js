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
	grd.addColorStop(1,"black");
	ctx.fillStyle=grd;
	ctx.beginPath();
	ctx.arc(planetX,planetY,210,0,2*Math.PI);
	ctx.closePath();
	ctx.fill();
	
	ctx.beginPath();
	ctx.arc(planetX,planetY,200,0,2*Math.PI);
	ctx.fillStyle='blue';
	ctx.fill();
	
	// Save the state, so we can undo the clipping
    ctx.save();
 
    // Create a circle
    ctx.beginPath();
    ctx.arc(planetX,planetY,200,0,2*Math.PI);
    // Clip to the current path
    ctx.clip();
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
	
	requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;
							
/*	var input = new CanvasInput({
		canvas: document.getElementById('planetCanvas'),
		 borderRadius: 0,
		 width: 200,
		 boxShadow: '0px 0px 0px #fff',
		 x: planetX-100,
		 y: planetY,
		 placeHolder: 'Enter your name here'
	});*/
 
	updatePlanet();
}

window.onload = function(){
	$(document).ready(function() {Tipped.create('.inline');});
	startPlanet();
}