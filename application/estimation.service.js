const { Route, Address, Estimation, EstimationId } = require("../domain")
const UUID = require('uuid')

class EstimationService {
    #servedCities
    #itineraries
    #estimations

    constructor(servedCities, itineraries, estimations) {
        this.#servedCities = servedCities
        this.#itineraries = itineraries
        this.#estimations = estimations
    }

    async estimate({origin, destination}) {
        const originCity = await this.#servedCities.get(origin.city)
        const destinationCity = await this.#servedCities.get(destination.city)
        
        const parsedOrigin = Address.from(origin.street, originCity)
        const parsedDestination = Address.from(destination.street,destinationCity)
        const route = Route.between(parsedOrigin, parsedDestination)
        const itinerary = await this.#itineraries.forRoute(route)
        const fare = Estimation.forItinerary(itinerary)
        const estimation = Estimation.from(EstimationId.fromString(UUID.v4()), itinerary, fare)
        await this.#estimations.save(estimation);
        return estimation.id.toString();
    }

    async forId(id) {
        return this.#estimations.forId(id)
    }
}

module.exports = EstimationService