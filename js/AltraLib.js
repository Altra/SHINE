//START Style Formatting

function getStyle(oElm, strCssRule){
    var strValue = "";
    if(document.defaultView && document.defaultView.getComputedStyle){
        var css = document.defaultView.getComputedStyle(oElm, null);
        strValue = css ? css.getPropertyValue(strCssRule) : null;
    }
    else if(oElm.currentStyle){
        strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
            return p1.toUpperCase();
        });
        strValue = oElm.currentStyle[strCssRule];
    }
    return strValue;
}
//END style

//START Slider
//The element should already have a style with left and top defined
//Args are: element to slide, the max and min value of the position on the slider on the webpage in pixels
//and the location and name of the sliders image file, omitting the .png 
//The dragging image is the name plus Drag
//Set it equal to a var, call per to get the decimal value of what the slide is set to
function Slider(el, minX, maxX, image){
  var xDelta = 0;
  var xStart = 0;
  
  var length = (maxX - minX)

  // remove the events
  function enddrag()
  {
    el.src = image + ".png";
    document.onmouseup = null;
    document.onmousemove = null;
  }

  // fire each time it's dragged
  function drag(e)
  {
    e = e || window.event;
    xDelta = xStart - parseInt(e.clientX);
    xStart = parseInt(e.clientX);
    newX = parseInt(el.style.left) - xDelta;
    finalX = newX > minX ? (newX < maxX ? (newX) : maxX) : minX;
    el.style.left = finalX + 'px';
  }

  // initiate the drag
  function md(e)
  {
    e = e || window.event;
    xStart = parseInt(e.clientX);
    el.style.left = parseInt(getStyle(el,'left')) + 'px';
    el.src = image + "Drag.png";
    document.onmouseup = enddrag;
    document.onmousemove = drag;
    return false;
  }

  // tie it into the element
  el.onmousedown = md;

 return  parseInt(el.style.left)/length;

}

//END Slider

//START Draggable
//The element should already have a style with left and top defined
//el is the element to be dragged (The div, img etr.)
function Draggable(el, minX, maxX, minY, maxY)
{
  var xDelta = 0, yDelta = 0;
  var xStart = 0, yStart = 0;

  // remove the events
  function enddrag()
  {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  // fire each time it's dragged
  function drag(e)
  {
    e = e || window.event;
    xDelta = xStart - parseInt(e.clientX);
    yDelta = yStart - parseInt(e.clientY);
    xStart = parseInt(e.clientX);
    yStart = parseInt(e.clientY);
    newY = parseInt(el.style.top) - yDelta;
    newX = parseInt(el.style.left) - xDelta;
    el.style.top = newY > minY ? (newY < maxY ? (newY + 'px') : maxY + 'px') : minY + 'px';
    el.style.left = newX > minX ? (newX < maxX ? (newX + 'px') : maxX + 'px') : minX + 'px';
  }

  // initiate the drag
  function md(e)
  {
    e = e || window.event;
    xStart = parseInt(e.clientX);
    yStart = parseInt(e.clientY);
    el.style.top = parseInt(getStyle(el,'top')) + 'px';
    el.style.left = parseInt(getStyle(el,'left')) + 'px';
    document.onmouseup = enddrag;
    document.onmousemove = drag;
    return false;
  }

  // tie it into the element
  el.onmousedown = md;

}
//END Draggable
