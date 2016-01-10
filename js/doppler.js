
function drawGraph(){

ctxD.strokeStyle =  "#00f";
ctxD.lineWidth = 4;

for(var z = 0; z < waves.length; z++){
 waves[z].r += waveSpeed;
 ctxD.beginPath();
 ctxD.arc(waves[z].ox, 200, waves[z].r, 0, 2 * Math.PI);
 ctxD.stroke();
}
}

function addWave(){
 waves.push({ox: objPos, r: 10});
}

function removeWave(){
 waves.shift();
}

function updateDoppler(){

 objectSpeed = getSpeed(slider,190);
 objPos += objectSpeed;

 ctxD.clearRect(0, 0, cD.width, cD.height);

 if (waveSpawnTime > 35) {
  addWave();
  waveSpawnTime = 0;
  if(removeWaves){
   removeWave();
  }
  } else {
  waveSpawnTime++;
 }

 if (waveRemoveDelayTime > 600) {
  removeWaves = true;
 } else {
  waveRemoveDelayTime++;
 }
 
 drawGraph();
 ctxD.drawImage(soyuz,objPos-55,170);

 resetText();

 if(objectSpeed==0){
  dcom.innerHTML = 'The sound waves will be evenly spaced when the object is not moving.';
 } else if (objectSpeed > 1.2){
  dcom.innerHTML = 'In front of the object the waves are compressed so the wavelength is shorter, the frequency is higher and for sound waves it will have a higher pitch. Behind the object the waves are stretched so the wavelength is longer, the frequency is lower and it would have a lower pitch.';
 } else {
  dcom.innerHTML = 'At low speeds the effect is not as noticeable. The object is always emitting the wave at the same frequency, it just appears different to the observer because the object is moving.';
 }

 t++;
 if(objPos>1200){
  startDop();
  rtxt.style.opacity = '1';
  return;
 }
  requestAnimationFrame(updateDoppler);
}

function getSpeed(slider,width){
 per = (parseInt(slider.style.left)-200)/width;
 return per * 1.7;
}

function resetText(){
 if (rtxt.style.opacity>0){
  rtxt.style.opacity = rtxt.style.opacity - 0.01;
 }
}

function startDop(){
 waves = [];
 t = 0;
 objPos = 30; //also the starting wave pos
 waveSpawnTime = 30;
 waveRemoveDelayTime = 0;
 removeWaves = false;
 waveSpeed = 2;
 objectSpeed = 0;
 soyuz = new Image();
 soyuz.src = 'Images/Soyuz.png';

 cD = document.getElementById("graph");
 ctxD = cD.getContext("2d");
 dcom = document.getElementById('dcom');
 d2com = document.getElementById('d2com');
 rtxt = document.getElementById('reset');

 new Slider(document.getElementById('slider'), 200, 390, "Images/Slider");
 slider = document.getElementById('slider');
 
 updateDoppler();
}
window.onload = function(){
  Maths = Math;
 $(document).ready(function() {Tipped.create('.inline');});
 requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;
 startDop();
}