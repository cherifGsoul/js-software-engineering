const { ServedCity } = require("../../domain");

class FakeServedCities {
    #cities = []

    async add(servedCity) {
        this.#cities.push(servedCity)
    }

    async get(city) {
        return this.#cities.find(servedCity => {
            return servedCity.equals(ServedCity.fromString(city))
        })
    }
}

module.exports = FakeServedCities;