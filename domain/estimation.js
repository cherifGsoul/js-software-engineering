const { isEstimationId } = require('./estimation-id');
const Fare = require('./fare');
const { isItinerary } = require("./itinerary");

class Estimation {
    #id
    #itineray
    #fare

    constructor(id, itineray, fare) {
        this.#id = id
        this.#itineray = itineray
        this.#fare = fare
    }

    get fare() {
        return this.#fare;
    }

    get id () {
        return this.#id
    }
}

const from = (id, itinerary, fare) => {
    const isValid = isEstimationId(id) && isItinerary(itinerary) && Fare.isFare(fare)
    if (!isValid) throw new Error('Trying to istantiate invalid estimation')
    return new Estimation(id, itinerary, fare)
}

const baseFare = 5;
const farePerKm = 1;

const forItinerary = (itinerary) => {
    if (!isItinerary(itinerary)) {
        throw new Error('Estimation itineray must be valid itineray instance')
    }
    const calculatedFare = itinerary.distance.value * farePerKm + baseFare;
    return Fare.fromNumber(calculatedFare);
}

module.exports = {
    forItinerary,
    from
}