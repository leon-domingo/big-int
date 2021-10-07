const BigInt = require('./index')

describe('BigInt operations', () => {
  it('can create a big number from another big number', () => {
    const strNumber = '1234567890'
    const bigNumber = new BigInt(strNumber)
    const newBigNumber = new BigInt(bigNumber)
    expect(newBigNumber.toString()).toBe(strNumber)
  })

  it('"plus" operation does not mutate numbers', () => {
    const strNumber = '11111'
    const bigNumber1 = new BigInt(strNumber)
    const bigNumber2 = new BigInt(strNumber)

    bigNumber1.plus(bigNumber2)
    expect(bigNumber1.toString()).toBe(strNumber)
    expect(bigNumber2.toString()).toBe(strNumber)
  })

  it('sums two numbers into a new number', () => {
    const bigNumber1 = new BigInt(11111)
    const bigNumber2 = new BigInt('11111')

    const sum = bigNumber1.plus(bigNumber2)
    expect(sum.toString()).toBe('22222')
  })

  it('sums two numbers of different length into a new number', () => {
    const bigNumber1 = new BigInt('111')
    const bigNumber2 = new BigInt('111111111111')

    const sum = bigNumber1.plus(bigNumber2)
    expect(sum.toString()).toBe('111111111222')
  })

  it('adds another number to an existing number (mutating the original)', () => {
    const bigNumber = new BigInt('1111')
    bigNumber.add(new BigInt('2222'))
    expect(bigNumber.toString()).toBe('3333')
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
