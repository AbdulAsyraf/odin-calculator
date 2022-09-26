const numButtons = document.querySelectorAll(".nums");
const opButtons = document.querySelectorAll(".ops");
const decButton = document.querySelector("#btnDec");
const clrButton = document.querySelector("#btnClear");

const inputLine = document.querySelector("#input");
const outputLine = document.querySelector("#result");


const inputs = [];

let tempInput = ""

let tempResult;

let decimal = false;
let opsActive = false;

numButtons.forEach(numButton => numButton.addEventListener('click', addToString));
clrButton.addEventListener('click', clearData);

function clearData() {
    decimal = false;
    opsActive = false;
    tempInput = "";
    tempResult = "";
    inputs.splice(0, inputs.length);

    inputLine.innerHTML = "";
    outputLine.innerHTML = "";
}

function addToString(e) {
    tempInput = tempInput.concat(this.dataset.btn);
    
    if (!opsActive){
        opButtons.forEach(opButton => opButton.addEventListener('click', addOrOperate));
        opsActive = true;
    }

    if (this.dataset.btn == "."){
        decimal = true;
        decButton.removeEventListener('click', addToString);
    }
    
    if (inputs.length == 0) {
        inputLine.innerHTML = tempInput;
    }else if (inputs.length == 1) {
        inputs.splice(0, inputs.length);
        inputLine.innerHTML = tempInput;
    }else if (inputs.length == 2) {
        inputLine.innerHTML = `${inputs[0]} ${inputs[1]} ${tempInput}`;
    }
}

function bringForward(nextOp) {
    inputs.splice(0, inputs.length);
    if (nextOp != "=") {
        inputs.push(tempResult);
        inputs.push(nextOp);
        inputLine.innerHTML = `${inputs[0]} ${inputs[1]}`;
    }
}

function addOrOperate(e) {
    if (tempInput) {
        inputs.push(tempInput);
        console.log(inputs.length);
        tempInput = "";
    }
    
    if (decimal) {
        decimal = false;
        decButton.addEventListener('click', addToString);
    }

    if (inputs.length == 1 ) {
        inputs.push(this.dataset.btn);
        inputLine.innerHTML = `${inputs[0]} ${inputs[1]}`;
        if (this.dataset.btn == "="){
            tempResult = Number(inputs[0]);
            outputLine.innerHTML = tempResult;
            bringForward(this.dataset.btn);
        }
    }else if (inputs.length == 2) { //to change the operator
        inputs.pop();
        inputs.push(this.dataset.btn);
        inputLine.innerHTML = `${inputs[0]} ${inputs[1]}`;
    }else if (inputs.length == 3) { //actually operate
        if (inputs[1] == "+"){
            tempResult = Number(inputs[0]) + Number(inputs[2]);
            outputLine.innerHTML = tempResult;
            bringForward(this.dataset.btn);
        }else if (inputs[1] == "-"){
            tempResult = Number(inputs[0]) - Number(inputs[2]);
            outputLine.innerHTML = tempResult;
            bringForward(this.dataset.btn);
        }else if (inputs[1] == "×"){
            tempResult = Number(inputs[0]) * Number(inputs[2]);
            outputLine.innerHTML = tempResult;
            bringForward(this.dataset.btn);
        }else if (inputs[1] == "÷"){
            if (Number(inputs[2] == 0)){
                outputLine.innerHTML = "Yeah no";
                bringForward("=");
            }else {
                tempResult = Number(inputs[0]) / Number(inputs[2]);
                outputLine.innerHTML = tempResult;
                bringForward(this.dataset.btn);
            }
        }
    }
}