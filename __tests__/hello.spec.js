const hello = require('../src/hello')
describe('A simple hello module', () => {
  it('Should do simple math', () => {
    expect(hello.sum(5, 9)).toBe(14)
  })
})
