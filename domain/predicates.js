const isNonEmptyString = (s) => typeof s === 'string' && s.length > 0;

const isPositiveNumber = (n) => typeof n === 'number' && n > 0

module.exports = {
    isNonEmptyString,
    isPositiveNumber
}