const { isNonEmptyString } = require("./predicates")
const { isServedCity } = require("./served-city")

class Address {
    #street
    #city

    constructor(street, city) {
        this.#street = street
        this.#city = city
    }

    get street() {
        return this.#street
    }

    get city() {
        return this.#city
    }
}

const from = (street, city) => {
    const isValid = isNonEmptyString(street) && isServedCity(city)
    if (!isValid) {
        throw new Error('An address must have a valid street and city values')
    }
    return new Address(street, city)
}

const isAddress = (address) => address instanceof Address

module.exports = {
    from,
    isAddress
}