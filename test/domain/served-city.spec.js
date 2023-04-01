const {ServedCity} = require('../../domain')

describe('ServedCity', () => {
    it('should throw if instantiated with empty string', () => {
        expect(() => ServedCity.fromString('')).toThrowError()
    });
})