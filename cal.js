const dispaly1El = document.querySelector('.display-1');
const dispaly2El = document.querySelector('.display-2');
const tempResultEl = document.querySelector('.temp-result'); 
const numbersEl = document.querySelectorAll('.number');
const operation1El = document.querySelectorAll('.operation');

const equalEl = document.querySelector('.equal');
const clearAllEl = document.querySelector('.all-clear');
const clearLastEl = document.querySelector('.last-entity-clear');

let dis1Num = '';
let dis2Num = '';
let result = null;
let lastOperation = '';
let haveDot = false;

numbersEl.forEach(number=>{
    number.addEventListener('click',(e)=>{
        if(e.target.innerText === '.' && !haveDot){
            haveDot = true;
        }
        else if(e.target.innerText === '.' && haveDot){
            return;
        }
        dis2Num += e.target.innerText;
        dispaly2El.innerText = dis2Num;
    })
});

operation1El.forEach(operation => {
    operation.addEventListener('click', (e)=>{
        if(!dis2Num) return;
        haveDot = false;
        const operationName = e.target.innerText;
        if(dis1Num && dis2Num && lastOperation){
            mathOperation();
        }
        else{
            result = parseFloat(dis2Num);
        }
        clearVar(operationName)
        lastOperation = operationName;
        console.log(result);

    })
});

function clearVar(name = ''){
    dis1Num += dis2Num + ' ' + name + ' '; 
    dispaly1El.innerText = dis1Num;
    dispaly2El.innerText = ' ';
    dis2Num = ' ';
    tempResultEl.innerText = result;
}

function mathOperation(){
    if(lastOperation === 'X'){
        result = parseFloat(result) * parseFloat(dis2Num);
    }
    else if(lastOperation === '+'){
        result = parseFloat(result) + parseFloat(dis2Num);
    }
    else if(lastOperation === '-'){
        result = parseFloat(result) - parseFloat(dis2Num);
    }
    else if(lastOperation === '/'){
        result = parseFloat(result) / parseFloat(dis2Num);
    }
    else if(lastOperation === '%'){
        result = parseFloat(result) % parseFloat(dis2Num);
    }
}

equalEl.addEventListener('click', (e)=>{
    if( !dis1Num || !dis2Num) return;
    haveDot = false;
    mathOperation();
    clearVar();
    dispaly2El.innerText = result;
    tempResultEl.innerText = '';
    dis2Num = result;
    dis1Num = '';
});

clearAllEl.addEventListener('click', (e) => {
    dispaly1El.innerText = '0';
    dispaly2El.innerText = '';
    dis1Num = '';
    dis2Num = '';
    result = '';
    tempResultEl.innerText= '';
});
clearLastEl.addEventListener('click', (e)=>{
    dispaly2El.innerText = '';
    dis2Num = '';
});

window.addEventListener('keydown', (e) =>{
    if(
        e.key ==='0'||
        e.key ==='1'||
        e.key ==='2'||
        e.key ==='3'||
        e.key ==='4'||
        e.key ==='5'||
        e.key ==='6'||
        e.key ==='7'||
        e.key ==='8'||
        e.key ==='9'||
        e.key ==='.'
        ){
            clickButtonEl(e.key);
        }
        else if(
            e.key === '+' ||
            e.key === '/' ||
            e.key === '-' ||
            e.key === '%'
        ){
            clickOperation(e.key);
        } 
        else if(e.key === '*'){
            clickOperation('X');
        }
        else if(e.key === 'Enter' || e.key === '='){
            clickEqual();
        }
        else if(e.key === 'c' ){
            cancelAll();
        }
});

function clickButtonEl(key){
    numbersEl.forEach( button => {
        if(button.innerText === key){
            button.click();
        }
    })
}

function clickOperation(key){
    operation1El.forEach(button => {
        if(button.innerText === key){
            button.click();
        }
    })
}

function clickEqual(){
    equalEl.click();
}
function cancelAll(){
    clearAllEl.click();
}
