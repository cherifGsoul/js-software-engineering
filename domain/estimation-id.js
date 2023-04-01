const UUID = require('uuid')

class EstimationId {
    #uuid

    constructor(uuid) {
        this.#uuid = uuid;
    }

    equal(other) {
        return other instanceof EstimationId && other.#uuid === this.#uuid
    }

    toString() {
        return this.#uuid
    }

}


const fromString = (uuid) => {
    if (!UUID.validate(uuid)) {
        throw new Error('Estimation ID must be valid UUID')
    }
    return new EstimationId(uuid)
}

const isEstimationId = (id) => id instanceof EstimationId

module.exports = {
    fromString,
    isEstimationId
}