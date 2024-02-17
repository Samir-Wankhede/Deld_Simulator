const inputtoggles = document.querySelectorAll("svg.trainer_kit_clickable_element");
const pathvariableipop = document.querySelectorAll("g.set");
const pathvariableicpins = document.querySelectorAll("g.pinsIC > svg")
const pinpathboxIC = document.querySelectorAll("g.pinsIC > svg > rect");
const pinpathbox = document.querySelectorAll("g.set > svg > path + rect");
const svgContainer = document.getElementById('svgContainer');
const pathElement = document.getElementById('pathElement');
const pathcollection = document.getElementById('pathcollection');
//const wire = document.querySelectorAll('path.trainer_kit_clickable_element');
let pathData = '';  
let pinbox;
let activepin;
let startX = 0;
let startY = 0;
let mouseX = 0;
let mouseY = 0;
let boxhover_active = true;
let path_is_being_drawn = false;
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

/////////
function wireover(event){
    event.target.setAttribute('stroke-width',8);
}
function wireout(event){
    event.target.setAttribute('stroke-width',2);
} 
//////////
function containerclick(){
    svgContainer.removeEventListener('mousemove', drawpath);
    pathData = '';
    pathElement.setAttribute('d', pathData);
    activepin.style.fill = "#6c757d";
    boxhover_active = false;
    path_is_being_drawn = false;
    svgContainer.removeEventListener('click', containerclick);
}

////////function
function onpinhover(){
    pinpathboxIC.forEach((box)=>{
        box.addEventListener('mouseover', function ICboxhover(){
            if (boxhover_active){
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
                    svgContainer.removeEventListener('click', containerclick);
                    box.addEventListener('click',function ICclick(){
                        if (pinbox !== box){
                        //console.log(box);
                        const pathe = document.createElementNS('http://www.w3.org/2000/svg',"path");  
                        pathcollection.appendChild(pathe);
                        pathe.setAttribute('d',pathData);
                        pathe.setAttribute('stroke',pathElement.style.stroke) ;
                        pathe.setAttribute('stroke-width',2);
                        pathe.setAttribute('stroke-linejoin','round');
                        pathe.classList.add('trainer_kit_clickable_element');
                        pathe.addEventListener('mouseover', wireover);
                        pathe.addEventListener('mouseout', wireout);
                        pathData = '';
                        pathElement.setAttribute('d', pathData);
                        activepin.style.fill = "#6c757d";
                        boxhover_active = false;
                        path_is_being_drawn = true;
                        }else{
                            pathData = '';
                            pathElement.setAttribute('d', pathData);
                            activepin.style.fill = "#6c757d";
                            boxhover_active = false;
                            path_is_being_drawn = true; 
                        }
                        
                        box.removeEventListener('click',ICclick);
                    });
            }
            else{
                box.removeEventListener('mouseover',ICboxhover);
            }
                
        });
        box.addEventListener('mouseout', function ICboxout(){
            if (boxhover_active){
                svgContainer.addEventListener('mousemove', drawpath);
            }
            else{
                box.removeEventListener('mouseout',ICboxout);
            }
        });
    });
    
    pinpathbox.forEach((box)=>{
            box.addEventListener('mouseover', function ipopboxhover(){
                if (boxhover_active){
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
                    svgContainer.removeEventListener('click', containerclick);
                    box.addEventListener('click',function ICclick(){
                        //console.log(box);
                        if (pinbox !== box){
                        const pathe = document.createElementNS('http://www.w3.org/2000/svg',"path");
                        pathcollection.appendChild(pathe);
                        pathe.setAttribute('d',pathData);
                        pathe.setAttribute('stroke',pathElement.style.stroke) ;
                        pathe.setAttribute('stroke-width',2);
                        pathe.setAttribute('stroke-linejoin','round');
                        pathe.classList.add('trainer_kit_clickable_element');
                        pathe.addEventListener('mouseover', wireover);
                        pathe.addEventListener('mouseout', wireout);
                        pathData = '';
                        pathElement.setAttribute('d', pathData);
                        activepin.style.fill = "#6c757d";
                        boxhover_active = false;
                        path_is_being_drawn = true;
                        }else{
                            pathData = '';
                        pathElement.setAttribute('d', pathData);
                        activepin.style.fill = "#6c757d";
                        boxhover_active = false;
                        path_is_being_drawn = true;
                        }
                        box.removeEventListener('click',ICclick);
                    });
                }
                else{
                    box.removeEventListener('mouseover', ipopboxhover);
                }

            
        });
            box.addEventListener('mouseout', function ipopboxout(){
                if (boxhover_active){
                    svgContainer.addEventListener('mousemove', drawpath);
                }else{
                    box.removeEventListener('mouseout',ipopboxout);
                }
        });
    });
      
}

//////////funcion
function drawpath(event){ 
    if ((activepin.parentElement.parentElement.parentElement.y.baseVal.value == 592)){
        startX = (activepin.parentElement.parentElement.parentElement.x.baseVal.value + (activepin.parentElement.parentElement.parentElement.width.baseVal.value/2));
        startY = (activepin.parentElement.parentElement.parentElement.y.baseVal.value + (activepin.parentElement.height.baseVal.value/2))

    }
    else if ((activepin.parentElement.parentElement.parentElement.y.baseVal.value == 32)){
        startX = (activepin.parentElement.parentElement.parentElement.x.baseVal.value + (activepin.parentElement.parentElement.parentElement.width.baseVal.value/2));
        startY = (activepin.parentElement.parentElement.parentElement.y.baseVal.value)+ (activepin.parentElement.y.baseVal.value)+(activepin.parentElement.height.baseVal.value/2);
    }
    else if(activepin.parentElement.x.baseVal.value == 16){
        startX = (activepin.parentElement.parentElement.parentElement.x.baseVal.value)+(activepin.parentElement.x.baseVal.value)+ (activepin.parentElement.width.baseVal.value/2);
        startY = ((activepin.parentElement.parentElement.parentElement.y.baseVal.value)+(activepin.parentElement.y.baseVal.value )) + (activepin.parentElement.height.baseVal.value)/2;///container.currheight)*container.height;
    }
    else if (activepin.parentElement.x.baseVal.value == 120){
        startX = (activepin.parentElement.parentElement.parentElement.x.baseVal.value)+(activepin.parentElement.x.baseVal.value)+ (activepin.parentElement.width.baseVal.value/2);// - (activepin.parentElement.width.baseVal.value);
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
    svgContainer.addEventListener('click',containerclick);
}

pathvariableipop.forEach(ipoppins => {
    ipoppins.addEventListener('click', function ipopclick(){
        if (!path_is_being_drawn){
            var svgchild = ipoppins.children;
            var getpinelement = svgchild[1].children;
            activepin = getpinelement[0];
            pinbox = getpinelement[1];
            //console.log(pinbox);
            activepin.style.fill = "#1a2b38";
            pathElement.style.stroke = wirecolors[Math.floor((Math.random())*6)];
            svgContainer.addEventListener('mousemove', drawpath);
            boxhover_active = true;
            onpinhover();
            //svgContainer.addEventListener('click',containerclick);
            //ipoppins.removeEventListener('click',ipopclick);
        }
        else{
            path_is_being_drawn = false;
        }
    });
});

pathvariableicpins.forEach(ipoppins => {
    ipoppins.addEventListener('click', function icclick(){
    if(!path_is_being_drawn){
        var svgchild = ipoppins.children;
        activepin = svgchild[0];
        pinbox = svgchild[1];
        //console.log(pinbox);
        activepin.style.fill = "#1a2b38";
        pathElement.style.stroke = wirecolors[Math.floor((Math.random())*6)];
        svgContainer.addEventListener('mousemove', drawpath);
        boxhover_active = true;
        path_is_being_drawn = true;
        onpinhover();
        //svgContainer.addEventListener('click',containerclick);
        //ipoppins.removeEventListener('click',icclick);
    }
    else{
        path_is_being_drawn = false;
    }

    });
});

