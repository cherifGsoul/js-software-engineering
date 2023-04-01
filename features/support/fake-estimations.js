class FakeEstimations {
    #estimations = new Map()

    async save(estimation) {
        this.#estimations.set(estimation.id.toString(), estimation)
    }

    async forId(id) {
        return this.#estimations.get(id)
    }
}


module.exports = FakeEstimations