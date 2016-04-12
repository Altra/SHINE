function update() {

	 ctx.fillStyle='97b6d2';
	 ctx.fillRect(0,0,c.width, c.height);

	if(delayTime < 90){
	 ctx.font = "30px Arial";
	 ctx.fillStyle='black';
    	 ctx.fillText("Loading",cx-20,cy);
    	 delayTime++;
	} else if (delayTime != 91){
		dogBase = imgToPixles(dogBaseImg);
		delayTime = 91;
	}else{

	drawGUI();
	drawDogs();
	if(updateDrag) { drag(); }
	
	}
	
	time++;
        mouseReleased=false; 
	requestAnimationFrame(update);
}

function drawGUI(){
           //     drawRightPanel();
		ctx.fillStyle = dogInBox ? 'green' : 'red';
		ctx.fillRect(50,300,dogWidth+5, dogHeight + 5);
		ctx.fillStyle = dogInBoxt ? 'green' : 'red';
		ctx.fillRect(250,300,dogWidth+5, dogHeight + 5);
		ctx.fillStyle = 'darkBlue';
		ctx.fillRect(500,300,dogWidth+5, dogHeight + 5);
	//	ctx.fillStyle = 'blue';
		//ctx.fillRect(c.width-175,410,dogWidth+5, dogHeight+5);
		
		button = {x: 420, y: 340, width: 70, height: 100, state: (dogInBox && dogInBoxt) ? (checkOutForDog() ? 3 : 0) : 3, col: ['blue','darkBlue','darkGreen','grey'], text: 'Combine', onPress: createNewDog};
		
		drawButton(button);
		
		if(dogInBox){
			drawInfo(dogs[inBoxID],50,500);
		}
		if(dogInBoxt){
			drawInfo(dogs[inBoxIDt],250,500);
		}

}

function checkOutForDog(){
    outDogID = dogs.length;
		for (i=0; i < dogs.length; i++) {
			if(pointInBox(dogs[i].x+(dogWidth/2),dogs[i].y+(dogHeight/2),500,300,dogWidth+5, dogHeight+5)) {
				outDogID=i;
				dogInOut=true;
				break;
			}
		}
		if(outDogID == dogs.length){dogInOut=false;}
		return dogInOut;
}

function drawInfo(dog,x,y){
    ctx.font = "15px Arial";
    ctx.fillStyle='black';
    ctx.fillText("Black:" + allelesToText(dog.genes[0],"k","K"),x,y);
    ctx.fillText("White: " + allelesToText(dog.genes[1],"s","S"),x,y+20);	
    ctx.fillText("Red: " + allelesToTextThree(dog.genes[2],"R","w","r"),x,y+40);	
}

function allelesToText(alleles,fLetter,sLetter){
    return alleles[0] == 1 ? (alleles[1] == 1 ? (fLetter + fLetter) : (fLetter + sLetter)) : (alleles[1] == 1 ? (sLetter + fLetter) : (sLetter + sLetter));
}

function geneToLetter(allele,fLetter,sLetter,tLetter){
    return allele == 2 ? fLetter : (allele == 1 ? sLetter  : tLetter);
}

function allelesToTextThree(alleles,fLetter,sLetter,tLetter){
    return geneToLetter(alleles[0],fLetter,sLetter,tLetter) + geneToLetter(alleles[1],fLetter,sLetter,tLetter) ;
   // return alleles[0] == 2 ? (alleles[1] == 2 ? (fLetter + fLetter) : (alleles[1] == 1 ? (fLetter + sLetter) : (fLetter + tLetter))) : 
    (alleles[0] == 1 ? (alleles[1] == 2 ? (sLetter + fLetter) : (alleles[1] == 1 ? (sLetter + sLetter) : (sLetter + tLetter))) :
    (alleles[1] == 2 ? (tLetter + fLetter) : (alleles[1] == 1 ? (tLetter + sLetter) : (tLetter + tLetter))));
}

function drawRightPanel(){
		ctx.fillStyle = 'rgb(50,100,150)';
		ctx.fillRect(c.width-200,0,200,c.height);
}

function drawButton(button){
		//Button states
		// 0 = normal
		//1 = hover
		//2 = mouse down
		//3 = disabled
		if(button.state != 3){
		 button.state = pointInBox(mousePos.x,mousePos.y,button.x,button.y,button.width,button.height) ? (mouseDown ? 2 : 1) : 0;
		 if(button.state == 1 && mouseReleased){button.onPress()};
		}
		
		ctx.fillStyle = button.col[button.state];
		ctx.fillRect(button.x,button.y,button.width,button.height);
	
		ctx.font = "15px Arial";
		ctx.fillStyle='white';
		var m = ctx.measureText(button.text);
		ctx.fillText(button.text,button.x+(button.width/2)-(m.width/2),button.y+(button.height/2)+5);
	}

function drawDogs(){
 for(var i=0; i < dogs.length; i++){
  drawDog(dogs[i]);	
 }	
}

function drag(){
               dogs[dogs.length-1].x = dogs[dogs.length-1].x + easeAmount*(target.x - dogs[dogs.length-1].x);
		dogs[dogs.length-1].y = dogs[dogs.length-1].y + easeAmount*(target.y - dogs[dogs.length-1].y);
		
		//stop the timer when the target position is reached (close enough)
		if ((!dragging)&&(Math.abs(dogs[dogs.length-1].x - target.x) < 0.1) && (Math.abs(dogs[dogs.length-1].y - target.y) < 0.1)) {
			dogs[dogs.length-1].x = target.x;
			dogs[dogs.length-1].y = target.y;
			updateDrag = false;
		}
		
		inBoxID = dogs.length;
		for (i=0; i < dogs.length; i++) {
			if(pointInBox(dogs[i].x+(dogWidth/2),dogs[i].y+(dogHeight/2),50,300,dogWidth+5, dogHeight + 5)) {
				inBoxID=i;
				dogInBox=true;
				break;
			}
		}
		if(inBoxID == dogs.length){dogInBox=false;}
		
		inBoxIDt = dogs.length;
		for (i=0; i < dogs.length; i++) {
			if(pointInBox(dogs[i].x+(dogWidth/2),dogs[i].y+(dogHeight/2),250,300,dogWidth+5, dogHeight+5)) {
				inBoxIDt=i;
				dogInBoxt=true;
				break;
			}
		}
		if(inBoxIDt == dogs.length){dogInBoxt=false;}
		
}

function drawDog(dog){
	phen = dog.phen;
	if(phen.solidBlack){r=40; g=40; b=45;}
	else {
	    switch(phen.red){
	        case 0: r=40; g=40; b=45; break;
	        case 1: r=110; g=100; b=100; break;
	        case 2: r=216; g=96; b=46; break;
	 }    
	}
	
	drawPixles(setColour(dogBase, r, g, b, 255),dog.x,dog.y);
	if(phen.whiteSpotted){ctx.drawImage(dogWhiteImg,dog.x,dog.y);}
	ctx.drawImage(dogFace,dog.x+73,dog.y+4);
}

//If a pixel is not transparent set is colour to the given values;
 function setColour(pix,r,g,b,a) {
      var data = pix.data;
      for (var i = 0; i < data.length;i += 4) {
	if(data[i+3] != 0){
           
           data[i]= r;
           data[i+1] = g;
           data[i+2] = b;
           data[i+3] = a;
          }
      }
     pix.data = data;
      return pix;      
}

function genesToPhenotype(genes){
	solidBlack = false;
	whiteSpotted = false;
	red = 0; //0 = black, 1 = grey, 2=red;
	 	
	//0 = K locus = black series
	//- K: Black (solid black all over). Overrides A (agouti) series. Any genes on the A locus will not be expressed. 
	//- kbr: Ignored
        //- k: Non-solid black. A kk dog will express whichever genes are on its A locus.
        solidBlack = genes[0][0] == 0 ? true : (genes[0][1] == 0 ? true : false);
        whiteSpotted = genes[1][0] == 0 ? false : (genes[1][1] == 0 ? false : true);
        red = (genes[2][0] == 2) ? 2 : (genes[2][1] == 2 ? 2 : (genes[2][0] == 1 ? 1 : (genes[2][1] == 1 ? 1 : 0)));
	
	return {solidBlack,whiteSpotted,red};
}

function rainbow(){
          center = 128;
 	  width = 127;
 	  frequency = Math.PI*2/120;

  	   r  = Math.sin(frequency*time+2) * width + center;
    	   g = Math.sin(frequency*time+0) * width + center;
    	   b  = Math.sin(frequency*time+4) * width + center;
    	   return {r,g,b};
}

function imgToPixles(img){
	var cw=document.createElement("canvas");
        cw.width=img.width;
        cw.height=img.height;
        var ctxw=cw.getContext("2d");
	ctxw.drawImage(img,0,0);
	return ctxw.getImageData(0,0,img.width,img.height);
}

function drawPixles(pixles,x,y){
	var cw=document.createElement("canvas");
        cw.width=pixles.width;
        cw.height=pixles.height;
        cw.getContext("2d").putImageData(pixles,0,0);
	ctx.drawImage(cw,x,y);
}

function drawEntitys(){
	for(i=0;i<entities.length;i++){
		 xh=mapCentre.x+zoom*Math.sqrt(3)*(entities[i].q+entities[i].z/2);
		 yh=mapCentre.y+(3/2*zoom*entities[i].z);
		 if(xh>0&&xh<c.width&&yh>0&&yh<c.height){
			ctx.fillStyle='red';
			ctx.fillRect(xh-(zoom/2),yh-(zoom/2),zoom,zoom);
			entities[i] = updateEntity(entities[i]);
		 }
	}
}

function createNewDog(){
	                dogA = dogs[inBoxID];
			dogB = dogs[inBoxIDt];
			
			genome = combineGenomes(dogA,dogB);
			dogs.push({x:500, y:300, phen:0, genes:combineGenomes(dogA,dogB)});
	                dogs[dogs.length-1].phen = genesToPhenotype(dogs[dogs.length-1].genes);
}

 
 function combineGenomes(dogA, dogB){
                genesA = randomGeneSplit(dogA.genes);
                genesB = randomGeneSplit(dogB.genes);
                newGeneome = [];
                for(i=0; i < genesA.length; i++){
                    newGeneome[i] = [genesA[i], genesB[i]];
                }
		return newGeneome;
}

function randomGeneSplit(genes){
    halfGene = [];
    for(i=0; i < genes.length; i++){
    halfGene.push(Math.random() > 0.5 ? genes[i][0] : genes[i][1] );
    }
    return halfGene;
}

function mouseInBox(bx,by,l,h) {
    if (mousePos.x >= bx && mousePos.x <= (l+bx)) {
        if (mousePos.y >= by && mousePos.y <= (h+by)) {
            return true;
        }
    }
    return false;
}

function pointInBox(px,py,bx,by,l,h) {
    if (px >= bx && px <= (l+bx)) {
        if (py >= by && py <= (h+by)) {
            return true;
        }
    }
    return false;
}

function getTouchPos(evt){
touch = evt.targetTouches[0];
var rect = c.getBoundingClientRect();
    return {
		x: touch.pageX - rect.left,
		y: tough.pageY - rect.top
    };
}
 function getMousePos(evt) {
    var rect = c.getBoundingClientRect();
    return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
    };
}

 function mouseDownListener(evt) {
 	mouseDown=true;
 	
 	
 	//find which dog was clicked
	for (i=0; i < dogs.length; i++) {
	  if(hitTest(dogs[i])) {
				dragging = true;
				//the following variable will be reset if this loop repeats with another successful hit:
				dragIndex = i;
	  }
	}
	
	if (dragging) {
			
			//We now place the currently dragged shape on top by reordering the array which holds these objects.
			//We 'splice' out this array element, then 'push' it back into the array at the end.
			dogs.push(dogs.splice(dragIndex,1)[0]);
			
			//shape to drag is now last one in array. We read record the point on this object where the mouse is "holding" it:
			dragHold.x = mousePos.x - dogs[dogs.length-1].x;
			dragHold.y = mousePos.y - dogs[dogs.length-1].y;
			
			//The "target" position is where the object should be if it were to move there instantaneously. But we will
			//set up the code so that this target position is approached gradually, producing a smooth motion.
			target.x = mousePos.x - dragHold.x;
			target.y = mousePos.y - dragHold.y;
			
			updateDrag = true;
		}
	
 }
 
 function mouseMoveListener(evt) {
   
       mousePos=getMousePos(evt);
       if(dragging){
        
       //clamp x and y positions to prevent object from dragging outside of canvas
		posX = mousePos.x - dragHold.x;
		posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
		posY = mousePos.y - dragHold.y;
		posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);
		
		target.x = posX;
		target.y = posY;
	
                //Limits

		
		if(pointInBox(mousePos.x,mousePos.y,50,300,dogWidth,dogHeight)){
			if(dogInBox&&inBoxID==dogs.length-1){
				target.x = 52;
				target.y = 302;
			}
		} else if(pointInBox(mousePos.x,mousePos.y,250,300,dogWidth,dogHeight)){
			if(dogInBoxt&&inBoxIDt==dogs.length-1){
				target.x = 252;
				target.y = 302;
			}
			
		//} else if(pointInBox(mousePos.x,mousePos.y,c.width-175,410,dogWidth, dogHeight)){
		//	if(dogInOut&&outDogID==dogs.length-1){
		//		target.x = c.width-173;
		//		target.y = 412;
		//	}
		}
	}
		
 }
 
 function hitTest(dog){
  return mouseInBox(dog.x,dog.y,156,174);	
 }

function randomGenes(){
 return [[oneOrZero(),oneOrZero()],[oneOrZero(),oneOrZero()],[zeroToTwo(),zeroToTwo()]]
}

function oneOrZero(){
return (Math.random() > 0.5) ? 1 : 0;
}

function zeroToTwo(){
    return (Math.random() > 0.33) ? (Math.random() > 0.5 ? 2 : 1) : 0;
}
 
function start(){
	c = document.getElementById("canvas");
	ctx = c.getContext("2d");
	
	dogBaseImg = new Image();
 	dogBaseImg.src = 'Images/evo/dogBase.png';
	dogFace = new Image();
 	dogFace.src = 'Images/evo/face.png';
	//dogPatternImg = new Image();
 	//dogPatternImg.src = 'Images/evo/dogPattern.png';
 	dogWhiteImg = new Image();
 	dogWhiteImg.src = 'Images/evo/dogWhite.png';
 	
 	
	time = 0;
	delayTime = 0;
	cx = c.width/2;
	cy = c.height/2;
	mousePos={x:0,y:0};
	mouseDown=false;
	mouseReleased = false;
	dragging=false;
	dragHold={x:0,y:0};
	target={x:0,y:0};
	easeAmount = 0.30;
	updateDrag = false;
	
	dogWidth = 156;
	dogHeight= 174;
	minX = 0;
	maxX = c.width - 78;
	minY = 0;
	maxY = c.height - 87;
	
	dogInBox = false;
	inBoxID = 0;
	dogInBoxt = false;
	inBoxIDt = 0;
	dogInOut = false;
	outDogID = 0;
	
	dogs = new Array();
	
	//remove
	
	dogs[0] = {x:200, y:150, phen:0, genes:randomGenes()};
	dogs[0].phen = genesToPhenotype(dogs[0].genes);
	
	dogs[1] = {x:500, y:150, phen:0, genes:randomGenes()};
	dogs[1].phen = genesToPhenotype(dogs[1].genes);

	 c.addEventListener('mousemove',function(evt){ mousePos= getMousePos(evt); mouseMoveListener(evt);}, false);
	  c.addEventListener('mousedown',function(evt){ mousePos= getMousePos(evt); mouseDownListener(evt);}, false);
	  c.addEventListener('mouseup', function(evt) {
	    dragging=false;
	    mouseReleased=true;
            mouseDown = false;
      }, false);
	 c.addEventListener('mousewheel', function(evt) {
		wheelDelta = Math.max(-1, Math.min(1, (evt.wheelDelta || -evt.detail))); 
	 },false);

        c.addEventListener('touchmove', function(evt){ mousePos= getTouchPos(evt); mouseMoveListener(evt); if(evt.targetTouches.length==1){if (evt.preventDefault) {
			evt.preventDefault();
		} //standard
		else if (evt.returnValue) {
			evt.returnValue = false;
		} //older IE
		return false;}}, false);
         c.addEventListener('touchstart', function(evt){ mousePos= getTouchPos(evt); mouseDownListener(evt);  if(evt.targetTouches.length==1){if (evt.preventDefault) {
			evt.preventDefault();
		} //standard
		else if (evt.returnValue) {
			evt.returnValue = false;
		} //older IE
		return false;}}, false);
	  c.addEventListener('touchend', function(evt) {
	    dragging=false;
	    mouseReleased=true;
            mouseDown = false;
      }, false);
	
	requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;

 	//dogPattern=imgToPixles(dogPatternImg);


 	
	update();
}

window.onload = function(){
	$(document).ready(function() {Tipped.create('.inline');});
	start();
}
