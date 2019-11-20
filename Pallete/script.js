// variables
const bucket = document.querySelector(".bucket");
const chooseColor = document.querySelector(".choose-color");
const move =  document.querySelector(".move");
const transform =  document.querySelector(".transform");

document.querySelector(".current-color .circle").style.backgroundColor = "rgb(37, 30, 148)";
let currentColor = document.querySelector(".current-color .circle");
document.querySelector(".prev-color .circle").style.backgroundColor = "rgb(31, 238, 31)" ;
let prevColor = document.querySelector(".prev-color .circle");
let currentInstrument;

document.querySelector(".colors").addEventListener("click",function(){
    if(event.target.closest(".colors") != null && currentInstrument != "chooseColor"){
        changeColor(event);
    }
});

function changeColor() {
    let colorelements = document.querySelectorAll(".colors > li");  
    for(let colorelement of colorelements){
        if(event.target == colorelement){
            prevColor.style.backgroundColor = currentColor.style.backgroundColor;
            currentColor.style.backgroundColor = event.target.firstElementChild.style.backgroundColor;
            if(!event.target.firstElementChild.style.backgroundColor){
                currentColor.style.backgroundColor = getComputedStyle(event.target.firstElementChild).backgroundColor;
            }
            return;
        }
    }
    prevColor.style.backgroundColor = currentColor.style.backgroundColor;
    currentColor.style.backgroundColor = event.target.style.backgroundColor;
    if(!event.target.backgroundColor){
        currentColor.style.backgroundColor = getComputedStyle(event.target).backgroundColor;
    }
}

bucket.addEventListener("click", function() {
    clearInstruments();
    bucket.classList.add("active");
    currentInstrument = "bucket";
    document.body.style.cursor = "url('assets/i1.png'), auto";
})

chooseColor.addEventListener("click", function() {
    if(currentInstrument != "chooseColor"){
        clearInstruments();
        chooseColor.classList.add("active");
        currentInstrument = "chooseColor";
        document.body.style.cursor = "url('assets/i2.png'), auto";
    }
    else {currentInstrument = null;
        document.body.style.cursor = "";
        clearInstruments();
    }
    event.stopPropagation();
})

move.addEventListener("click", function() {
    clearInstruments();
    move.classList.add("active");
    currentInstrument = "move";
    document.body.style.cursor = "url('assets/i3.png'), auto";
})

transform.addEventListener("click", function() {
    clearInstruments();
    transform.classList.add("active");
    currentInstrument = "transform";
    document.body.style.cursor = "url('assets/i4.png'), auto";
})

function applyTool() {
    if(currentInstrument == "bucket"){
        if(event.target.style.backgroundColor == currentColor.style.backgroundColor){
            event.target.style.backgroundColor = "";
        }
        else event.target.style.backgroundColor = currentColor.style.backgroundColor;
    }
    if(currentInstrument == "transform"){
        event.target.classList.toggle("transformation");
    }
}

document.querySelector(".field").addEventListener("click",function(){
    if(event.target.closest(".field") != null) {
        applyTool(event);
    }
})
document.addEventListener("click",function(){
 if(currentInstrument == "chooseColor"){
        changeColor(event);
    }
})

const elements = document.querySelectorAll(".element");
let orderstart,orderenter;
for(let element of elements) {
    element.addEventListener('dragstart', dragStart);
    element.addEventListener('dragend', dragEnd);
    element.addEventListener('dragover', dragOver);
    element.addEventListener('dragenter', dragEnter);
    element.addEventListener('dragleave', dragLeave);
    element.addEventListener('drop', dragDrop);
}

function dragStart() {
    if(currentInstrument = "move"){
    this.classList.add("hold");
    orderstart = getComputedStyle(event.target).order;
    }
}
function dragEnd() {
    this.classList.remove("hold");
    this.style.order = orderenter;
}
function dragOver(e) {
    e.preventDefault();
}
function dragEnter(e) {
    e.preventDefault();
    orderenter = getComputedStyle(event.target).order;
    this.classList.add("hovered");
}
function dragLeave() {
    this.classList.remove("hovered");
}
function dragDrop() {
    this.style.order = orderstart;
    this.classList.remove("hovered");
}

function clearInstruments() {
    bucket.classList.remove("active");
    chooseColor.classList.remove("active");
    move.classList.remove("active");
    transform.classList.remove("active");
    currentInstrument = null;
}

// Keybord events

document.addEventListener("keydown",function(){
    if(event.code == "KeyB"){
        clearInstruments();
        bucket.classList.add("active");
        currentInstrument = "bucket";
        document.body.style.cursor = "url('assets/i1.png'), auto";
    }
    if(event.code == "KeyC"){
        if(currentInstrument != "chooseColor"){
            clearInstruments();
            chooseColor.classList.add("active");
            currentInstrument = "chooseColor";
            document.body.style.cursor = "url('assets/i2.png'), auto";
        }
        else {currentInstrument = null;
            document.body.style.cursor = "";
            clearInstruments();
        }
        event.stopPropagation();
    }
    if(event.code == "KeyM"){
        clearInstruments();
        move.classList.add("active");
        currentInstrument = "move";
        document.body.style.cursor = "url('assets/i3.png'), auto";
    }
    if(event.code == "KeyT"){
        clearInstruments();
        transform.classList.add("active");
        currentInstrument = "transform";
        document.body.style.cursor = "url('assets/i4.png'), auto";
    }
})