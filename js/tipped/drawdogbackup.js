  ctx.beginPath();
  ctx.moveTo(x-s*15,y); //Starts to the right of the tail
  ctx.lineTo(x+s*7,y+s*1); //back
  ctx.lineTo(x+s*15,y-s*2); //back
  ctx.lineTo(x+s*15,y-s*19); //left side of head
  ctx.lineTo(x+s*11,y-s*25); //left ear
  ctx.lineTo(x+s*11,y-s*31); //left ear
  ctx.lineTo(x+s*6,y-s*29); //left tip of ear
  ctx.lineTo(x+s*9,y-s*35);//left ear
  ctx.lineTo(x+s*16,y-s*44);//left top of ear
  ctx.lineTo(x+s*20,y-s*44);//left top of ear
  ctx.lineTo(x+s*27,y-s*34); //left ear (middle of head)
  ctx.lineTo(x+s*39,y-s*34);//top of head
  ctx.lineTo(x+s*46,y-s*44);//right ear (middle of head)
  ctx.lineTo(x+s*50,y-s*44);//right top of ear
  ctx.lineTo(x+s*57,y-s*35);//right ear
  ctx.lineTo(x+s*60,y-s*29);//right tip of ear
  ctx.lineTo(x+s*55,y-s*31);//right ear
  ctx.lineTo(x+s*55,y-s*25);//right ear
  ctx.lineTo(x+s*51,y-s*19);//right ear
  ctx.lineTo(x+s*49,y-s*13);//right head
  ctx.lineTo(x+s*49,y+s*42);//right body
  ctx.lineTo(x+s*48,y+s*44);//front left paw
  ctx.lineTo(x+s*44,y+s*44);//front left paw pad
  ctx.lineTo(x+s*41,y+s*37);//front left paw
  ctx.lineTo(x+s*41,y+s*27);//front left leg
  ctx.lineTo(x+s*31,y+s*27);//Front (gap betwean front legs)
  ctx.lineTo(x+s*31,y+s*43);//front right leg
  ctx.lineTo(x+s*29,y+s*47);//front right leg/paw
  ctx.lineTo(x+s*26,y+s*47);//front right paw pad
  ctx.lineTo(x+s*24,y+s*42);//front right paw
  ctx.lineTo(x+s*24,y+s*27);//front right leg (left side of the leg)
  ctx.lineTo(x+s*9,y+s*23);//stomach (need to make a curve)
  ctx.lineTo(x+s*5,y+s*30);//back left leg
  ctx.lineTo(x+s*5,y+s*40);//back left leg
  ctx.lineTo(x+s*2,y+s*40);//back left paw
  ctx.lineTo(x+s*0,y+s*34);//back left leg
  ctx.lineTo(x+s*0,y+s*25);//back left leg
  ctx.lineTo(x+s*1,y+s*20);//back left leg
  ctx.lineTo(x+s*-2,y+s*20);//gap betwean back legs
   ctx.lineTo(x+s*-2,y+s*24);//back right leg
  ctx.lineTo(x+s*-8,y+s*31);//back right leg
  ctx.lineTo(x+s*-8,y+s*41);//back right leg
  ctx.lineTo(x+s*-9,y+s*43);//back right paw
  ctx.lineTo(x+s*-13,y+s*43);//back right paw pad
  ctx.lineTo(x+s*-15,y+s*36);//back right paw
  ctx.lineTo(x+s*-15,y+s*1);//
  
  
  
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'black';
  ctx.stroke();