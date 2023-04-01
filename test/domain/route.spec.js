describe('route', () => {
    it('should be instantiated from valid origin an destination addersses', () => {
        expect(() => Route.between('', '')).toThrowError()
    })
})