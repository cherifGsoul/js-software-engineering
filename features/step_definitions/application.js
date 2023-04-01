const { When } = require("@cucumber/cucumber");
const { Then } = require("@cucumber/cucumber");
const { setWorldConstructor } = require("@cucumber/cucumber");
const { Given, World } = require("@cucumber/cucumber");
const { expect } = require("chai");
const { EstimationService } = require("../../application");
const { ServedCity, Itinerary, Route, Address, Distance, Fare } = require("../../domain");
const FakeEstimations = require("../support/fake-estimations");
const FakeItineraries = require("../support/fake-itineraries");
const FakeServedCities = require("../support/fake-served-cities");

class ApplicationWorld extends World {
    constructor(options) {
        super(options)
        this.servedCities = new FakeServedCities()
        this.itineraries = new FakeItineraries()
        this.estimations = new FakeEstimations()
        this.estimationService = new EstimationService(this.servedCities, this.itineraries, this.estimations)
    }
}

setWorldConstructor(ApplicationWorld)

Given('{string} is a served city', async function (city) {
    this.servedCity = ServedCity.fromString(city)
    await this.servedCities.add(this.servedCity)
});

Given('a route between {string} and {string} in this city', function (originStreet, destinationStreet) {

    this.route = Route.between(
        Address.from(originStreet, this.servedCity),
        Address.from(destinationStreet, this.servedCity),
    )
});

Given('the itinerary distance for this route is {float} KM', async function (distance) {
    this.itinerary = Itinerary.forRoute(this.route, Distance.fromNumber(distance));
    await this.itineraries.add(this.itinerary)
});

When('I request an estimation for a ride for this route', async function () {
    this.estimationId = await this.estimationService.estimate({
        origin: {
            street: this.route.origin.street,
            city: this.route.origin.city.city,
        },
        destination: {
            street: this.route.destination.street,
            city: this.route.destination.city.city,
        }
    });
});

Then('the estimated price should be ${float}', async function (fare) {
    const estimation = await this.estimationService.forId(this.estimationId)
    const expectedFare = Fare.fromNumber(fare)
    expect(estimation.fare.equals(expectedFare)).to.be.true;
});