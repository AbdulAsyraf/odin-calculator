const numButtons = document.querySelectorAll(".nums");
const opButtons = document.querySelectorAll(".ops");
const inputLine = document.querySelector("#input");
const outputLine = document.querySelector("#result");

const inputs = [];

let tempInput = ""

let tempResult;

numButtons.forEach(numButton => numButton.addEventListener('click', addToString));

// opButtons.forEach(opButton => opButton.addEventListener('click', addToString));

opButtons.forEach(opButton => opButton.addEventListener('click', addOrOperate));

function addToString(e) {
    tempInput = tempInput.concat(this.dataset.btn);
    if (inputs.length != 0) {
        inputLine.innerHTML = `${inputs[0]} ${inputs[1]} ${tempInput}`;
    }else {
        inputLine.innerHTML = tempInput;
    }
}

function addOrOperate(e) {
    inputs.push(tempInput);
    console.log(inputs.length);
    tempInput = "";

    if (inputs.length < 3) {
        inputs.push(this.dataset.btn);
    }else {
        if (inputs[1] == "+"){
            tempResult = Number(inputs[0]) + Number(inputs[2]);
            console.log(tempResult);
            outputLine.innerHTML = tempResult;
            inputs.splice(0, inputs.length);
            inputs.push(tempResult);
        }else if (inputs[1] == "-"){
            tempResult = inputs[0] - inputs[2];
            outputLine.innerHTML = tempResult;
            inputs.splice(0, inputs.length);
            inputs.push(tempResult);
        }else if (inputs[1] == "×"){
            tempResult = inputs[0] * inputs[2];
            outputLine.innerHTML = tempResult;
            inputs.splice(0, inputs.length);
            inputs.push(tempResult);
        }else if (inputs[1] == "÷"){
            tempResult = inputs[0] / inputs[2];
            outputLine.innerHTML = tempResult;
            inputs.splice(0, inputs.length);
            inputs.push(tempResult);
        }
    }
}