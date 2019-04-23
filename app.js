let levelButton = document.querySelector('#level');
let divDraggable = document.querySelector(".div--draggable");
const drop = document.querySelector('.drop');
let message = document.querySelector('.message');
let elem;
let level = 1;
let backgroundPositionArr = [];
let backgroundPositionArrOriginal = [];
let isDown = false;
let width = 200;
let height = 200;
let numberOfPieaces;
let backgroundLeft = 0;
let backgroundTop = 0;
let piecesInLine;
let zIndex = 1;
let elemOffsetLeft;
let elemOffsetTop;
let eCleintX;
let eCleintY;
let dropBox = [];
let dropTakenArr = [];
let dropTrueOrFalse = [];

levelButton.onchange = function(){
    resetGame();
    level = parseInt(this.value)
    creatDraggable();
}

document.addEventListener('mousemove',(e)=>{
    if(isDown) {
    elem.style.left = (e.pageX - (eCleintX-elemOffsetLeft) )+'px';
    elem.style.top = (e.pageY - (eCleintY-elemOffsetTop))+'px';
    }
})

function creatDraggable(){
    checkLevel();
    creatBackgroundPositionArr();
    for(let i = 0 ; i< numberOfPieaces ; i++){
        let totalWidth = i*width;
        let factorH = Math.floor(totalWidth/600);
        dropBox[i] = document.createElement("DIV"); 
        dropBox[i].setAttribute("class", "dropBox")
        drop.appendChild(dropBox[i]);
        dropBox[i].style.width = width+"px";
        dropBox[i].style.height = height+"px";
        dropBox[i].style.left = (totalWidth-factorH*600)+"px";
        dropBox[i].style.top = factorH*height+"px";
        let piece = document.createElement("DIV");
        piece.setAttribute("class", "draggable")
        divDraggable.appendChild(piece)
        piece.style.left = (10+(totalWidth-factorH*600)*1.05)+"px";
        piece.style.top = (10+factorH*height*1.05)+"px";
        piece.style.width = width+"px";
        piece.style.height = height+"px";
        piece.style.backgroundImage = "url('img.jpg')";
        piece.style.backgroundPosition = backgroundPositionArr[i];
        piece.addEventListener("mousedown",function(e){
            isDown = true;
            elem = this;
            zIndex++;
            piece.style.zIndex = zIndex;
            elemOffsetLeft = elem.offsetLeft;
            elemOffsetTop = elem.offsetTop;
            eCleintX = e.clientX;
            eCleintY = e.clientY;
            dropBox.forEach((element,i )=>{
                let offsetx = element.offsetLeft + element.parentNode.offsetLeft;
                let offsety =  element.offsetTop + element.parentNode.offsetTop;
                if(e.pageX > offsetx && e.pageX < (offsetx + width) && e.pageY > offsety && e.pageY < (offsety + height)){
                    dropTakenArr[i] = "";
                }})
        })
        piece.addEventListener("mouseup",(e)=>{
            dropBox.forEach((element,i )=>{
                let offsetx = element.offsetLeft + element.parentNode.offsetLeft;
                let offsety =  element.offsetTop + element.parentNode.offsetTop;
                if(e.pageX > offsetx && e.pageX < (offsetx + width) && e.pageY > offsety && e.pageY < (offsety + height)){
                    if(dropTakenArr[i] !== "taken"){
                        dropTrueOrFalse[i] = piece.style.backgroundPosition === backgroundPositionArrOriginal[i];
                        dropTakenArr[i] = "taken";
                        piece.style.left = offsetx+"px";
                        piece.style.top = offsety+"px"; 
                        if(dropTrueOrFalse.every(check => check)){
                            win();
                        }
                    } else {
                        piece.style.left = elemOffsetLeft+"px";
                        piece.style.top = elemOffsetTop+"px";
                    }
                } 
            })
            isDown = false;
        })
    }
}

function resetGame(){
    divDraggable.innerHTML ="";
    drop.innerHTML="";
    elem = null ;
    backgroundPositionArr = [];
    backgroundPositionArrOriginal = [];
    isDown = false;
    width = 200;
    height = 200;
    numberOfPieaces = 0;
    backgroundLeft=0;
    backgroundTop = 0;
    piecesInLine =0;
    zIndex = 1;
    elemOffsetLeft= 0;
    elemOffsetTop = 0;
    eCleintX = 0;
    eCleintY = 0;
    dropBox =[];
    dropTakenArr = [];
    dropTrueOrFalse= [];
    message.textContent = '';
    message.classList.remove('win');
}

function checkLevel(){
    if (level === 1){
        width = 200;
        height = 200;
        numberOfPieaces = 9;
        piecesInLine = 3
    } else if( level === 2) {
        width = 150;
        height = 150;
        numberOfPieaces = 16;
        piecesInLine = 4;
    } else if (level === 3 ){
        width = 120;
        height = 120;
        numberOfPieaces = 25;
        piecesInLine = 5;
    }
}

function creatBackgroundPositionArr(){
    for(let i = 0 ; i< numberOfPieaces ; i++){
        dropTrueOrFalse[i] = false;
        if((i/piecesInLine)%1 === 0 && i/piecesInLine !==0){
            backgroundLeft = 0;
            backgroundTop -= height;
            backgroundPositionArr.push(`${backgroundLeft}px ${backgroundTop}px`)
            backgroundLeft -= width;
        } else {
            backgroundPositionArr.push(`${backgroundLeft}px ${backgroundTop}px`)
            backgroundLeft -= width ;
        }
    }
    backgroundPositionArrOriginal = [...backgroundPositionArr]
    shuffle(backgroundPositionArr);
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function win(){
    message.textContent = 'Perfect';
    message.classList.add('win');
}

creatDraggable()