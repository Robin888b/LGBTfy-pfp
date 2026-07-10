console.log("Hello World²");

//sectionCrop

const cropCanvas = document.getElementById("cropCanvas");
if (!cropCanvas.getContext){
    alert("Your Browser does not eem to support Canvas\nThis website cannot work without Canvas");
}
const cropCtx = cropCanvas.getContext("2d");

const cropRangeZoom = document.getElementById("cropZoomRange");
const cropInputZoom = document.getElementById("cropZoomInput");
const cropButtonValidate = document.getElementById("cropValidate")
let cropSelector = { x: 0, y:0, zoom:1, maxSize:0, img: new Image()}
cropSelector["img"].src = "src/svg/selectCrop.svg"
cropInputZoom.value = 1; cropRangeZoom.value = 1;


let cropImageBorderLeft, cropImageBorderTop;




// EVENTS           EVENTS          EVENTS          EVENTS          EVENTS
cropInputZoom.addEventListener("input", ()=>{
    cropRangeZoom.value = cropInputZoom.value;
    cropSelector["zoom"] = (cropInputZoom.value*2/100)+1

    inptZoom()
})

cropRangeZoom.addEventListener("input", ()=> {
    cropInputZoom.value = cropRangeZoom.value;
    cropSelector["zoom"] = (cropInputZoom.value*2/100)+1

    inptZoom()
})





function inptZoom(){
    if ((cropSelector["x"])< cropImageBorderLeft+(cropSelector["maxSize"]/2/(cropSelector["zoom"]))){
        cropSelector["x"] = cropImageBorderLeft+(cropSelector["maxSize"]/2/cropSelector["zoom"])
    } else if ((cropSelector["x"]+(cropSelector["maxSize"]/2/(cropSelector["zoom"])))> cropCanvas.width){
        cropSelector["x"] = cropCanvas.width - (cropSelector["maxSize"]/2/(cropSelector["zoom"]))
    }

    if(cropSelector["y"]< cropImageBorderTop+(cropSelector["maxSize"]/2/cropSelector["zoom"])){
        cropSelector["y"] = cropImageBorderTop+(cropSelector["maxSize"]/2/cropSelector["zoom"])
    } else if ((cropSelector["y"]+(cropSelector["maxSize"]/2/cropSelector["zoom"]))> (cropCanvas.height)){
        cropSelector["y"] = cropCanvas.height - (cropSelector["maxSize"]/2/cropSelector["zoom"])
    }

    cropPrintImg()
}




let isDragging = false;
let startX = 0, startY = 0;
function mouseDown(clientX, clientY){
    startX = parseInt((clientX-cropCanvas.offsetLeft)*cropCanvas.width/cropCanvas.offsetWidth)
    startY = parseInt((clientY-cropCanvas.offsetTop)*cropCanvas.height/cropCanvas.offsetHeight)
    
    if(isMouseOnSelector(startX, startY)){
        isDragging = true;
        //console.log("x : "+ startX+" | y : "+startY)
    }
}
cropCanvas.onmousedown = event => {
    event.preventDefault();
    mouseDown(event.clientX, event.clientY)
}
cropCanvas.ontouchstart = event => {
    event.preventDefault();
    mouseDown(event.touches[0]["pageX"], event.touches[0]["pageY"])

}





function mouseUp(event){
    if (!isDragging){
        return;
    }
    event.preventDefault();
    isDragging = false
}
document.onmouseup = event => {mouseUp(event);}
document.onmouseleave = event => {mouseUp(event);}
document.ontouchend = event => {mouseUp(event);}
document.ontouchcancel = event => {mouseUp(event);}





function mouseMove(clientX, clientY){
    if(!isDragging){
        return;
    }
    let mouseX = parseInt((clientX-cropCanvas.offsetLeft)*cropCanvas.width/cropCanvas.offsetWidth)
    let mouseY = parseInt((clientY-cropCanvas.offsetTop)*cropCanvas.height/cropCanvas.offsetHeight)
    
    let dx = mouseX - startX
    let dy = mouseY - startY


    if ((cropSelector["x"]+dx)< (cropSelector["maxSize"]/2/cropSelector["zoom"])){
        cropSelector["x"] = (cropSelector["maxSize"]/2/cropSelector["zoom"])
    } else if ((cropSelector["x"]+dx+(cropSelector["maxSize"]/2/cropSelector["zoom"])) > cropCanvas.width){

        cropSelector["x"] = cropCanvas.width - ((cropSelector["maxSize"]/2/cropSelector["zoom"]))

    } else {
        cropSelector["x"] += dx
    }
    

    if((cropSelector["y"]+dy)< (cropSelector["maxSize"]/2/cropSelector["zoom"])){
        cropSelector["y"] = (cropSelector["maxSize"]/2/cropSelector["zoom"])
    } else if ((cropSelector["y"]+dy+(cropSelector["maxSize"]/2/cropSelector["zoom"]))> cropCanvas.height){
        cropSelector["y"] = cropCanvas.height - (cropSelector["maxSize"]/2/cropSelector["zoom"])
    } else {
        cropSelector["y"] += dy
    }
    //console.log("dx : "+dx+" | dy : "+dy)
    cropPrintImg()

    startX = mouseX; startY = mouseY
}
document.onmousemove = event => {
    event.preventDefault();
    mouseMove(event.clientX, event.clientY)
}
document.ontouchmove = event => {
    mouseMove(event.touches[0]["pageX"],event.touches[0]["pageY"])
}





function mouseScrool(deltaY){
    let dy = deltaY* 0.01;
    if ((cropSelector["zoom"] + dy)<1){
        cropSelector["zoom"] = 1
    }else if((cropSelector["zoom"] + dy)>3){
        cropSelector["zoom"]=3
    } else {
        cropSelector["zoom"] += dy
    }
    if ((cropSelector["x"])< cropImageBorderLeft+(cropSelector["maxSize"]/2/(cropSelector["zoom"]))){
        cropSelector["x"] = cropImageBorderLeft+(cropSelector["maxSize"]/2/cropSelector["zoom"])
    } else if ((cropSelector["x"]+(cropSelector["maxSize"]/2/(cropSelector["zoom"])))> cropCanvas.width){
        cropSelector["x"] = cropCanvas.width - (cropSelector["maxSize"]/2/(cropSelector["zoom"]))
    }
    if((cropSelector["y"])< cropImageBorderTop+(cropSelector["maxSize"]/2/cropSelector["zoom"])){
        cropSelector["y"] = cropImageBorderTop+(cropSelector["maxSize"]/2/cropSelector["zoom"])
    } else if ((cropSelector["y"]+(cropSelector["maxSize"]/2/cropSelector["zoom"]))> (canvasSize-cropImageBorderTop)){
        cropSelector["y"] = canvasSize - (cropImageBorderTop + (cropSelector["maxSize"]/2/cropSelector["zoom"]))
    }
    

    cropInputZoom.value = (cropSelector["zoom"]-1)*100/2
    cropRangeZoom.value = (cropSelector["zoom"]-1)*100/2
    cropPrintImg()
}
cropCanvas.onwheel = event => {
    event.preventDefault();
    mouseScrool(event.deltaY);
}







function isMouseOnSelector(x, y){
    let selectorTop = cropSelector["y"] - (cropSelector["maxSize"]/cropSelector["zoom"]/2)
    let selectorBottom = cropSelector["y"]+(cropSelector["maxSize"]/2/cropSelector["zoom"])
    let selectorLeft = cropSelector["x"]-(cropSelector["maxSize"]/2/cropSelector["zoom"])
    let selectorRight = cropSelector["x"]+(cropSelector["maxSize"]/2/cropSelector["zoom"])
    //cropCtx.fillRect(selectorTop, selectorLeft, selectorBottom-selectorTop, selectorRight-selectorLeft)
    //cropCtx.fillRect(x-20, y-20, 20, 20)
    

    //console.log("x : "+ x.toString()+ " | y : "+ y.toString())
    //console.log("---------")
    if (x > selectorLeft && x < selectorRight && y > selectorTop && y < selectorBottom){
        
        
        return true;
    } else {
        return false;
    }

}









// LOAD
async function cropLoad(){
    cropSection.classList.remove("dpNone");
    canvasSize = Math.max(tmpImg.height, tmpImg.width);
    cropCtx.canvas.height = tmpImg.height;
    cropCtx.canvas.width = tmpImg.width;
    cropCtx.clearRect(0, 0,
    cropCanvas.width, cropCanvas.height);
    cropSelector["x"] = cropCanvas.width/2
    cropSelector["y"] = cropCanvas.height/2
    cropSelector["maxSize"] = Math.min(tmpImg.height, tmpImg.width)

    cropPrintImg()
}




async function cropPrintImg(){
    cropCtx.clearRect(0, 0,
    cropCanvas.width, cropCanvas.height);
    let imgHeight = imgWidth = canvasSize;
    
    if (tmpImg.height > tmpImg.width){
        imgWidth = canvasSize*tmpImg.width/tmpImg.height
    } else if(tmpImg.width > tmpImg.height){
        imgHeight = canvasSize*tmpImg.height/tmpImg.width
    }
    cropImageBorderLeft = 0/*(((imgHeight-imgWidth)/2)>0?(imgHeight-imgWidth)/2: 0);/**/
    cropImageBorderTop = 0/*(((imgWidth-imgHeight)/2)>0?(imgWidth-imgHeight)/2: 0);/**/
    
    cropCtx.drawImage(
        tmpImg, 
        0, 0,
        imgWidth, imgHeight
    )
    cropPrintSelect()
}


async function cropPrintSelect(){
    //console.log("cropPrintSelect()");
    

    cropCtx.drawImage(
        cropSelector["img"],
        cropSelector["x"]-(cropSelector["maxSize"]/cropSelector["zoom"]/2),
        cropSelector["y"]-(cropSelector["maxSize"]/cropSelector["zoom"]/2),
        cropSelector["maxSize"]/cropSelector["zoom"],
        cropSelector["maxSize"]/cropSelector["zoom"]
    )
}

async function cropValidate() {
    console.log("Validate")
    const offscreen = document.createElement('canvas');
    let crpSize = parseInt(cropSelector["maxSize"]/cropSelector["zoom"]);
    offscreen.width = crpSize;
    offscreen.height = crpSize;
    const offCtx = offscreen.getContext('2d');

    // remove the selector
    cropCtx.clearRect(0, 0,
    cropCanvas.width, cropCanvas.height);
    let imgHeight = imgWidth = canvasSize;
    
    if (tmpImg.height > tmpImg.width){
        imgWidth = canvasSize*tmpImg.width/tmpImg.height
    } else if(tmpImg.width > tmpImg.height){
        imgHeight = canvasSize*tmpImg.height/tmpImg.width
    }
    
    let sx = cropSelector["x"] - (crpSize / 2);
    let sy = cropSelector["y"] - (crpSize / 2);
    offCtx.drawImage(
        tmpImg, 
        sx, sy, crpSize, crpSize, //what to copy
        0, 0, crpSize, crpSize // where to copy
    )


    img.onload = () => {
        canvasSize = crpSize;
        firstLoad();
        cropSection.classList.add("dpNone");
        
        // Clean up the onload handler so it doesn't unexpectedly re-fire later
        img.onload = null;
        console.log(img);
        
    };
    
    img.src = offscreen.toDataURL("image/png");

}
cropButtonValidate.onclick = cropValidate