class ServedCity {
    #city;

    constructor(city) {
        this.#city = city;
    }

    get city() {
        return this.#city
    }

    equals(other) {
        return other instanceof ServedCity && this.#city === other.#city
    }
}

const fromString = (city) => {
    if (!city) throw new Error('served city must be a valid non-empty string')
    return new ServedCity(city)
}

const isServedCity = (city) => city instanceof ServedCity

module.exports = {
    fromString,
    isServedCity
}