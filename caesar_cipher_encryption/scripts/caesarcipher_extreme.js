let symbols = [' ', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', '\\', ']', '^', '_', '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~'];
function caesar_cipher(symbols, text, encode) {
    const getNewIndex = (index, maxLength) => {
        return (index < 0
            // if index is negative we subtract it from maxLength to get the char at negative offset
            // we use + because using - with a negative value will end up adding to it
            ? maxLength + index
            // if index is more than the length, we must start again from the beginning 
            : index % maxLength);
    };
    const reducer = (acc, char, index, array) => {
        const offset = index == 0
            // at index 0 we don't apply any offset
            ? 0
            : encode
                // if we encode, we get the offset from the last encoded character in the accumulator
                ? acc[index - 1]
                // if we decode, we get the offset from the previous character in the source array
                : -symbols.indexOf(array[index - 1]);
        const charIndex = symbols.indexOf(char);
        acc.push(charIndex + offset);
        return acc;
    }
    const allowedSymbols = [...text].filter(char => symbols.includes(char));
    const transformed = allowedSymbols
        .reduce(reducer, [])
        .map(index => symbols[getNewIndex(index, symbols.length)]);
    return transformed.join("");
}
function caesar_cipher_encode(symbols, text) {
    return caesar_cipher(symbols, text, true);
}
function caesar_cipher_decode(symbols, text) {
    return caesar_cipher(symbols, text, false);
}

// const text = "TEST SCRIPT";
// const tests = Array(5).fill(0).map(_ => {
//     const sym = symbols.map((x) => ({ x, s: Math.random() })).sort((x, y) => x.s - y.s).map(x => x.x);
//     const encoded = caesar_cipher_encode(sym, text);
//     const decoded = caesar_cipher_decode(sym, encoded);
//     return {
//         text,
//         chars: sym.join(''),
//         encoded,
//         decoded,
//         comp: text == decoded
//     }
// });

// console.log(tests);
// console.log(caesar_cipher_decode([...'{"Gu4o[sMDNI&=HTfh_v)3B(7p@P8S%]RO6x.J!^FVnC~ i-\\LU05EqKyY$?`1<,rz9lWXmk/ew#c}*dtag:Ab|\';+>Q2jZ'], 'H{iQuAy?~+dzfGgU{cq4)[gO2x'))



// html part
const plainText = document.getElementById("plainText");
const encodedText = document.getElementById("encodedText");
const characterSet = document.getElementById("characterSet");
const randomizeBtn = document.getElementById("randomize");


characterSet.value = symbols.join("")

plainText.addEventListener("input", (ev) => {
    const text = ev.target.value ?? "";
    encodedText.value = caesar_cipher_encode(characterSet.value, text);
});

encodedText.addEventListener("input", (ev) => {
    const text = ev.target.value ?? "";
    plainText.value = caesar_cipher_decode(characterSet.value, text);
});

randomizeBtn.addEventListener("click", (ev) => {
    const newVal = [...characterSet.value].map((c) => ({ c, r: Math.random() })).sort((a, b) => a.r - b.r).map(ob => ob.c).join("");
    characterSet.value = newVal;
    plainText.dispatchEvent(new Event("input"))
    encodedText.dispatchEvent(new Event("input"))
});