const { isPositiveNumber } = require("./predicates")

class Distance {
    #value

    constructor(value) {
        this.#value = value
    }

    get value() {
        return this.#value
    }
}

const fromNumber = (n) => {
    if (!isPositiveNumber(n)) {
        throw new Error('distance must be a valid positive number')
    }
    return new Distance(n)
}

const isDistance = (distance) => distance instanceof Distance

module.exports = {
    fromNumber,
    isDistance
}