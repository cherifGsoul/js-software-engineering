const { Then } = require("@cucumber/cucumber");
const { When } = require("@cucumber/cucumber");
const { Given } = require("@cucumber/cucumber");
const { expect } = require("chai");
const { Fare } = require("../../domain");

const Domain = require('../../domain');

Given('{string} is a served city', function (city) {
    this.servedCity = Domain.ServedCity.fromString(city)
});

Given('a route between {string} and {string} in this city', function (origin, destination) {
    const originAddress = Domain.Address.from(origin, this.servedCity)
    const destinationAddress =  Domain.Address.from(destination, this.servedCity)
    this.route = Domain.Route.between(originAddress, destinationAddress)
});

Given('the itinerary distance for this route is {float} KM', function (distance) {
    this.itinerary = Domain.Itinerary.forRoute(this.route, Domain.Distance.fromNumber(distance))
});

When('I request an estimation for a ride for this route', function () {
    this.fare = Domain.Estimation.forItinerary(this.itinerary)
});

Then('the estimated price should be ${float}', function (fare) {
    const expectedFare = Fare.fromNumber(fare)
    expect(this.fare.equals(expectedFare)).to.be.true;
});