const img = new Image();
const flagSvg = new Image();
const clipCircle = new Image();clipCircle.src = "../src/img/svg/clipShape-circle.svg";
let file
let flag = 0
let imageLoaded
let flagLoaded = true;
let canvasSize = 1000
let border
let overlay = new Image()
flagSvg.src = flagList[0][0]

async function openFileDialog() { // Select File
    let [filehandle] = await showOpenFilePicker()
    let fileData = await filehandle.getFile()
    console.log(filehandle)
    console.log(fileData)
    file = fileData
}

const input = document.querySelector(".inputDiv input") // Drop File
input.addEventListener("drop", (event)=> {
    event.preventDefault()
    const file_ = event.dataTransfer.files[0]
    img.src = URL.createObjectURL(file_);
    file = URL.createObjectURL(file_)
    img.onload = () => {load()}
})
input.addEventListener("change", (event)=> {
    const file_ = input.files[0]
    img.src = URL.createObjectURL(file_);
    file = URL.createObjectURL(file_)
    img.onload = () => {load()}
})


// all inputs
const flagSelect = document.getElementById("flagSelect")
const rotationInput = document.getElementById("rotationInput")
const rotationRange = document.getElementById("rotationRange")
const sizeRange = document.getElementById("sizeRange")
const sizeInput = document.getElementById("sizeInput")
const clipModeSelect = document.getElementById("clipModeSelect")
const borderSizeRange = document.getElementById("borderSizeRange")
const borderSizeInput = document.getElementById("borderSizeInput")

rotationInput.addEventListener("input", ()=> {rotationRange.value = rotationInput.value;load()})
rotationRange.addEventListener("input", ()=> {rotationInput.value = rotationRange.value;load()})
sizeInput.addEventListener("input", ()=> {
    sizeRange.value = sizeInput.value
    canvasSize = sizeInput.value
    canvas.height = sizeInput.value
    canvas.width = sizeInput.value
    load()
})
sizeRange.addEventListener("input", ()=> { // TAILLE
    sizeInput.value = sizeRange.value
    canvasSize = sizeRange.value
    canvas.height = sizeRange.value
    canvas.width = sizeRange.value
    load()
})
borderSizeInput.addEventListener("input", ()=> {// Border size
    borderSizeRange.value = borderSizeInput.value; load()
})
borderSizeRange.addEventListener("input", ()=> {
    borderSizeInput.value = borderSizeRange.value; load()
})
clipModeSelect.addEventListener("input", ()=> {// clip mode
    if (clipModeSelect.value == 0) {
        document.getElementById("borderSize").classList.remove("active"); load()
    } else {
        document.getElementById("borderSize").classList.add("active"); load()}
})
flagSelect.addEventListener("input", ()=> { // FLAG
    flagLoaded = false
    if (flagSelect.value != -1){
        flag = flagSelect.value
        flagSvg.onload = function() {flagLoaded = true;load()}
        flagSvg.src = flagList[0][flagSelect.value]
    }
})


function Rotation(){
    let canvasD = Math.sqrt((canvasSize*canvasSize) + (canvasSize*canvasSize))
    let canvasDif = canvasSize - canvasD
    if(1* rotationInput.value /1 > 0 && 1* rotationInput.value /1 <46) {

        let tj = Math.cos((45 - rotationInput.value) * Math.PI / 180) * canvasD

        ctx.drawImage(flagSvg, 0, 0, canvasSize, canvasSize)
        ctx.rotate((1* rotationInput.value * Math.PI) / 180);
        ctx.drawImage(flagSvg, 0, -rotationInput.value * Math.sqrt((canvasSize*canvasSize/2))/45, tj, tj)
        ctx.rotate(-(1* rotationInput.value * Math.PI / 180))
        ctx.globalCompositeOperation = 'source-over'

        // Math.abs(0 - Math.sin(1*rotationInput.value/1) * canvasSize)
        //-rotationInput.value * Math.sqrt(500000)/45
        // Math.abs(0 - Math.sin(45 - rotationInput.value) * canvasSize)

    } else if (1* rotationInput.value /1 < 0 && 1* rotationInput.value /1 > -46){
        let tj = canvasSize - ((-rotationInput.value) * canvasDif / 45)
        ctx.drawImage(flagSvg, 0, 0, canvasSize, canvasSize)
        ctx.rotate((1* rotationInput.value * Math.PI) / 180);
        ctx.drawImage(flagSvg, -(rotationInput.value*(canvasD/2)/-45), 0, tj*1.2, tj)
        ctx.rotate(-(1* rotationInput.value * Math.PI) / 180);

    } else {
        ctx.drawImage(flagSvg, 0, 0, canvasSize, canvasSize)
    }
}

function load() {
    ctx.clearRect(0, 0, canvasSize,canvasSize)
    let canvasD = Math.sqrt((canvasSize*canvasSize) + (canvasSize*canvasSize))
    let cavasDif = canvasSize - canvasD

    border = canvasSize * borderSizeInput.value /100 ;
    ctx.fillStyle = "#fff"



    ctx.globalCompositeOperation = 'source-over'

    if(1* clipModeSelect.value /1 == 1){ /* CLIP MODE   CLIP MODE   CLIP MODE */
        Rotation() 
        ctx.globalCompositeOperation = 'destination-out'

        ctx.beginPath()
        ctx.arc(canvasSize/2, canvasSize/2, canvasSize/2-border, 0 , Math.PI*2)
        ctx.fill()


        overlay.src = canvas.toDataURL("image/png")
        ctx.globalCompositeOperation = 'source-over'
        Rotation()
    }else if(1* clipModeSelect.value /1 == 2) {
        Rotation()
    }else {
        Rotation()
    }



    if(border == 0){
        if(img.width > img.height){
            ctx.drawImage(
                img,
                0,
                canvasSize/2-(img.height*canvasSize/img.width)/2,
                canvasSize,
                img.height*canvasSize/img.width);
        }else if(img.width < img.height){
            ctx.drawImage(img,
                canvasSize/2-(img.width*canvasSize/img.height)/2,
                0,
                img.width*canvasSize/img.height,
                canvasSize);
        }else{
            ctx.drawImage(img, 0, 0, canvasSize, canvasSize);
        }
    } else {
        if(img.width > img.height){
            ctx.drawImage(
                img,
                border, /* bordure gauche-droite (bordure*%) */
                canvasSize/2-(img.height*(canvasSize-(border*2))/img.width)/2, /* bordure haut-bas */
                (canvasSize-(border*2)), /* taille img horizontal */
                img.height*(canvasSize-(border*2))/img.width); /* taille img vertical */
        }else if(img.width < img.height){
            ctx.drawImage(
                img,
                canvasSize/2-(img.width*(canvasSize-(border*2))/img.height)/2, /* bordure gauche-droite */
                border, /* bordure haut-bas (border*%) */
                img.width*(canvasSize-(border*2))/img.height, /* taille img horizontal */
                (canvasSize-(border*2))); /* taille img vertical */
        }else{
            ctx.drawImage(img, border, border, (canvasSize-(border*2)), (canvasSize-(border*2)));
        }
    }
    if(1 * clipModeSelect.value /1 != 0 && 1* clipModeSelect.value /1 != 3){
        overlay.onload = function() {
            ctx.drawImage(overlay, 0, 0, canvasSize,canvasSize)
        }
    }
    
    document.querySelector(".inputDiv").classList.add("loaded")
    imageLoaded = true
    document.getElementById("options").classList.add("active")
}

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")