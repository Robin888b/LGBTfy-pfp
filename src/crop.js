console.log("Hello World²");

//sectionCrop

const cropCanvas = document.getElementById("cropCanvas");
if (!cropCanvas.getContext){
    alert("Your Browser does not eem to support Canvas\nThis website cannot work without Canvas");
}
const cropCtx = cropCanvas.getContext("2d");

const cropRangeZoom = document.getElementById("cropZoomRange");
const cropInputZoom = document.getElementById("cropZoomInput");
let cropSelector = { x: 0, y:0, zoom:1, maxSize:0, img: new Image()}
cropSelector["img"].src = "src/svg/selectCrop.svg"
cropInputZoom.value = 1; cropRangeZoom.value = 1;

cropInputZoom.addEventListener("input", ()=>{
    cropSelector[zoom]= cropRangeZoom.value = cropInputZoom.value;
    zoom()
})

let cropImageBorderLeft, cropImageBorderTop;
let isDragging = false;
let startX = 0, startY = 0;

let mouseDown = function(event){
    event.preventDefault();

    startX = parseInt((event.clientX-cropCanvas.offsetLeft)*canvasSize/cropCanvas.offsetWidth)
    startY = parseInt((event.clientY-cropCanvas.offsetTop)*canvasSize/cropCanvas.offsetHeight)
    
    //console.log( "offsetTop : "+ cropCanvas.offsetTop + " | offsetHeight : " +(cropCanvas.offsetHeight/2) + "\noffsetLeft : " + cropCanvas.offsetLeft + " | offsetWidth : " +cropCanvas.offsetWidth);
    
    //console.log("mX² : "+ (startX)+ " | mY² : "+ (startY))
    
    if(isMouseOnSelector(startX, startY)){
        isDragging = true;
    }
}
document.onmousedown = mouseDown

let mouseUp = function(event){
    if (!isDragging){
        return;
    }
    
    event.preventDefault();
    isDragging = false
}
document.onmouseup = mouseUp
cropCanvas.onmouseleave = mouseUp

let mouseMove = function(event){
    if(!isDragging){
        return;
    }
    let mouseX = parseInt((event.clientX-cropCanvas.offsetLeft)*canvasSize/cropCanvas.offsetWidth)
    let mouseY = parseInt((event.clientY-cropCanvas.offsetTop)*canvasSize/cropCanvas.offsetHeight)
    
    let dx = mouseX - startX
    let dy = mouseY - startY


    if ((cropSelector["x"]+dx)< cropImageBorderLeft+(cropSelector["maxSize"]/2/cropSelector["zoom"])){
        cropSelector["x"] = cropImageBorderLeft+(cropSelector["maxSize"]/2/cropSelector["zoom"])
    } else if ((cropSelector["x"]+dx+(cropSelector["maxSize"]/2/cropSelector["zoom"]))> canvasSize-cropImageBorderLeft){
        cropSelector["x"] = canvasSize - (cropImageBorderLeft + (cropSelector["maxSize"]/2/cropSelector["zoom"]))
    } else {
        cropSelector["x"] += dx
    }
    //(cropSelector["maxSize"]/2/cropSelector["zoom"])
    if((cropSelector["y"]+dy)< cropImageBorderTop+(cropSelector["maxSize"]/2/cropSelector["zoom"])){
        cropSelector["y"] = cropImageBorderTop+(cropSelector["maxSize"]/2/cropSelector["zoom"])
    } else if ((cropSelector["y"]+dx+(cropSelector["maxSize"]/2/cropSelector["zoom"]))> canvasSize-cropImageBorderTop){
        cropSelector["y"] = canvasSize - (cropImageBorderTop + (cropSelector["maxSize"]/2/cropSelector["zoom"]))
    } else {
        cropSelector["y"] += dy
    }
    console.log("dx : "+dx+" | dy : "+dy)
    cropPrintImg()

    startX = mouseX; startY = mouseY
}
cropCanvas.onmousemove = mouseMove;

function isMouseOnSelector(x, y){
    let selectorTop = cropSelector["y"] - (cropSelector["maxSize"]/cropSelector["zoom"]/2)
    let selectorBottom = cropSelector["y"]+(cropSelector["maxSize"]/2/cropSelector["zoom"])
    let selectorLeft = cropSelector["x"]-(cropSelector["maxSize"]/2/cropSelector["zoom"])
    let selectorRight = cropSelector["x"]+(cropSelector["maxSize"]/2/cropSelector["zoom"])
    //cropCtx.fillRect(selectorTop, selectorLeft, selectorBottom-selectorTop, selectorRight-selectorLeft)
    //cropCtx.fillRect(x-20, y-20, 20, 20)
    

    //console.log("x : "+ x.toString()+ " | y : "+ y.toString())
    //console.log("---------")
    if (x > selectorTop && x < selectorBottom && y > selectorLeft && y < selectorRight){
        
        
        return true;
    } else {
        return false;
    }

}




async function cropLoad(){
    cropSection.classList.remove("dpNone");
    canvasSize = Math.max(img.height, img.width);
    cropCtx.canvas.height = canvasSize;
    cropCtx.canvas.width = canvasSize;
    cropCtx.clearRect(0, 0,
    cropCanvas.width, cropCanvas.height);
    cropSelector["x"] = cropSelector["y"] = canvasSize/2
    cropSelector["maxSize"] = Math.min(img.height, img.width)

    cropPrintImg()
}

async function cropPrintImg(){
    cropCtx.clearRect(0, 0,
    cropCanvas.width, cropCanvas.height);
    let imgHeight = imgWidth = canvasSize;
    
    if (img.height > img.width){
        imgWidth = canvasSize*img.width/img.height
    } else if(img.width > img.height){
        imgHeight = canvasSize*img.height/img.width
    }
    cropImageBorderLeft = (((imgHeight-imgWidth)/2)>0?(imgHeight-imgWidth)/2: 0);
    cropImageBorderTop = (((imgWidth-imgHeight)/2)>0?(imgWidth-imgHeight)/2: 0);
    
    cropCtx.drawImage(
        img, 
        cropImageBorderLeft, cropImageBorderTop,
        imgWidth, imgHeight
    )
    cropPrintSelect()
}


async function cropPrintSelect(){
    console.log("cropPrintSelect()");
    

    cropCtx.drawImage(
        cropSelector["img"],
        cropSelector["x"]-(cropSelector["maxSize"]/cropSelector["zoom"]/2),
        cropSelector["y"]-(cropSelector["maxSize"]/cropSelector["zoom"]/2),
        cropSelector["maxSize"]/cropSelector["zoom"],
        cropSelector["maxSize"]/cropSelector["zoom"]
    )
}