const BigInt = require('./index')

describe('BigInt operations', () => {
  it('adds two numbers', () => {
    const bigNumber1 = new BigInt(11111)
    const bigNumber2 = new BigInt('11111')

    const sum = bigNumber1.add(bigNumber2)
    expect(sum.toString()).toBe('22222')
  })

  it('adds two numbers of different length', () => {
    const bigNumber1 = new BigInt('111')
    const bigNumber2 = new BigInt('111111111111')

    const sum = bigNumber1.add(bigNumber2)
    expect(sum.toString()).toBe('111111111222')
  })

  it('sums several numbers', () => {
    const bigNumber1 = new BigInt('1111')
    const bigNumber2 =  new BigInt('111')
    const bigNumber3 =   new BigInt('11')
    const bigNumber4 =    new BigInt('1')

    const sum = BigInt.sum(bigNumber1, bigNumber2, bigNumber3, bigNumber4)
    expect(sum.toString()).toBe('1234')
  })

  it('sums several numbers in an array', () => {
    const bigNumbers = [
      new BigInt('1111'),
      new BigInt('111'),
      new BigInt('11'),
      new BigInt('1'),
    ]

    const sum = BigInt.sum(...bigNumbers)
    expect(sum.toString()).toBe('1234')
  })

  it('returns an array with all the digits as numbers', () => {
    const bigNumber = new BigInt('12345')
    expect(bigNumber.toArray()).toEqual([1, 2, 3, 4, 5])
  })

  it('returns a string representation of the number', () => {
    const bigNumber = new BigInt(12345)
    expect(bigNumber.toString()).toBe('12345')
  })

  it('accepts separators in the input number', () => {
    const bigNumber1 = new BigInt('1_234_567')
    expect(bigNumber1.toString()).toBe('1234567')

    const bigNumber2 = new BigInt('1.234.567')
    expect(bigNumber2.toString()).toBe('1234567')
  })

  it('accepts an array of digits', () => {
    const bigNumber = BigInt.fromArray(['1', 2, 3, '.', 4, '5'])
    expect(bigNumber.toString()).toBe('12345')
  })

  it('accepts an array of numbers', () => {
    const bigNumber = BigInt.fromArray(['11', '###', 23, 34, '.', 45, '56'])
    expect(bigNumber.toString()).toBe('1123344556')
  })
})
