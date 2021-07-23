const textToMorse = (text) => {
    text = text.toUpperCase();
    const unitSpace = ' ';
    const letterSpace = Array(3).fill(unitSpace).join('');
    const wordSpace = Array(7).fill(unitSpace).join('');;
    const letterToMorse = {
        'A': "._",
        'B': "_...",
        'C': "_._.",
        'D': "_..",
        'E': ".",
        'F': ".._.",
        'G': "__.",
        'H': "....",
        'I': "..",
        'J': ".___",
        'K': "_._",
        'L': "._..",
        'M': "__",
        'N': "_.",
        'O': "___",
        'P': ".__.",
        'Q': "__._",
        'R': "._.",
        'S': "...",
        'T': "_",
        'U': ".._",
        'V': "..._",
        'W': ".__",
        'X': "_.._",
        'Y': "_.__",
        'Z': "__..",
        '1': ".____",
        '2': "..___",
        '3': "...__",
        '4': "...._",
        '5': ".....",
        '6': "_....",
        '7': "__...",
        '8': "___..",
        '9': "____.",
        '0': "_____",
    };
    const morseWords = text.split(' ')
        .map(word => {
            const morseLetters = word.split('')
                .map(letter => letterToMorse[letter].split('').join(unitSpace));
            return morseLetters.join(letterSpace);
        })
    return morseWords.join(wordSpace);
};
const morseToText = (morseText) => {
    const unitSpace = ' ';
    const letterSpace = Array(3).fill(unitSpace).join('');
    const wordSpace = Array(7).fill(unitSpace).join('');;
    const morseToLetter = {
        "_____": "0",
        ".____": "1",
        "..___": "2",
        "...__": "3",
        "...._": "4",
        ".....": "5",
        "_....": "6",
        "__...": "7",
        "___..": "8",
        "____.": "9",
        "._": "A",
        "_...": "B",
        "_._.": "C",
        "_..": "D",
        ".": "E",
        ".._.": "F",
        "__.": "G",
        "....": "H",
        "..": "I",
        ".___": "J",
        "_._": "K",
        "._..": "L",
        "__": "M",
        "_.": "N",
        "___": "O",
        ".__.": "P",
        "__._": "Q",
        "._.": "R",
        "...": "S",
        "_": "T",
        ".._": "U",
        "..._": "V",
        ".__": "W",
        "_.._": "X",
        "_.__": "Y",
        "__..": "Z"
    };
    const words = morseText.split(wordSpace)
        .map(morseWord => {
            const morseLetters = morseWord.split(letterSpace)
                .map(morseLetter => morseToLetter[morseLetter.split(unitSpace).join('')]);
            return morseLetters.join('');
        })
    return words.join(' ');
};

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
const textToBaseArr = (text, toBase) => text != null && text.length > 0 ? stringToCharacterCodes(text).map(cc => convertToBase(toBase, cc)) : [];
const baseArrToText = (baseArr, fromBase) => baseArr.map(bcc => String.fromCharCode(convertFromBase(fromBase, bcc)));
const collapseArrayIntoText = (arr, separator) => arr.reduce((a, c) => `${a}${separator}${c}`);
const convert = (event) => {
    try {
        console.clear();
        encodeAll(event.target.value);
        decodeAll(event.target.value);
    }
    catch (e) {
        console.log(e);
    }
    document.querySelectorAll("span").forEach(span => span.hidden = true);
    let sourceText = document.getElementById("text").value;
    let checkedOption = document.querySelector("input[type='radio']:checked");
    if (sourceText != null && sourceText != "") {
        let from = checkedOption.attributes['from'].value;
        let to = checkedOption.attributes['to'].value;
        if (from == 'base64' || to == 'base64') {
            document.getElementById("textResult").value = from == to
                ? sourceText
                : from == 99 ? btoa(sourceText)
                    : atob(sourceText);
            return;
        }
        else if (from == 'morse' || to == 'morse') {
            document.getElementById("textResult").value = from == to
                ? sourceText
                : from == 99 ? textToMorse(sourceText)
                    : morseToText(sourceText);
            return;
        }
        let baseFrom = parseInt(from);
        let baseTo = parseInt(to);
        let toTranslate = baseFrom == 99 ? sourceText : sourceText.split(` `);
        document.getElementById("textResult").value = baseFrom == baseTo
            ? sourceText
            : baseFrom == 99 ? collapseArrayIntoText(textToBaseArr(toTranslate, baseTo), ` `)
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
    let parent = event.target.parentElement;
    let textArea = parent.querySelector("textarea");
    if (textArea.value != null && textArea.value != "") {
        parent.querySelector("span").hidden = false;
        textArea.select();
        document.execCommand('copy');
        event.target.focus();
    }
}
const binary = 2;
const octal = 8;
const hexadecimal = 16;
var getChars = (str, separator = "") => str.split(separator);
var getString = (charsArr, separator = "") => charsArr.join(separator);
var charsToCodes = charsArr => charsArr.map(c => c.charCodeAt(0));
var codesToChars = codesArr => codesArr.map(cc => String.fromCharCode(cc));
var convertTo = (numArr, baseFrom, baseTo) => numArr.map(n => parseInt(n, baseFrom).toString(baseTo));
var encodeStr = (str, to) => getString(convertTo(charsToCodes(getChars(str)), 10, to), " ").toUpperCase();
var decodeStr = (str, from) => getString(codesToChars(convertTo(getChars(str, " "), from, 10)));
var binEncode = str => encodeStr(str, binary);
var binDecode = str => decodeStr(str, binary);
var octEncode = str => encodeStr(str, octal);
var octDecode = str => decodeStr(str, octal);
var hexEncode = str => encodeStr(str, hexadecimal);
var hexDecode = str => decodeStr(str, hexadecimal);
var encodeAll = str => {
    console.log("encoded:");
    console.log(`binary: ${binEncode(str)}`);
    console.log(`octal: ${octEncode(str)}`);
    console.log(`hexadecimal: ${hexEncode(str)}`);
};
var decodeAll = str => {
    console.log("decoded:");
    console.log(`binary: ${binDecode(str)}`);
    console.log(`octal: ${octDecode(str)}`);
    console.log(`hexadecimal: ${hexDecode(str)}`);
};