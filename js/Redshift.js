//
//  Redshift.js

function updateSpectra() {
	z = getSlider(sliderSpec,300);
	if (z == lastSliderSpec){
	 requestAnimationFrame(updateSpectra);
	 return;
    }
	lastSliderSpec = z;
	var l = 335;
	var y = 50;

	ctxS.fillStyle='black';
	ctxS.fillRect(0,0,335,40);

	//Original
	ctxS.fillStyle=drawSpectra(l, ctxS);
	ctxS.fillRect(0,0,335,40);
	drawAbsorption(0, 0, ctxS);

	//Redshifted
	ctxS.fillStyle=drawSpectra(l, ctxS);
	ctxS.fillRect(0,50,335,40);
	drawAbsorption(z*2, y, ctxS);

	v = (z*(3e8))/1000;//Divided by 1000 to convert m/s to km/s
	d = (v/67.80)*3.26156; //Multiplied by the constant to cover megaparsecs to lightyears
	vt =  v.toExponential(2);
	dt = d.toExponential(2);
	if (vt == "0.00e+0"){
  	 tx.innerHTML = "The velocity of the galaxy is 0 km/s";
	 com.innerHTML = 'The galaxy is not moving relative to us so its absorption spectrum has not changed.';
	 com2.innerHTML = '';
	} else {
 	 vt = vt.replace('e+','x10^');
	 tx.innerHTML = "The velocity of the galaxy is " + vt + " km/s";
	 if (v > 0) {
	  dt = dt.replace('e+','x10^');
	  com.innerHTML = 'The galaxy is moving away from us so its absorption spectrum is redshifted.';
	  com2.innerHTML = ('Nearly all galaxies are moving away from us due to the universe expanding. We can work out the distance to the galaxy because the further away it is the faster it will be moving. This one would be ~' + dt + ' lightyears away.');
	 } else {
	  com.innerHTML = 'The galaxy is moving towards us so its absorption spectrum is blueshifted.';
	  com2.innerHTML = 'There are few galaxies moving towards us. The most well known is Andromeda, which will eventually collide with our own galaxy, the Milky Way.';
	 }
	}

	 requestAnimationFrame(updateSpectra);
}
	
function drawSpectra(l, ctxS) {
  var grd=ctxS.createLinearGradient(0,0,l,0);
	grd.addColorStop(0,'rgb(0,0,0)');
	grd.addColorStop(0.08,'rgb(73,0,140)');
	grd.addColorStop(0.20,'rgb(38,4,235)');
	grd.addColorStop(0.30,'rgb(1,148,227)');
	grd.addColorStop(0.36,'rgb(0,216,136)');
	grd.addColorStop(0.5,'rgb(1,183,0)');
	grd.addColorStop(0.68,'rgb(221,204,0)');
	grd.addColorStop(0.77,'rgb(255,95,0)');
	grd.addColorStop(0.84,'rgb(235,38,0)');
	grd.addColorStop(0.9,'rgb(200,12,0)');
	grd.addColorStop(1,'rgb(0,0,0)');

	return grd;
}

 function drawAbsorption(x, y, ctxS){
	ctxS.fillStyle='black';
	ctxS.fillRect(32 + x,y,2,40);
	ctxS.fillRect(61 + x,y,2,40);
	ctxS.fillRect(125 + x,y,3,40);
	ctxS.fillRect(305 + x,y,3,40);
}

function getSlider(sliderSpec,width){
 perS = (parseInt(sliderSpec.style.left)-230)/width;
 return 12*(perS - 0.5);
}

function startSpec(){
 cS = document.getElementById("spectra");
 ctxS = cS.getContext("2d");
 tx = document.getElementById('dis');
 com = document.getElementById('com');
 com2 = document.getElementById('com2');
 com3 = document.getElementById('com3');
 
 new Slider(document.getElementById('sliderSpec'), 230, 530, "Images/Slider");
 sliderSpec = document.getElementById('sliderSpec');
 lastSliderSpec = 999;
 
  requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;
 
 updateSpectra();
}

window.onload = function(){
  Maths = Math;
 $(document).ready(function() {Tipped.create('.inline');});
 startSpec();
}