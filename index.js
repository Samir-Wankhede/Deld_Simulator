const inputtoggles = document.querySelectorAll("svg.trainer_kit_clickable_element");
const pathvariableipop = document.querySelectorAll("g.set");
const pathvariableicpins = document.querySelectorAll("g.pinsIC > svg")
const pinpathboxIC = document.querySelectorAll("g.pinsIC > svg > rect");
const pinpathbox = document.querySelectorAll("g.set > svg > path + rect");
const svgContainer = document.getElementById('svgContainer');
const pathElement = document.getElementById('pathElement');
let pathData = '';  
let pinbox;
let activepin;
let startX = 0;
let startY = 0;
let mouseX = 0;
let mouseY = 0;
const wirecolors = ["#1a2b38","#70d6ff","#ff70a6","#ff9770","#ffd670","#e9ff70"];

const container = {
    height: (svgContainer.viewBox.baseVal.height),
    width: (svgContainer.viewBox.baseVal.width),
    currheight: svgContainer.getBoundingClientRect().height,
    currwidth: svgContainer.getBoundingClientRect().width,
}

inputtoggles.forEach(element => {
  element.addEventListener('click', event => {
    var childs = element.children;
    if (childs[2].style.cy==8){
        childs[2].style.cy=24;
        childs[2].style.fill="#343a40";
        childs[3].style.cy=24;
        childs[1].style.fill="#343a40";
    }
    else{
        childs[2].style.cy=8;
        childs[2].style.fill="#ff0000";
        childs[3].style.cy=8;
        childs[1].style.fill="#ff0000";
    }
  });
});
////////function 

////////function
function onpinhover(){
    pinpathboxIC.forEach((box)=>{
        box.addEventListener('mouseover', function ICboxhover(){
            if (box.parentElement.x.baseVal.value == 120){
                mouseX = (box.parentElement.parentElement.parentElement.x.baseVal.value)+(box.parentElement.x.baseVal.value);

            }else{
                mouseX = (box.parentElement.parentElement.parentElement.x.baseVal.value)+(box.parentElement.x.baseVal.value)+ (box.parentElement.width.baseVal.value);

            }
                mouseY = ((box.parentElement.parentElement.parentElement.y.baseVal.value)+(box.parentElement.y.baseVal.value )) + (box.parentElement.height.baseVal.value)/2;///container.currheight)*container.height;
                var intermediateleft = (box.parentElement.parentElement.parentElement.x.baseVal.value)//(/container.currwidth)*container.width;
                var intermediateright = ((box.parentElement.parentElement.parentElement.x.baseVal.value) + (box.parentElement.parentElement.parentElement.width.baseVal.value));
                if (box.parentElement.x.baseVal.value == 16){
                    pathData = `M${startX} ${startY} C${startX} ${startY} ${intermediateleft} ${mouseY} ${mouseX} ${mouseY}`;
                }
                else{
                    pathData = `M${startX} ${startY} C${startX} ${startY} ${intermediateright} ${mouseY} ${mouseX} ${mouseY}`;
                }
                pathElement.setAttribute('d', pathData);
                svgContainer.removeEventListener('mousemove', drawpath);
                box.removeEventListener('mouseover',ICboxhover);
        });
        box.addEventListener('mouseout', function ICboxout(){
            svgContainer.addEventListener('mousemove', drawpath);
            box.removeEventListener('mouseout',ICboxout);
        });
    });
    
    pinpathbox.forEach((box)=>{
            box.addEventListener('mouseover', function ipopboxhover(){
            mouseX = (box.parentElement.parentElement.parentElement.x.baseVal.value + (box.parentElement.parentElement.parentElement.width.baseVal.value/2));
            // + (box.parentElement.height.baseVal.value/2)));
            if ((box.parentElement.parentElement.parentElement.y.baseVal.value == 32)){
                mouseY = (box.parentElement.parentElement.parentElement.y.baseVal.value + (box.parentElement.y.baseVal.value));
                pathData = `M${startX} ${startY} C${startX} ${startY + 28} ${mouseX} ${startY+28} ${mouseX} ${mouseY}`;
            }
            else if ( (box.parentElement.parentElement.parentElement.y.baseVal.value == 592)){
                mouseY = (box.parentElement.parentElement.parentElement.y.baseVal.value + (box.parentElement.height.baseVal.value));
                pathData = `M${startX} ${startY} C${startX} ${startY - 28} ${mouseX} ${startY - 28} ${mouseX} ${mouseY}`;
            }
            else{
                pathData = `M${startX} ${startY} C${startX} ${startY} ${startX} ${mouseY} ${mouseX} ${mouseY}`;
            }
            pathElement.setAttribute('d', pathData);
            svgContainer.removeEventListener('mousemove', drawpath);
            box.removeEventListener('mouseover', ipopboxhover);
        });
            box.addEventListener('mouseout', function ipopboxout(){
            svgContainer.addEventListener('mousemove', drawpath);
            box.removeEventListener('mouseout',ipopboxout);
        });
    });
      
}

//////////funcion
function drawpath(event){
    
    
    if ((activepin.parentElement.parentElement.parentElement.y.baseVal.value == 592)){
        startX = (activepin.parentElement.parentElement.parentElement.x.baseVal.value + (activepin.parentElement.parentElement.parentElement.width.baseVal.value/2));
        startY = (activepin.parentElement.parentElement.parentElement.y.baseVal.value + (activepin.parentElement.height.baseVal.value))
    }
    else if ((activepin.parentElement.parentElement.parentElement.y.baseVal.value == 32)){
        startX = (activepin.parentElement.parentElement.parentElement.x.baseVal.value + (activepin.parentElement.parentElement.parentElement.width.baseVal.value/2));
        startY = (activepin.parentElement.parentElement.parentElement.y.baseVal.value)+ (activepin.parentElement.y.baseVal.value);
    }
    else if(activepin.parentElement.x.baseVal.value == 16){
        startX = (activepin.parentElement.parentElement.parentElement.x.baseVal.value)+(activepin.parentElement.x.baseVal.value)+ (activepin.parentElement.width.baseVal.value);
        startY = ((activepin.parentElement.parentElement.parentElement.y.baseVal.value)+(activepin.parentElement.y.baseVal.value )) + (activepin.parentElement.height.baseVal.value)/2;///container.currheight)*container.height;
    }
    else if (activepin.parentElement.x.baseVal.value == 120){
        startX = (activepin.parentElement.parentElement.parentElement.x.baseVal.value)+(activepin.parentElement.x.baseVal.value);// - (activepin.parentElement.width.baseVal.value);
        startY = ((activepin.parentElement.parentElement.parentElement.y.baseVal.value)+(activepin.parentElement.y.baseVal.value )) + (activepin.parentElement.height.baseVal.value)/2;///container.currheight)*container.height;
    }
    mouseX = (event.clientX/container.currwidth)*container.width;
    mouseY = (event.clientY/container.currheight)*container.height;
    pathData = '';
    if (Math.abs((mouseY-startY)/(mouseX-startX))<=1.2){
        pathData = `M${startX} ${startY} C${startX} ${startY} ${startX} ${mouseY} ${mouseX} ${mouseY}`;     
    }
    else{
        pathData = `M${startX} ${startY} C${startX} ${startY} ${mouseX} ${startY} ${mouseX} ${mouseY}`;
    }
   
    pathElement.setAttribute('d', pathData);
    onpinhover();
    svgContainer.addEventListener('click', function containerclick(){
        svgContainer.removeEventListener('mousemove', drawpath);
        pathData = '';
        pathElement.setAttribute('d', pathData);
        activepin.style.fill = "#6c757d";
        svgContainer.removeEventListener('click', containerclick);
    });
  
}

pathvariableipop.forEach(ipoppins => {
    ipoppins.addEventListener('click', function ipopclick(){
    var svgchild = ipoppins.children;
    var getpinelement = svgchild[1].children;
    activepin = getpinelement[0];
    pinbox = getpinelement[1];
    activepin.style.fill = "#1a2b38";
    pathElement.style.stroke = wirecolors[Math.floor((Math.random())*6)];
    svgContainer.addEventListener('mousemove', drawpath);
    });
});

pathvariableicpins.forEach(ipoppins => {
    ipoppins.addEventListener('click', function icclick(){
    var svgchild = ipoppins.children;
    activepin = svgchild[0];
    pinbox = svgchild[1];
    activepin.style.fill = "#1a2b38";
    pathElement.style.stroke = wirecolors[Math.floor((Math.random())*6)];
    svgContainer.addEventListener('mousemove', drawpath);
    });
});

