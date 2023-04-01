const { isAddress } = require("./address")

class Route {
    #origin
    #destination

    constructor(origin, destination) {
        this.#origin = origin
        this.#destination = destination
    }

    get origin() {
        return this.#origin
    }

    get destination() {
        return this.#destination
    }

    toString() {
        return `[
            origin: ${this.#origin.street} - ${this.#origin.city} -> origin: ${this.#destination.street} - ${this.#destination.city}
        ]`
    }
}

const between = (origin, destination) => {
    if (!isAddress(origin) || !isAddress(destination)) {
        throw new Error('origin and destination must be valid addresses')
    }
    return new Route(origin, destination)
}

const isRoute = (route) => route instanceof Route

module.exports = {
    between,
    isRoute
}