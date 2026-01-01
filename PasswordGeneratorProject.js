const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const indicator = document.querySelector("[data-indicator]");
const upperCaseCheck = document.querySelector("#upperCase");
const lowerCaseCheck = document.querySelector("#lowerCase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const passwordDisplay = document.querySelector("[data-PasswordDisplay]");
const copyMessage = document.querySelector("[data-copyMsg]");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const generateButton = document.querySelector(".generatePassword");

const symbols = "~!@#$%^&*()_+{}[]";

let pswdLength = 10;
let password = "";
let checkBoxCount = 1;


handleSlider();

//Slider handle for length input number
function handleSlider(){
    inputSlider.value = pswdLength;
    lengthDisplay.innerText = pswdLength;
}

//Indicator Color
function setIndicator(color){
    indicator.style.backgroundColor = color;
}

//Random number main formula
function getRndInteger(min,max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRndNumber(){
    return getRndInteger(0,9);
}

function getRndLowercase(){
    // a to z (97 to 122)
    return String.fromCharCode(getRndInteger(97,123));
}

function getRndUppercase(){
    // A to Z (65 to 90)
    return String.fromCharCode(getRndInteger(65,91));
}

function getRndSymbols(){
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

// Function to calculate strength
function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNumber=  false;
    let hasSymbol = false;

    if (upperCaseCheck.checked) hasUpper = true;
    if (lowerCaseCheck.checked) hasLower = true;
    if (numberCheck.checked) hasNumber = true;
    if (symbolCheck.checked) hasSymbol = true;

    if (hasUpper && hasLower && hasNumber && hasSymbol && pswdLength>=8){
        setIndicator("#5edc1f");
    }

    else if ((hasUpper || hasLower) && (hasNumber || hasSymbol) && pswdLength>=6){
        setIndicator("#fdd017");
    }
    else {
        setIndicator("#b92e34");
    }
}

// To copy text from Clipboard:
   // navigator.clipboard.writeText
async function copyContent(){
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMessage.innerText = "Copied";
        
    } catch (error) {
        copyMessage.innerText = "Failed";
    }
}


// EVENT LISTENERS

//Event Listener on Slider:
inputSlider.addEventListener('input',(val)=>{
    pswdLength = val.target.value;
    handleSlider();
})

// Event Listener on Copy Button:
copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value) {
        copyContent();
    }
});


// CheckBox Change (to count no. of check boxex changed)
function handleCheckBoxChange(){
    checkBoxCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked) 
            checkBoxCount++;
    })
}

// ye wala code ek br excecute hoga and hr checkbox ko eventlistener assign krdega...., ab hr ek pe change wala event listener applied hai, so jb bhi kisi bhi checkbox mei change hoga to handleCheckBoxChange() wala function excecute hoga taki vo dubara gin ske ki total kitne checkboxes pe tick hai....

// to assign event listener to all checkboxes
allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
});

// Event Listener on Generate Button
generateButton.addEventListener('click', () => {

    if (checkBoxCount <= 0) return;

    if (pswdLength < checkBoxCount) {
        pswdLength = checkBoxCount;
        handleSlider();
    }

    password = "";
    let funcnArr = [];

    if (upperCaseCheck.checked) funcnArr.push(getRndUppercase);
    if (lowerCaseCheck.checked) funcnArr.push(getRndLowercase);
    if (numberCheck.checked) funcnArr.push(getRndNumber);
    if (symbolCheck.checked) funcnArr.push(getRndSymbols);

    // ✅ STEP 1: compulsory addition (one from each selected type)
    funcnArr.forEach((func) => {
        password += func();
    });

    // ✅ STEP 2: remaining characters
    for (let i = password.length; i < pswdLength; i++) {
        let randIndex = getRndInteger(0, funcnArr.length);
        password += funcnArr[randIndex]();
    }

    // ✅ STEP 3: shuffle password
    password = shufflePassword(password);

    // ✅ STEP 4: display password
    passwordDisplay.value = password;

    // ✅ STEP 5: calculate strength
    calcStrength();
});

function shufflePassword(str) {
    let arr = str.split("");
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join("");
}




