
function drawGraph(){

ctxD.strokeStyle =  "#00f";
ctxD.lineWidth = 4;

for(var z = 0; z < waves.length; z++){
 waves[z].r += waveSpeed;
 ctxD.beginPath();
 ctxD.arc(200, 200, waves[z].r, 0, 2 * Math.PI);
 ctxD.stroke();
}
}

function addWave(){
 waves.push({ox: 200, r: 10});
}

function removeWave(){
 waves.shift();
}

function updateSound(){

 useFreq = (1/freq)*200000;
 ctxD.clearRect(0, 0, cD.width, cD.height);
 if (waveSpawnTime > useFreq) {
  addWave();
  waveSpawnTime = 0;
  } else {
  waveSpawnTime++;
 }
 if(waves.length > 1){console.log(waves[0].r );}
 if (waves.length > 1){
   if(waves[0].r > 275) {
  removeWave();
 }}
 
 drawGraph();
 ctxD.drawImage(soyuz,150,170);
 
  dcom.innerHTML =  freq.toExponential(2).replace('e+','x10^') + "Hz = ";
  d2com.innerHTML =  (343/freq).toExponential(2).replace('e+','x10^').replace('e-','x10^-') + "m"; //Wavelength from div by speed of sound
  if(freq>19900){
  d3com.innerHTML = "This sound wave is the maximum frequency that humans can hear at 20,000Hz. We call sound waves with frequencies above this ultrasound. ";
  } else if(freq==1000) { d3com.innerHTML = "Humans cannot hear frequencies below 20Hz but this 1000Hz would still sound deep (It has a low pitch)."; }
 else { d3com.innerHTML = "The sound wave is drawn to a scale as it would be hard to see something that oscillates over 1000 times per second.";}
 t++;
 updateOs();
 requestAnimationFrame(updateSound);
}

function updateOs(){
   ctxW.clearRect(0, 0, cD.width, cD.height);  
    
 Vp=1; //Max Amplitue
 fo=freq //frequancy in Hz
 phase=-t;
 Vmax=2;
 Tmax=0.0005;
 N=300;
     
  // define origin at plot center
 var axes={};
 axes.x0 = 0.5 + 0.5*cW.width;  // x0, y0 place plot origin in middle of cW
 axes.y0 = 0.5 + 0.5*cW.height;
 
 // draw axes
 showAxes(ctxW,axes);
 
 var x=new Array(), y=new Array();  // x,y plotting variables
 var dt, tstart, tstop;             // time variables
 
 // define plot paramaters
 tstart=-Tmax;
 tstop=Tmax;
 dt = (tstop - tstart) / (N-1);				// time increment over N points
 axes.xscale = (cW.width)/(2*Tmax); 	// x pix per s
 axes.yscale = (cW.height)/(2*Vmax);    // y pix per V
 axes.N = N;
 
 
  // create function 
 for ( i=0; i<N; i++) {
 	x[i]=tstart + i*dt;
 	y[i] = Vp*Math.sin(2*3.1415*fo*x[i] + phase*3.1415/180) ;
 }
 
 // display variables for debug, remove /* and */
 /*
 alert(   "N=" + N + "\n"
        + "dt=" + dt + "\n"
        + "tstart=" + tstart + "\n"
        + "tstop=" + tstop + "\n"    
        + "fo=" + fo + "\n"  
        + "x[50]=" + x[50] + "\n"        );
*/
 
 // plot function
 GraphArray(ctxW,axes,x,y,"rgb(0,0,256)",2); 
 
 }
 
function GraphArray (ctxW,axes,x,y,color,thick) {

 var i, x0, y0, xscale, yscale, xp, yp;
  
 x0=axes.x0;  y0=axes.y0;
 xscale=axes.xscale;  yscale=axes.yscale;

 ctxW.beginPath();
 ctxW.lineWidth = thick;
 ctxW.strokeStyle = color;

 for (i=0; i<axes.N; i++) {
 	// translate actual x,y to plot xp,yp
 	xp = x0 + x[i]*xscale;
 	yp = y0 - y[i]*yscale;
 	
 	// draw ine to next point
	if (i==0) ctxW.moveTo( xp, yp );
	else      ctxW.lineTo( xp, yp );
 }
 
 ctxW.stroke();
}

function showAxes(ctx,axes) {
 var x0=axes.x0, w=cW.width;
 var y0=axes.y0, h=cW.height;
 
 ctxW.beginPath();
 ctxW.strokeStyle = "rgb(128,128,128)"; 
 ctxW.lineWidth = 1;
 ctxW.moveTo(0,y0);    ctxW.lineTo(w,y0);  // X axis
 ctxW.moveTo(x0,0);    ctxW.lineTo(x0,h);  // Y axis
 ctxW.stroke();
 }

function startSound(){
 waves = [];
 t = 0;
 waveSpawnTime = 30;
 waveRemoveDelayTime = 0;
 removeWaves = false;
 waveSpeed = 2;
 soyuz = new Image();
 soyuz.src = 'Images/Soyuz.png';

 cD = document.getElementById("speaker");
 ctxD = cD.getContext("2d");
 cW = document.getElementById("wave");
ctxW = cW.getContext("2d");
 dcom = document.getElementById('dcom');
 d2com = document.getElementById('d2com');
 d3com = document.getElementById('d3com');

 
 updateSound();
}
window.onload = function(){
  Maths = Math;
 $(document).ready(function() {Tipped.create('.inline');});
 requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;
  freq=0;
  new Dragdealer('simple-slider', {animationCallback: function(x,y){
  x = x*20000;
  if (x < 1000) {x = 1000;}
  freq = x;
 }});
 startSound();
}