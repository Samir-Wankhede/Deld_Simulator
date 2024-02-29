const inputtoggles = document.querySelectorAll("svg.trainer_kit_clickable_element");
const pathvariableipop = document.querySelectorAll("g.set");
const pathvariableicpins = document.querySelectorAll("g.pinsIC > svg")
const pinpathboxIC = document.querySelectorAll("g.pinsIC > svg > rect");
const pinpathbox = document.querySelectorAll("g.set > svg > path + rect");
const svgContainer = document.getElementById('svgContainer');
const pathElement = document.getElementById('pathElement');
const inputpins = document.querySelectorAll("g.inputpins > svg > g.set > svg > path");
const outputpins = document.querySelectorAll("g.outputpins > svg > g.set > svg > path");
const ic1 = document.querySelectorAll("g.ic1 > svg > path")
console.log(pathvariableicpins);
console.log(inputpins);
console.log(outputpins);
console.log(ic1);
let pathData = '';  
let pinbox;
let activepin;
let startX = 0;
let startY = 0;
let mouseX = 0;
let mouseY = 0;
const wirecolors = ["#1a2b38","#70d6ff","#ff70a6","#ff9770","#ffd670","#e9ff70"];
var component = new Map();
let newcomp;

inputpins.forEach(pin => {
    pin.status="0";
})

ic1.forEach(pin => {
    pin.flag="0";
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
        element.parentElement.children[2].children[1].children[0].status="0";
    }
    else{
        childs[2].style.cy=8;
        childs[2].style.fill="#ff0000";
        childs[3].style.cy=8;
        childs[1].style.fill="#ff0000";
        element.parentElement.children[2].children[1].children[0].status="1";
    }
    ic7404();
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
    newcomp={};
    var svgchild = ipoppins.children;
    var getpinelement = svgchild[1].children;
    activepin = getpinelement[0];
    pinbox = getpinelement[1];
    newcomp = activepin;
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
    component.set(activepin,newcomp);
    activepin.flag="1";
    console.log(component);
    activepin.style.fill = "#1a2b38";
    pathElement.style.stroke = wirecolors[Math.floor((Math.random())*6)];
    svgContainer.addEventListener('mousemove', drawpath);
    });
});

function opc(ip,op){
    
    if(ip.status==="0"){
        op.parentElement.parentElement.children[0].children[1].style.fill="#343a40";
    }else{
        op.parentElement.parentElement.children[0].children[1].style.fill="#ff0000";
    }
}

function not(ip,op){    
    if(ip.status==="1"){
        op.status="0";
    }else{
        op.status="1";
    }
    
    
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
    if(ic1[0].flag==="1"){
        not(component.get(ic1[0]),ic1[2]);
        opc(ic1[2],component.get(ic1[2]));
    }
    if(ic1[4].flag==="1"){
        not(component.get(ic1[4]),ic1[6]);
        opc(ic1[6],component.get(ic1[6]));
    }
    
    if(ic1[8].flag==="1"){
        not(component.get(ic1[8]),ic1[10]);
        opc(ic1[10],component.get(ic1[10]));
    }
    
    if(ic1[3].flag==="1"){
        not(component.get(ic1[3]),ic1[5]);
        opc(ic1[5],component.get(ic1[5]));
    }
    
    if(ic1[7].flag==="1"){
        not(component.get(ic1[7]),ic1[9]);
        opc(ic1[9],component.get(ic1[9]));
    }
    
    if(ic1[11].flag==="1"){
        not(component.get(ic1[11]),ic1[13]);
        opc(ic1[13],component.get(ic1[13]));
    }
    
}
