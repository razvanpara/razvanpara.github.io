const aboveBase10digits = {
    10: 'A',
    11: 'B',
    12: 'C',
    13: 'D',
    14: 'E',
    15: 'F'
};
const convertToBase = (base, n, print = false) => {
    if (base <= 1 || base > 16) throw new Error(`base ${base} not allowed!`);
    let digits = [];
    if (print) console.log(`number : ${n}`);
    while (n > 0) {
        let remainder = n % base;
        digits.push(remainder);
        let divisionResult = Math.floor(n / base);
        if (print) console.log(`${n}\t/\t${base}\t=\t${divisionResult}\tR:${remainder}`);
        n = divisionResult;
    };
    return digits.reverse().reduce((a, c) => a + (c < 10 ? c : aboveBase10digits[c]), "");
};
const convertFromBase = (base, n) => n.toString().split("").map((item, index, arr) => Math.pow(base, (arr.length - 1) - index) * parseInt(item)).reduce((a, c) => a + c);
const stringToCharacterCodes = str => str.split("").map(ch => ch.charCodeAt(0));
const textToBinary = text => stringToCharacterCodes(text).map(cc => convertToBase(2, cc));
const binaryToText = binaryArr => binaryArr.map(bcc => String.fromCharCode(convertFromBase(2, bcc)));
const collapseArrayIntoText = (arr, separator) => arr.reduce((a, c) => `${a}${separator}${c}`);
const convert = (event, sourceId, targetId, type) => {
    let sourceText = document.getElementById(sourceId).value;
    let toTranslate = type == '1' ? sourceText : sourceText.split(" ");
    if (toTranslate != null)
        document.getElementById(targetId).value = collapseArrayIntoText(type == '1' ? textToBinary(toTranslate) : binaryToText(toTranslate), type == 1 ? " " : "");
};
const numberConvert = (event) => {
    let resultContainer = document.getElementById('result');
    let fromBase = document.getElementById('from').value;
    let toBase = document.getElementById('to').value;
    let source = document.getElementById('toConvert').value;
    if ([fromBase, toBase, source].some(i => i == null || i == "")) return alert("you must have input!");
    resultContainer.value = convertToBase(parseInt(toBase), parseInt(convertFromBase(parseInt(fromBase), parseInt(source))));
};
const validateBase = (event) => {
    let value = event.target.value;
    if (value.split("").map(item => parseInt(item)).some(item => item >= parseInt(document.getElementById('from').value))) {
        alert("number is not valid");
        event.target.value = value.substring(0, value.length - 1);
    }
};
const reset = (event) => {
    document.getElementById('toConvert').value = "";
    document.getElementById('result').value = "";
};