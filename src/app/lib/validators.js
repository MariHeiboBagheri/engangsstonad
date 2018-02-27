/* eslint-disable */
import { mod11OfNumberWithControlDigit } from './';

export function isNumeric(value) {
    const n = value.toString().replace(',', '.');
    return !isNaN(parseFloat(n)) && isFinite(n);
}

export function hasValue(element) {
    if (element.type === 'number') {
        return (element.validity.badInput || isNumeric(element.value));
    } else if (element.type === 'select-one') {
        return element.value !== '-1';
    }
    return element.value.length !== 0;
}

export function isLongerThan(value, minLength) {
    return value.length > minLength;
}

export function isShorterThan(value, maxLength) {
    return value.length < (maxLength + 1);
}

export function isIE() {
    const myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') !== -1) ? parseInt(myNav.split('msie')[1], 10) : false;
}

export function hasLength(value, length) {
    return value.toString().length === length;
}

export function hasLengthRange(value, min, max) {
    const length = value.toString().length;
    return (length >= min && length <= max);
}

export function isInRange(value, min, max) {
    const v = value;
    return (isNumeric() && (v >= min) && (v <= max));
}

export function isGT(value, min) {
    return (isNumeric() && value >= min);
}

export function isLT(value, max) {
    return (isNumeric() && value <= max);
}

export function matchesPattern(value, pattern, modifiers) {
    return new RegExp(pattern, modifiers).test(value);
}

export function isEmailFormat(value, modifiers) {
    // eslint-disable-next-line max-len
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return matchesPattern(value, emailRegex, modifiers);
}

export function isBirthNumFormat(value) {
    const birthNumber = value.toString();

    function sumFn(bNum, factors) {
        let sum = 0;
        for (let i = 0, l = factors.length; i < l; ++i) { // eslint-disable-line no-plusplus
            sum += parseInt(bNum.charAt(i), 10) * factors[i];
        }
        return sum;
    }

    let checksum1 = 11 - (sumFn(birthNumber, [3, 7, 6, 1, 8, 9, 4, 5, 2]) % 11);
    if (checksum1 === 11) checksum1 = 0;
    let checksum2 = 11 - (sumFn(birthNumber, [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]) % 11);
    if (checksum2 === 11) checksum2 = 0;
    return checksum1 === parseInt(birthNumber.charAt(9), 10)
            && checksum2 === parseInt(birthNumber.charAt(10), 10);
}

export function isAccountNumFormat(value) {
    const accountNum = value.toString();
    return parseInt(accountNum.charAt(accountNum.length - 1), 10)
        === mod11OfNumberWithControlDigit(accountNum);
}

export function isOrgNumFormat(value) {
    const orgNum = value.toString();
    return parseInt(orgNum.charAt(orgNum.length - 1), 10)
        === mod11OfNumberWithControlDigit(orgNum);
}
/* eslint-enable */
