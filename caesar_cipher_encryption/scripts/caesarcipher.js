function caesar_cipher_encode(text, offset) {
    const symbols = [' ', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const getNewIndex = (index, maxLength) => {
        return (index < 0
            // if index is negative we subtract it from maxLength to get the char at negative offset
            // we use + because using - with a negative value will end up adding to it
            ? maxLength + index
            // if index is more than the length, we must start again from the beginning 
            : index % maxLength);
    };
    const allowedSymbols = [...text].filter(char => symbols.includes(char));
    const transformed = allowedSymbols
        .map(char => symbols.indexOf(char) + offset)
        .map(index => symbols[getNewIndex(index, symbols.length)]);
    return transformed.join("");
}
function caesar_cipher_decode(text, offset) {
    return caesar_cipher_encode(text, -offset);
}

function encode_message(text, hexDigitOffset) {
    const hexAsDec = parseInt(hexDigitOffset, 16);
    // we add the hex offset to the end of the encoded string
    return caesar_cipher_encode(text, hexAsDec) + hexDigitOffset;
}
function decode_message(text) {
    const lastCharIndex = text.length - 1;
    // extracting the hex offset
    const hexDigitOffset = text[lastCharIndex];
    // converting it to decimal for use
    const hexOffsetAsDec = parseInt(hexDigitOffset, 16);

    const encodedText = text.slice(0, lastCharIndex);
    
    return caesar_cipher_decode(encodedText, hexOffsetAsDec);
}
const leText = "Az ";
const encoded = caesar_cipher_encode(leText, 1);
const decoded = caesar_cipher_decode(encoded, 1);

const encoded_m = encode_message(leText, '1');
const decoded_m = decode_message(encoded_m);

console.log(Array(16).fill(0).map((x, i) => x + i).map(c => c.toString(16)).map(offset => ({
    original: leText,
    encoded: encode_message(leText, offset),
    decoded: decode_message(encode_message(leText, offset)),
    offset
})));