function updateEvo() {
	
	
	if(sim){
	ctx.fillStyle='white';
	ctx.fillRect(0,0,c.width, c.height);
	
	zoom+=wheelDelta*5;
	if(zoom<5){zoom=5};
	if(mouseDown){
		mapCentre.x += mousePos.x-lastMousePos.x;
		mapCentre.y += mousePos.y-lastMousePos.y;
	};		
	lastMousePos=mousePos;
	hoverHex=pixelToHex(mousePos.x-mapCentre.x,mousePos.y-mapCentre.y);
	if(mouseDown){
		selectedTile=hoverHex;
	}
	
	drawMap();
	drawEntitys();
	//drawGUI();
	
	wheelDelta=0;
	} else {
	 ctx.fillStyle='97b6d2';
	 ctx.fillRect(0,0,c.width, c.height);
		
		
	drawDog(100,200,5);
		
		
	}
	
	time++;
	requestAnimationFrame(updateEvo);
}

function drawDog(x,y,s){

	ctx.drawImage(dogBase,x,y);
	drawPixles(setColour(dogPattern, 200, 60, 200, 256),x,y);
	ctx.drawImage(dogFace,x+73,y+4);
}

//If a pixel is not transparent set is colour to the given values;
 function setColour(pix,r,g,b,a) {
      var data = pix.data;
      for (var i = 0; i < data.length;i += 4) {
	if(data[i+3] != 0){

          center = 128;
 	  width = 127;
 	  frequency = Math.PI*2/120;

  	   r  = Math.sin(frequency*time+2) * width + center;
    	   g = Math.sin(frequency*time+0) * width + center;
    	   b  = Math.sin(frequency*time+4) * width + center;
           
           data[i]= r;
           data[i+1] = g;
           data[i+2] = b;
           data[i+3] = a;
          }
      }
     pix.data = data;
      return pix;      
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

function drawMap(){
	for(i=0;i<map.length;i++){
		for(a=0;a<map[i].length;a++){
		 xh=mapCentre.x+zoom*Math.sqrt(3)*(map[i][a].q+map[i][a].z/2);
		 yh=mapCentre.y+(3/2*zoom*map[i][a].z);
		 
		if(map[i][a].hasPlant){updatePlant(map[i][a].plant,map[i][a].data);}
		 
		 if(xh>0&&xh<c.width&&yh>0&&yh<c.height){
			planPoly(xh,yh,zoom,6,0.5*Math.PI,0);
			//ctx.fillStyle=map[i][a].col;
			//TEMP
			if(map[i][a].hasPlant){ctx.fillStyle= map[i][a].plant.alive ? 'darkGreen' : 'brown';}
			else {ctx.fillStyle='AntiqueWhite';}
			//
			ctx.fill()
		 }
		}
	}
	
	xh=mapCentre.x+zoom*Math.sqrt(3)*(hoverHex.q+hoverHex.z/2);
	yh=mapCentre.y+(3/2*zoom*hoverHex.z);
	planPoly(xh,yh,zoom,6,0.5*Math.PI,0);
	ctx.stroke();
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

function updateEntity(ent){
	tile = map[ent.q][ent.z];
	if(tile.hasPlant && tile.plant.alive){
		map[ent.q][ent.z].hasPlant=false;
	} else{
		if(ent.q<59 && map[ent.q+1][ent.z].hasPlant){
			ent.q++;
		}
		else if(ent.q>0 && map[ent.q-1][ent.z].hasPlant){
			ent.q--;
		}
		else if(ent.z<59 && map[ent.q][ent.z+1].hasPlant){
			ent.z++;
		}
		else if(ent.z>0 && map[ent.q][ent.z-1].hasPlant){
			ent.z--;
		}
		else if(ent.q<59 && ent.z<59 && map[ent.q+1][ent.z+1].hasPlant){
			ent.z++;
			ent.q++;
		}
		else if(ent.q>0 && ent.z>0 && map[ent.q-1][ent.z-1].hasPlant){
			ent.z--;
			ent.q--;
		}
		else {
			erz = Math.random();
			erq = Math.random();
			ent.z += erz > 0.33 ? (erz > 0.66 ? 1 : 0) : -1;
			ent.q += erq > 0.33 ? (erq > 0.66 ? 1 : 0) : -1;
		}
		
		//Temp
		if(ent.z>59){ent.z=59;}
		if(ent.q>59){ent.q=59;}
		if(ent.z<0){ent.z=0;}
		if(ent.q<0){ent.q=0;}
	}
	return ent;
}

function updatePlant(plt, data){
if(plt.alive){
	plt.water--;
	if(data.water>0){
		data.water--;
		plt.water++;
	}
	if(plt.water<1){
		//Plant deaf is turned off
		plt.alive = true;
	}
}
}

function drawGUI(){
	ctx.fillStyle='rgba(41, 163, 163,0.9)';
	ctx.fillRect(0,0,250,c.height);
	ctx.fillStyle='rgba(1, 123, 123,0.7)';
	ctx.fillRect(248,0,2,c.height);
	ctx.fillStyle='rgba(250, 250, 250,1)';
	ctx.fillRect(10,10,230,180);
}

function planPoly(x, y, radius, sides, startAngle, anticlockwise) {
  ctx.beginPath();
  if (sides < 3) return;
  var a = (Math.PI * 2)/sides;
  a = anticlockwise?-a:a;
  ctx.save();
  ctx.translate(x,y);
  ctx.rotate(startAngle);
  ctx.moveTo(radius,0);
  for (var i = 1; i < sides; i++) {
    ctx.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
  }
  ctx.closePath();
  ctx.restore();
}

function mouseInBox(bx,by,l,h) {
    if (mousePos.x >= bx && mousePos.x <= (l+bx)) {
		console.log(mousePos);
        if (mousePos.y >= by && mousePos.y <= (h+by)) {
            return true;
        }
    }
    return false;
}

function pixelToHex(x,y){
	q=(x*Math.sqrt(3)/3-y/3)/zoom;
	z=y*2/3/zoom;
	return hexRound({q:q,z:z});
}

function hexRound(h){
	return cubeToHex(cubeRound(hexToCube(h)));
}

function hexToCube(h){
	return {x:h.q,y:(-h.q-h.z),z:h.z};
}

function cubeToHex(h){
	return {q:h.x,z:h.z};
};

function cubeRound(h){
	rx = Math.round(h.x);
    ry = Math.round(h.y);
    rz = Math.round(h.z);

    x_diff = Math.abs(rx - h.x);
    y_diff = Math.abs(ry - h.y);
    z_diff = Math.abs(rz - h.z);

    if(x_diff > y_diff && x_diff > z_diff){
        rx = -ry-rz;
    } else if(y_diff > z_diff) {
        ry = -rx-rz;
    } else {
        rz = -rx-ry;
	}
    return {x:rx, y:ry, z:rz};
}

 function getMousePos(evt) {
    var rect = c.getBoundingClientRect();
    return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
    };
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
	
	
function startEvo(){
	c = document.getElementById("evoCanvas");
	ctx = c.getContext("2d");
	
	dogBase = new Image();
 	dogBase.src = 'Images/evo/dogBase.png';
	dogFace = new Image();
 	dogFace.src = 'Images/evo/face.png';
	dogPatternImg = new Image();
 	dogPatternImg.src = 'Images/evo/dogPattern.png';
	
	time = 0;
	cx = c.width/2;
	cy = c.height/2;
	mousePos={x:0,y:0};
	wheelDelta = 0;
	mouseDown=false;
	zoom=0;
	mapCentre={x:0,y:0};
	draging=false;
	lastMousePos={x:0,y:0};
	selectedTile={q:0,z:0};
	
	map = new Array();
	entities = new Array();
	//remove 
	for(i=-60;i<60;i++){
		map[i]= new Array();
		for(a=-60;a<60;a++){
		p=false;
		 if(Math.random()>0.7){p=true;}
		 map[i][a]={q:i,z:a,col:'darkGreen',hasPlant:p, plant:{alive:true, water:50},data:{water:50}};	
		}
	}
	entities[0] = {q:0,z:0};
	entities[1] = {q:5,z:10};
	//entities[2] = {q:55,z:6};
	//entities[3] = {q:56,z:50};
	//
	 c.addEventListener('mousemove', function(evt) {
        mousePos = getMousePos(evt);
      }, false);
	  c.addEventListener('mousedown', function(evt) {
        mouseDown = true;
      }, false);
	  c.addEventListener('mouseup', function(evt) {
        mouseDown = false;
      }, false);
	 c.addEventListener('mousewheel', function(evt) {
		wheelDelta = Math.max(-1, Math.min(1, (evt.wheelDelta || -evt.detail))); 
	 },false);
	
	requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;
 
 	sim=false;
 
 	dogPattern=imgToPixles(dogPatternImg);
 
	updateEvo();
}

window.onload = function(){
	$(document).ready(function() {Tipped.create('.inline');});
	startEvo();
}