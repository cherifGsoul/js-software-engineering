const { isDistance } = require("./distance")
const { isRoute } = require("./route")

class Itinerary {
    #route
    #distance

    constructor(route, distance) {
        this.#route = route
        this.#distance = distance
    }

    get route() {
        return this.#route
    }

    get distance () {
        return this.#distance
    }
}

const forRoute = (route, distance) => {
    if (!isRoute(route) || !isDistance(distance)) {
        throw new Error('Itinerary must have a valid route and a valid distance')
    }
    return new Itinerary(route, distance);
}

const isItinerary = (itinerary) => itinerary instanceof Itinerary

module.exports = {
    forRoute,
    isItinerary
}