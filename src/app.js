console.log("Hello world!")

let file;
let img = new Image();
let tmpImg = new Image();
let imgUrl = ""; // the top calc in base64
const fileInput = document.getElementById("fileInput");
const divFileInput = document.getElementById("inputDiv")


// canvas
const canvas = document.getElementById("canvas");
if (!canvas.getContext){
    alert("Your Browser does not eem to support Canvas\nThis website cannot work without Canvas");
}
const ctx = canvas.getContext("2d");
let canvasSize = 1000



fileInput.addEventListener("input", e => {
    console.log(e.target.files[0])
    console.log(fileInput.files)
})

 // Drop File
fileInput.addEventListener("drop", (event)=> {
    event.preventDefault()
    const file_ = event.dataTransfer.files[0]
    tmpImg.src = URL.createObjectURL(file_);
    file = URL.createObjectURL(file_)
    tmpImg.onload = () => {
        cropLoad()
        //firstLoad()
    }
})
fileInput.addEventListener("change", (event)=> {
    const file_ = fileInput.files[0]
    tmpImg.src = URL.createObjectURL(file_);
    file = URL.createObjectURL(file_)
    tmpImg.onload = () => {
        cropLoad()
        //firstLoad()
    }
})




// CONTROLS         CONTROLS            CONTROLS            CONTROLS
let isChangingValue = false
const divControls = document.getElementById("controls");
const selectFlag = document.getElementById("flagSelect");
const selectFlagType = document.getElementById("flagModaSelect");
const inputFlagRotation = document.getElementById("rotationInput"); let flagRotation = inputFlagRotation.value;
const toggleSquare = document.getElementById("togglSquare"); toggleSquare.checked = false
const spanToggleCircle = document.getElementById("dspToglCircle");
const spanToggleSquare = document.getElementById("dspTogglSquare");
const optionClipSquare = document.getElementById("clipOptionSquare");
let isSquare= false
const rangeFlagRotation = document.getElementById("rotationRange");
const inputImgSize = document.getElementById("sizeInput");
const rangeImgSize = document.getElementById("sizeRange");
const selectShape = document.getElementById("clipModeSelect");
const inputBorderSize = document.getElementById("borderSizeInput"); let borderSize = inputBorderSize.value;
const rangeBorderSize = document.getElementById("borderSizeRange");
const divBorderSize = document.getElementById("borderControl");
const inputBorderRadius = document.getElementById("borderRadiusInput"); let borderRadius = inputBorderRadius.value;
const rangeBorderRadius = document.getElementById("borderRadiusRange");
const divBorderRadius = document.getElementById("brderRadiusControl");
const divSquare = document.getElementById("square");

const cropSection = document.getElementById("cropSection")


if (selectShape.value == 0){
    divBorderRadius.classList.add("dpNone");
    divBorderSize.classList.add("dpNone");
} else if (selectShape.value == 3){
    divBorderRadius.classList.remove("dpNone");
    divBorderSize.classList.remove("dpNone");
} else {
    divBorderRadius.classList.add("dpNone");
    divBorderSize.classList.remove("dpNone");
}
selectFlag.addEventListener("input", rePrintFlag)
selectFlagType.addEventListener("input", rePrintFlag)


toggleSquare.addEventListener("input", () => {
    if (!isChangingValue){
        isSquare = toggleSquare.checked;
        if (toggleSquare.checked) {// SQUARE
            divSquare.classList.remove("circle")
            spanToggleCircle.classList.remove("selectedToggl")
            spanToggleSquare.classList.add("selectedToggl")
            optionClipSquare.classList.remove("dpNone")
        } else {//CIRCLE
            divSquare.classList.add("circle")
            spanToggleCircle.classList.add("selectedToggl")
            spanToggleSquare.classList.remove("selectedToggl")
            optionClipSquare.classList.add("dpNone")
        }
        load()
    }
})



inputFlagRotation.addEventListener("input", async e => {
    if (!isChangingValue){
        isChangingValue = true;
        rangeFlagRotation.value = inputFlagRotation.value;
        flagRotation = inputFlagRotation.value;
        isChangingValue = false;
        rePrintFlag();
    } else {
        inputFlagRotation.value = flagRotation;
    }
})

rangeFlagRotation.addEventListener("input", async e => {
    if (!isChangingValue){
        isChangingValue = true;
        inputFlagRotation.value = rangeFlagRotation.value;
        flagRotation = rangeFlagRotation.value;
        isChangingValue = false;
        rePrintFlag();
} else {
    rangeFlagRotation.value = flagRotation;
    e.preventDefault();}})

inputImgSize.addEventListener("input", async e => {
    if (!isChangingValue){
        isChangingValue = true;
        rangeImgSize.value = inputImgSize.value;
        isChangingValue = false;
        canvasSize = inputImgSize.value;
        load();
} else {inputImgSize.value = canvasSize}})

rangeImgSize.addEventListener("input", async e => {
    if (!isChangingValue){
        isChangingValue = true;
        inputImgSize.value = rangeImgSize.value;
        isChangingValue = false;
        canvasSize = rangeImgSize.value;
        load();
    } else {rangeImgSize.value = canvasSize}
})

selectShape.addEventListener("input", () => {
    if (selectShape.value == 0){
        divBorderRadius.classList.add("dpNone");
        divBorderSize.classList.add("dpNone");
    } else if (selectShape.value == 3){
        divBorderRadius.classList.remove("dpNone");
        divBorderSize.classList.remove("dpNone");
    } else {
        divBorderRadius.classList.add("dpNone");
        divBorderSize.classList.remove("dpNone");
    }
    load()
})

inputBorderSize.addEventListener("input", async e => {
    if (!isChangingValue){
    isChangingValue = true
    rangeBorderSize.value = inputBorderSize.value
    isChangingValue = false
    borderSize = inputBorderSize.value;
    load()
} else {inputBorderSize.value = borderSize}})

rangeBorderSize.addEventListener("input", async e => {
    if (!isChangingValue){
    isChangingValue = true
    inputBorderSize.value = rangeBorderSize.value
    isChangingValue = false
    borderSize = rangeBorderSize.value;
    load()
} else {rangeBorderSize.value = borderSize}})

inputBorderRadius.addEventListener("input", async e => {
    if (!isChangingValue){
        isChangingValue = true;
        rangeBorderRadius.value = inputBorderRadius.value;
        isChangingValue = false;
        borderRadius = inputBorderRadius.value;
        load()
} else {inputBorderRadius.value = borderRadius}})

rangeBorderRadius.addEventListener("input", async e => {
    if (!isChangingValue){
        isChangingValue = true;
        inputBorderRadius.value = rangeBorderRadius.value;
        isChangingValue = false;
        borderRadius = rangeBorderRadius.value;
        load()
} else {rangeBorderRadius.value = borderRadius}})






// FIRST LOAD           FIRST LOAD          FIRST LOAD          FIRST LOAD          FIRST LOAD
async function firstLoad() {
    canvas.classList.remove("dpNone");
    divFileInput.classList.add("dpNone");
    divControls.classList.remove("dpNone")

    isChangingValue = true;
    if(Math.max(img.height, img.width)<600) {
        canvasSize = Math.max(img.height, img.width);
        inputImgSize.value = canvasSize;
        rangeImgSize.value = canvasSize;
    } else {
        canvasSize = 600;
        inputImgSize.value = 600;
        rangeImgSize.value = 600;
    }
    isChangingValue = false;

    console.log("firstLoad()");
    

    divSquare.classList.add("circle")
    
    load()
}












/**  CUBISM             CUBISM              CUBISM              CUBISM              CUBISM
 * @param {number} tileSize - Size of tiles
 * @param {number} alpha - Transparency of the tiles ]0, 1]
 * @param {number} density - Tile density
 */
function applyCubism(tileSize = 30, alpha = [.6,.8], density = 2.0) {
    // copy the actual canvas on another one
    const offscreen = document.createElement('canvas');
    offscreen.width = canvasSize;
    offscreen.height = canvasSize;
    const offCtx = offscreen.getContext('2d');
    
    offCtx.drawImage(canvas, 0, 0, canvasSize, canvasSize);
    const imgData = offCtx.getImageData(0, 0, canvasSize, canvasSize);

    // ad BG
    //ctx.fillStyle = bgColor;
    //ctx.fillRect(0, 0, canvasSize, canvasSize);

    
    const numberOfTiles = (canvasSize**2 / tileSize**1.5) * density*2;

    
    for (let i = 0; i < numberOfTiles; i++) {
        const x = Math.floor(Math.random() * canvasSize);
        const y = Math.floor(Math.random() * canvasSize);

        // Colors of the pixel
        const pixelIndex = (y * canvasSize + x) * 4;
        const r = imgData.data[pixelIndex];
        const g = imgData.data[pixelIndex + 1];
        const b = imgData.data[pixelIndex + 2];
        let a = alpha[0]
        if (alpha.length > 1){
            a = Math.random()*(alpha[1]-alpha[0]) + alpha[0]
        }
        if ((imgData.data[pixelIndex + 3] / 255)===0){continue}


        ctx.save();
        ctx.translate(x, y);
        
        const randomAngle = Math.random() * Math.PI * 2;
        ctx.rotate(randomAngle);
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;

        ctx.fillRect(-tileSize / 4, -tileSize / 2, tileSize/2, tileSize);
        
        ctx.restore();
    }
}












/** LOAD IMAGE
 * @param {string} src - source of the image to load
*/
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image at ${src}`));
        img.src = src;
    });
}


// PRINT IMAGE          PRINT IMAGE             PRINT IMAGE             PRINT IMAGE             PRINT IMAGE
async function printImg(){
    ctx.clearRect(0, 0,
    canvas.width, canvas.height);

    let shape = selectShape.value
    if (shape != 0){ // not transparent

        let border = canvasSize*borderSize/100
        let imgHeight = imgWidth = canvasSize;

        if (img.height > img.width){
            imgWidth = canvasSize*img.width/img.height;
        } else if(img.width > img.height){
            imgHeight = canvasSize*img.height/img.width;
        }

        if (shape ==3){ // SQUARE           SQUARE          SQUARE
            

            ctx.beginPath();
            ctx.roundRect(
                border, border,
                canvasSize-(border*2),
                canvasSize-(border*2),
                [borderRadius*canvasSize/100]
            );
            ctx.fill()

        }else if(shape ==1) {// CIRCLE          CIRCLE          CIRCLE

            
            ctx.beginPath();
            ctx.roundRect(
                border, border,
                canvasSize-(border*2),
                canvasSize-(border*2),
                [0.5*canvasSize]
            );
            ctx.fill()

        }else if (shape == 2) {// BLURED CIRCLE         BLURED CIRCLE

            ctx.beginPath();
            let gradient = ctx.createRadialGradient(
                canvasSize/2, canvasSize/2, 0.4*(canvasSize-border)/2,
                canvasSize/2, canvasSize/2, (canvasSize-border*2)/2
            );
            
            // Add three color stops
            gradient.addColorStop(0, "#000");
            gradient.addColorStop(0.9, "#00000000");
            gradient.addColorStop(1, "#00000000");

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvasSize, canvasSize);

        } else{// HEART         HEART           HEART           HEART
            let shp = await loadImage("src/svg/clipHearth.svg");
            ctx.beginPath();
            ctx.drawImage(
                shp,
                border, border,
                canvasSize - (2*border),
                canvasSize - (2*border)
            )
        } 
        // clip() but works wit images
        ctx.globalCompositeOperation = 'source-in'

        let borderTop = (img.height == img.width)? border : ((img.height > img.width)? border-((img.height-img.width)/2): border);
        let borderLeft = (img.height == img.width)? border : ((img.height < img.width)? border-((img.width-img.height)/2): border);

        ctx.drawImage(
            img, borderTop, borderLeft, 
            imgWidth-(border*2), imgHeight-(border*2)
        )
        
        ctx.globalCompositeOperation = 'source-over';
    } else {

        let imgHeight = imgWidth = canvasSize;
        if (img.height > img.width){
            imgWidth = canvasSize*img.width/img.height
        } else if(img.width > img.height){
            imgHeight = canvasSize*img.height/img.width
        }
        
        ctx.drawImage(
            img, 
            (((imgHeight-imgWidth)/2)>0?(imgHeight-imgWidth)/2: 0),
            (((imgWidth-imgHeight)/2)>0?(imgWidth-imgHeight)/2: 0),
            imgWidth, imgHeight
        )
        
    }
}






// PRINT FLAG               PRINT FLAG              PRINT FLAG              PRINT FLAG
const flagList = [
    [
        "src/flag/normal/flagClassic.svg",
        "src/flag/normal/flagAgender.svg",
        "src/flag/normal/flagAromantic.svg",
        "src/flag/normal/flagAsexual.svg",
        "src/flag/normal/flagBear.svg",
        "src/flag/normal/flagBi.svg",
        "src/flag/normal/flagDemiBoy.svg",
        "src/flag/normal/flagDemiGirl.svg",
        "src/flag/normal/flagGayMen.svg",
        "src/flag/normal/flagGenderFluid.svg",
        "src/flag/normal/flagGenderQueer.svg",
        "src/flag/normal/flagLesbian.svg",
        "src/flag/normal/flagNonBinary.svg",
        "src/flag/normal/flagOmnisexual.svg",
        "src/flag/normal/flagPan.svg",
        "src/flag/normal/flagTrans.svg"
    ],[
        "src/flag/normal/flagClassic1-3.svg",
        "src/flag/normal/flagAgender1-3.svg",
        "src/flag/normal/flagAromantic1-3.svg",
        "src/flag/normal/flagAsexual1-3.svg",
        "src/flag/normal/flagBear1-3.svg",
        "src/flag/normal/flagBi1-3.svg",
        "src/flag/normal/flagDemiBoy1-3.svg",
        "src/flag/normal/flagDemiGirl1-3.svg",
        "src/flag/normal/flagGayMen1-3.svg",
        "src/flag/normal/flagGenderFluid1-3.svg",
        "src/flag/normal/flagGenderQueer1-3.svg",
        "src/flag/normal/flagLesbian1-3.svg",
        "src/flag/normal/flagNonBinary1-3.svg",
        "src/flag/normal/flagOmnisexual1-3.svg",
        "src/flag/normal/flagPan1-3.svg",
        "src/flag/normal/flagTrans1-3.svg"
    ],[
        "src/flag/normal/flagClassic2-5.svg",
        "src/flag/normal/flagAgender2-5.svg",
        "src/flag/normal/flagAromantic2-5.svg",
        "src/flag/normal/flagAsexual2-5.svg",
        "src/flag/normal/flagBear2-5.svg",
        "src/flag/normal/flagBi2-5.svg",
        "src/flag/normal/flagDemiBoy2-5.svg",
        "src/flag/normal/flagDemiGirl2-5.svg",
        "src/flag/normal/flagGayMen2-5.svg",
        "src/flag/normal/flagGenderFluid2-5.svg",
        "src/flag/normal/flagGenderQueer2-5.svg",
        "src/flag/normal/flagLesbian2-5.svg",
        "src/flag/normal/flagNonBinary2-5.svg",
        "src/flag/normal/flagOmnisexual2-5.svg",
        "src/flag/normal/flagPan2-5.svg",
        "src/flag/normal/flagTrans2-5.svg"
    ],[
        "src/flag/gradient/flagClassic.svg",
        "src/flag/gradient/flagAgender.svg",
        "src/flag/gradient/flagAromantic.svg",
        "src/flag/gradient/flagAsexual.svg",
        "src/flag/gradient/flagBear.svg",
        "src/flag/gradient/flagBi.svg",
        "src/flag/gradient/flagDemiBoy.svg",
        "src/flag/gradient/flagDemiGirl.svg",
        "src/flag/gradient/flagGayMen.svg",
        "src/flag/gradient/flagGenderFluid.svg",
        "src/flag/gradient/flagGenderQueer.svg",
        "src/flag/gradient/flagLesbian.svg",
        "src/flag/gradient/flagNonBinary.svg",
        "src/flag/gradient/flagOmnisexual.svg",
        "src/flag/gradient/flagPan.svg",
        "src/flag/gradient/flagTrans.svg"
    ],[
        "src/flag/gradient/flagClassic1-3.svg",
        "src/flag/gradient/flagAgender1-3.svg",
        "src/flag/gradient/flagAromantic1-3.svg",
        "src/flag/gradient/flagAsexual1-3.svg",
        "src/flag/gradient/flagBear1-3.svg",
        "src/flag/gradient/flagBi1-3.svg",
        "src/flag/gradient/flagDemiBoy1-3.svg",
        "src/flag/gradient/flagDemiGirl1-3.svg",
        "src/flag/gradient/flagGayMen1-3.svg",
        "src/flag/gradient/flagGenderFluid1-3.svg",
        "src/flag/gradient/flagGenderQueer1-3.svg",
        "src/flag/gradient/flagLesbian1-3.svg",
        "src/flag/gradient/flagNonBinary1-3.svg",
        "src/flag/gradient/flagOmnisexual1-3.svg",
        "src/flag/gradient/flagPan1-3.svg",
        "src/flag/gradient/flagTrans1-3.svg"
    ]
]


async function printFlag(){
    ctx.save()
    ctx.translate(canvasSize/2, canvasSize/2);
    ctx.rotate((flagRotation * Math.PI) / 180);

    let flagSize = canvasSize;
    if (isSquare) {
        let prFlag = function(flag){

            let rotationInRadians = (flagRotation * Math.PI) / 180;        
            flagSize = ((canvasSize/2)/Math.cos(Math.abs(rotationInRadians)))*2
            ctx.drawImage(flag,
                -(flagSize/2)*4/3, -(flagSize/2)*4/3,
                flagSize*4/3, flagSize*4/3
            )

        }

        if (selectFlagType.value <2) {// Normal
            
            prFlag(await loadImage(flagList[1][selectFlag.value]));

        } else if (selectFlagType.value == 2) {// gradient
            
            prFlag(await loadImage(flagList[4][selectFlag.value]));

        } else if (selectFlagType.value == 3){// Dashed
            
            prFlag(await loadImage(flagList[4][selectFlag.value]));

            ctx.restore();

            applyCubism(canvasSize/10, [.4, .7], 2);
        }

    } else { // if CIRCLE
        let prFlag = function(flag){

            ctx.drawImage(flag,
                -(flagSize/2), -(flagSize)/2,
                flagSize, flagSize
            )
        }

        if (selectFlagType.value <2){// Normal

            if (flagRotation == 0){
                prFlag(await loadImage(flagList[0][selectFlag.value]))
            } else {
                flagSize = Math.sqrt((canvasSize**2)+(canvasSize**2))
                prFlag(await loadImage(flagList[1][selectFlag.value]))
            }

        }  else if (selectFlagType.value == 2) {// gradient
            if (flagRotation == 0){
                prFlag(await loadImage(flagList[3][selectFlag.value]))
            } else {
                flagSize = Math.sqrt((canvasSize**2)+(canvasSize**2))
                prFlag(await loadImage(flagList[4][selectFlag.value]))
            }

        } else if (selectFlagType.value == 3){// Dashed

            if (flagRotation == 0){
                prFlag(await loadImage(flagList[3][selectFlag.value]))
            } else {
                flagSize = Math.sqrt((canvasSize**2)+(canvasSize**2))
                prFlag(await loadImage(flagList[4][selectFlag.value]))
            }
            ctx.restore()

            applyCubism(canvasSize/10, [.4, .7], 2);
        }
    }

    ctx.restore()
}




//  LOAD        LOAD        LOAD        LOAD        LOAD        LOAD        LOAD
async function load(){
    isChangingValue = true;
    console.log("load()");
    ctx.canvas.height = canvasSize
    ctx.canvas.width = canvasSize
    
    await printImg();
    imgUrl = await canvas.toDataURL("image/png")

    await printFlag();

    let imgToAdd = await loadImage(imgUrl)

    ctx.drawImage(
        imgToAdd,
        0,0, canvasSize, canvasSize
    )

    /*
    ctx.fillStyle = "rgb(200 0 0)";
    ctx.fillRect(10, 10, 50, 50);
    
    ctx.fillStyle = "rgb(0 0 200 / 50%)";
    ctx.fillRect(30, 30, 50, 50);
    */
    isChangingValue = false
}

async function rePrintFlag(){
    isChangingValue = true;
    
    await printFlag();

    let imgToAdd = await loadImage(imgUrl)

    ctx.drawImage(
        imgToAdd,
        0,0, canvasSize, canvasSize
    )
    isChangingValue = false
}