class FakeItineraries {
    #itineraries = new Map()

    async add(itinerary) {
        this.#itineraries.set(itinerary.route.toString(), itinerary)
    }

    async forRoute(route) {
        return this.#itineraries.get(route.toString())
    }
}

module.exports = FakeItineraries