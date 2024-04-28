const inputtoggles = document.querySelectorAll("svg.trainer_kit_clickable_element");
const pathvariableipop = document.querySelectorAll("g.set");
const pathvariableicpins = document.querySelectorAll("g.pinsIC > svg")
const pinpathboxIC = document.querySelectorAll("g.pinsIC > svg > rect");
const pinpathbox = document.querySelectorAll("g.set > svg > path + rect");
const svgContainer = document.getElementById('svgContainer');
const pathElement = document.getElementById('pathElement');
const pathcollection = document.getElementById('pathcollection');
const powerButton = document.querySelector("g.IC+svg");
const inputpins = document.querySelectorAll("g.inputpins > svg > g.set > svg > path");
const outputpins = document.querySelectorAll("g.outputpins > svg > g.set > svg > path");
const ic1 = document.querySelectorAll("g.ic1 > svg > path");
const ic2 = document.querySelectorAll("g.ic2 > svg > path");
console.log(pathvariableicpins);
console.log(inputpins);
console.log(outputpins);
console.log(ic1);
console.log(powerButton)
//console.log(inputtoggles)
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

var component = new Map();
let newcomp;

powerButton.flag = 0;

inputpins.forEach(pin => {
    pin.status=0;
})

ic1.forEach(pin => {
    pin.status=0;
})

ic2.forEach(pin => {
    pin.status = 0;
})

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
          element.parentElement.children[2].children[1].children[0].status=0;
          console.log(element.parentElement.children[2].children[1].children[0]);
      }
      else{
          childs[2].style.cy=8;
          childs[2].style.fill="#ff0000";
          childs[3].style.cy=8;
          childs[1].style.fill="#ff0000";
          element.parentElement.children[2].children[1].children[0].status=1;
          console.log(element.parentElement.children[2].children[1].children[0]);
      }
      if(powerButton.flag==1){
        //for(var i=0;i<5;i++){
            ic7408();
            //ic7404();
        //}
        
      }
      
    });
  });
////////
function ICclick(){
    //console.log(box);
    if (pinbox !== this){
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
    this.removeEventListener('click',ICclick);
}

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
                    box.addEventListener('click',ICclick);
            }
            else{
                box.removeEventListener('mouseover',ICboxhover);
            }
                
        });
        box.addEventListener('mouseout', function ICboxout(){
            if (boxhover_active){
                svgContainer.addEventListener('mousemove', drawpath);
                box.removeEventListener('click',ICclick);
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
                    box.addEventListener('click',ICclick);
                }
                else{
                    box.removeEventListener('mouseover', ipopboxhover);
                }

            
        });
            box.addEventListener('mouseout', function ipopboxout(){
                if (boxhover_active){
                    svgContainer.addEventListener('mousemove', drawpath);
                    box.removeEventListener('click',ICclick);
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
        startY = (activepin.parentElement.parentElement.parentElement.y.baseVal.value + (activepin.parentElement.height.baseVal.value));

    }
    else if ((activepin.parentElement.parentElement.parentElement.y.baseVal.value == 32)){
        startX = (activepin.parentElement.parentElement.parentElement.x.baseVal.value + (activepin.parentElement.parentElement.parentElement.width.baseVal.value/2));
        startY = (activepin.parentElement.parentElement.parentElement.y.baseVal.value)+ (activepin.parentElement.y.baseVal.value);//+(activepin.parentElement.height.baseVal.value);
    }
    else if(activepin.parentElement.x.baseVal.value == 16){
        startX = (activepin.parentElement.parentElement.parentElement.x.baseVal.value)+(activepin.parentElement.x.baseVal.value)+ (activepin.parentElement.width.baseVal.value);
        startY = ((activepin.parentElement.parentElement.parentElement.y.baseVal.value)+(activepin.parentElement.y.baseVal.value )) + (activepin.parentElement.height.baseVal.value)/2;///container.currheight)*container.height;
    }
    else if (activepin.parentElement.x.baseVal.value == 120){
        startX = (activepin.parentElement.parentElement.parentElement.x.baseVal.value)+(activepin.parentElement.x.baseVal.value);//+ (activepin.parentElement.width.baseVal.value);// - (activepin.parentElement.width.baseVal.value);
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
        //var svgchild = ipoppins.children;
        //var getpinelement = svgchild[1].children;
        newcomp={};
        //activepin = getpinelement[0];
        //pinbox = getpinelement[1];
        //newcomp = activepin;
        if (!path_is_being_drawn){
           
            var svgchild = ipoppins.children;
            var getpinelement = svgchild[1].children;
            //newcomp={};
            activepin = getpinelement[0];
            pinbox = getpinelement[1];
            newcomp = activepin;            
            console.log(pinbox);
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
    var svgchild = ipoppins.children;
    activepin = svgchild[0];
    pinbox = svgchild[1];
    component.set(activepin,newcomp);
    activepin.flag="1";
    console.log(component);
    if(!path_is_being_drawn){
        var svgchild = ipoppins.children;
        activepin = svgchild[0];
        pinbox = svgchild[1];
        component.set(activepin,newcomp);
        activepin.flag="1";
        console.log(component);
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

function opc(ip,op){
    
    if(ip.status==0){
        op.parentElement.parentElement.children[0].children[1].style.fill="#343a40";
    }else{
        op.parentElement.parentElement.children[0].children[1].style.fill="#ff0000";
    }
}

function not(ip1,op){
    var x = ip1.status;
    var res;
    if(x==0){
        res=1;
    }else{
        res=0;
    }
    op.status = res;
}

function and(ip1,ip2,op){    
    var x = ip1.status;
    var y = ip2.status;
    console.log(x);
    console.log(y);
    var res = x & y;
    console.log(res);
    op.status = res;
}
function ic7404(){
    /*const mapIterator = component.values();
    let m=0;
    while(m<component.size){
        let c=0;
        for(var i=0;i<15;i++){
            if(mapIterator.next().value===inputpins[i]){
                c=1;
            }
        }
        if(c===1){
            incomp["icpin"].setAttribute("data-status",`${incomp["ipop"].getAttribute("data-status")}`)
        }
    }*/
    //if(ic1[0].flag==="1"){
        not(component.get(ic2[0]),ic2[2]);
        opc(ic2[2],component.get(ic2[2]));
    //}
    //if(ic1[4].flag==="1"){
        /*not(component.get(ic1[4]),ic1[6]);
        opc(ic1[6],component.get(ic1[6]));
    //}
    
    //if(ic1[8].flag==="1"){
        not(component.get(ic1[8]),ic1[10]);
        opc(ic1[10],component.get(ic1[10]));
    //}
    
    //if(ic1[3].flag==="1"){
        not(component.get(ic1[3]),ic1[5]);
        opc(ic1[5],component.get(ic1[5]));
    //}
    
    //if(ic1[7].flag==="1"){
        not(component.get(ic1[7]),ic1[9]);
        opc(ic1[9],component.get(ic1[9]));
    //}
    
    //if(ic1[11].flag==="1"){
        not(component.get(ic1[11]),ic1[13]);
        opc(ic1[13],component.get(ic1[13]));
    //}*/
    
}

function ic7408(){
    /*const mapIterator = component.values();
    let m=0;
    while(m<component.size){
        let c=0;
        for(var i=0;i<15;i++){
            if(mapIterator.next().value===inputpins[i]){
                c=1;
            }
        }
        if(c===1){
            incomp["icpin"].setAttribute("data-status",`${incomp["ipop"].getAttribute("data-status")}`)
        }
    }*/
    //if(ic1[0].flag==="1"){
        and(component.get(ic1[0]),component.get(ic1[2]),ic1[4]);
        opc(ic1[4],component.get(ic1[4]));
    //}
    //if(ic1[4].flag==="1"){
        /*and(component.get(ic1[6]),ic1[8],ic1[10]);
        opc(ic1[10],component.get(ic1[10]));
    //}
    
    //if(ic1[8].flag==="1"){
        and(component.get(ic1[3]),ic1[5],ic1[7]);
        opc(ic1[7],component.get(ic1[7]));
    //}
    
    //if(ic1[3].flag==="1"){
        and(component.get(ic1[9]),ic1[11],ic1[13]);
        opc(ic1[13],component.get(ic1[13]));
    //}
    
    /*if(ic1[7].flag==="1"){
        not(component.get(ic1[7]),ic1[9]);
        opc(ic1[9],component.get(ic1[9]));
    }
    
    if(ic1[11].flag==="1"){
        not(component.get(ic1[11]),ic1[13]);
        opc(ic1[13],component.get(ic1[13]));
    }*/
    
}

powerButton.addEventListener('click',function run(){
    if(powerButton.flag == 0){
        powerButton.flag = 1;
        //for(var i=0;i<5;i++){
           ic7408(); 
           //ic7404();
        //}
        
        
    }
    else{
        powerButton.flag = 0;
    }
})



