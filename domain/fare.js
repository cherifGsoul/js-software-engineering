const { isPositiveNumber } = require("./predicates")

class Fare {
    #amount

    constructor(amount) {
        this.#amount = amount
    }

    get amount () {
        return this.#amount
    }

    equals(other) {
        return other instanceof Fare && other.#amount === this.#amount
    }
}

const fromNumber = (amount) => {
    if (!isPositiveNumber(amount)) {
        throw new Error('Fare must be a positive number')
    }
    return new Fare(amount)
}

const isFare = (fare) => fare instanceof Fare

module.exports = {
    fromNumber,
    isFare
}