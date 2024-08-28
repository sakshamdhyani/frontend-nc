export default function formatPrice(number) {
    if (number === undefined || number === null) {
        // Handle the case where number is undefined or null
        return '0'; // or any default value you prefer
    }

    // Convert the number to a string
    let [integerPart, decimalPart] = number.toString().split('.');

    // Process the integer part to format according to the Indian numbering system
    let lastThree = integerPart.slice(-3);
    let otherNumbers = integerPart.slice(0, -3);
    if (otherNumbers !== '') {
        lastThree = ',' + lastThree;
    }
    let formattedInteger = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

    // If there is a decimal part, concatenate it to the formatted integer part
    if (decimalPart !== undefined) {
        return formattedInteger + '.' + decimalPart;
    } else {
        return formattedInteger;
    }
}
