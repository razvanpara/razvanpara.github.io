const aboveBase10digits = {
    10: 'A',
    11: 'B',
    12: 'C',
    13: 'D',
    14: 'E',
    15: 'F'
};
const aboveBase10values = {
    'A': 10,
    'B': 11,
    'C': 12,
    'D': 13,
    'E': 14,
    'F': 15
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
const convertFromBase = (base, n) => n.toString().split("").map((item, index, arr) => Math.pow(base, (arr.length - 1) - index) * parseInt(item - 9 <= 0 ? item : aboveBase10values[item])).reduce((a, c) => a + c);
const stringToCharacterCodes = str => str.split("").map(ch => ch.charCodeAt(0));
const textToBaseArr = (text, toBase) => stringToCharacterCodes(text).map(cc => convertToBase(toBase, cc));
const baseArrToText = (baseArr, fromBase) => baseArr.map(bcc => String.fromCharCode(convertFromBase(fromBase, bcc)));
const collapseArrayIntoText = (arr, separator) => arr.reduce((a, c) => `${a}${separator}${c}`);
const convert = (event, from, to) => {
    document.querySelectorAll("span").forEach(span => span.hidden = true);
    let sourceText = document.getElementById("text").value;
    if (sourceText != null) {
        let toTranslate = from == 99 ? sourceText : sourceText.split(` `);
        let baseFrom = parseInt(from);
        let baseTo = parseInt(to);
        document.getElementById("textResult").value = baseFrom == baseTo
            ? sourceText
            : from == 99 ? collapseArrayIntoText(textToBaseArr(toTranslate, baseTo), ` `)
                : collapseArrayIntoText(baseArrToText(toTranslate, baseFrom), "");
    }
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
const copyToClipboard = (event) => {
    event.preventDefault();
    if (event.target.value != null && event.target.value != "") {
        event.target.parentElement.querySelector("span").hidden = false;
        event.target.select();
        document.execCommand('copy');
    }
}