const BigInt = require('./index')

describe('BigInt operations', () => {
  it('can create a big number from another big number', () => {
    const strNumber = '1234567890'
    const bigNumber = new BigInt(strNumber)
    const newBigNumber = new BigInt(bigNumber)
    expect(newBigNumber.toString()).toBe(strNumber)
  })

  describe('only a valid representation of an integer is accepted', () => {
    it('does not accept letters', () => {
      const value1 = 'abc'
      expect(() => {
        new BigInt(value1)
      }).toThrowError(`"${value1}" is not a valid representation of an integer`)
    })

    it('does not accept symbols', () => {
      const value2 = '1,234'
      expect(() => {
        new BigInt(value2)
      }).toThrowError(`"${value2}" is not a valid representation of an integer`)
    })

    it('does not accept separators', () => {
      const value3 = '1_234'
      expect(() => {
        new BigInt(value3)
      }).toThrowError(`"${value3}" is not a valid representation of an integer`)
    })

    it('does not accept an empty string', () => {
      const value4 = ''
      expect(() => {
        new BigInt(value4)
      }).toThrowError(`"${value4}" is not a valid representation of an integer`)
    })

    it('does not accept an array', () => {
      const value5 = [1, 2, 3, 4]
      expect(() => {
        new BigInt(value5)
      }).toThrowError(`"${value5}" is not a valid representation of an integer`)
    })

    it('does not accept objects', () => {
      const value6 = {foo: 'bar'}
      expect(() => {
        new BigInt(value6)
      }).toThrowError(`"${value6}" is not a valid representation of an integer`)
    })

    it('does not accept decimal numbers', () => {
      const value7 = 1.234
      expect(() => {
        new BigInt(value7)
      }).toThrowError(`"${value7}" is not a valid representation of an integer`)
    })

    it('does not accept spaces at the beginning', () => {
      const value8 = ' 1234'
      expect(() => {
        new BigInt(value8)
      }).toThrowError(`"${value8}" is not a valid representation of an integer`)
    })

    it('does not accept spaces at the end', () => {
      const value9 = '1234 '
      expect(() => {
        new BigInt(value9)
      }).toThrowError(`"${value9}" is not a valid representation of an integer`)
    })
  })

  describe('"plus" is a non-mutating operation', () => {
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

    it('sums a big number and a string representation of a big number', () => {
      const bigNumber1 = new BigInt(11111)
      const bigNumber2 = '11111'

      const sum = bigNumber1.plus(bigNumber2)
      expect(sum.toString()).toBe('22222')
    })

    it('sums two numbers of different length into a new number', () => {
      const bigNumber1 = new BigInt('111')
      const bigNumber2 = new BigInt('111111111111')

      const sum = bigNumber1.plus(bigNumber2)
      expect(sum.toString()).toBe('111111111222')
    })

    it('sums two numbers (with "rest" result) into a new number', () => {
      const bigNumber = new BigInt('9')

      const sum = bigNumber.plus(new BigInt('9'))
      expect(sum.toString()).toBe('18')

      const sum2 = bigNumber.plus(new BigInt('99'))
      expect(sum2.toString()).toBe('108')

      const sum3 = bigNumber.plus(new BigInt('999'))
      expect(sum3.toString()).toBe('1008')
    })
  })

  describe('"add" is a mutating operation', () => {
    it('adds another number to an existing one, mutating the latter', () => {
      const bigNumber = new BigInt('1111')
      bigNumber.add(new BigInt('2222'))
      expect(bigNumber.toString()).toBe('3333')
    })

    it('adds a string representation of a number to an existing number, mutating the latter', () => {
      const bigNumber = new BigInt('1111')
      bigNumber.add('2222')
      expect(bigNumber.toString()).toBe('3333')
    })

    it('adds several numbers', () => {
      const bigNumber1 = new BigInt('1111')
      const bigNumber2 =  new BigInt('111')
      const bigNumber3 =   new BigInt('11')
      const bigNumber4 =    new BigInt('1')

      bigNumber1.add(bigNumber2, bigNumber3, bigNumber4)
      expect(bigNumber1.toString()).toBe('1234')
    })

    it('adds several numbers from an array', () => {
      const bigNumber1 = new BigInt('1111')
      const bigNumbers = [
        new BigInt('111'),
        new BigInt('11'),
        new BigInt('1'),
      ]

      bigNumber1.addAll(bigNumbers)
      expect(bigNumber1.toString()).toBe('1234')
    })

    it('sums several numbers', () => {
      const bigNumber1 = new BigInt('1111')
      const bigNumber2 =  new BigInt('111')
      const bigNumber3 =   new BigInt('11')
      const bigNumber4 =    new BigInt('1')

      const sum = BigInt.sum(bigNumber1, bigNumber2, bigNumber3, bigNumber4)
      expect(sum.toString()).toBe('1234')
    })

    it('sums several numbers in an array using spread operator', () => {
      const bigNumbers = [
        new BigInt('1111'),
        new BigInt('111'),
        new BigInt('11'),
        new BigInt('1'),
      ]

      const sum = BigInt.sum(...bigNumbers)
      expect(sum.toString()).toBe('1234')
    })

    it('sums several numbers in an array', () => {
      const bigNumbers = [
        new BigInt('1111'),
        new BigInt('111'),
        new BigInt('11'),
        new BigInt('1'),
      ]

      const sum = BigInt.sumAll(bigNumbers)
      expect(sum.toString()).toBe('1234')
    })
  })

  it('removes leading zeroes on creation', () => {
    const number = new BigInt('0000')
    expect(number.toString()).toBe('0')
    expect(number.plus('00001111').toString()).toBe('1111')
  })

  it('returns an array with all the digits as numbers', () => {
    const bigNumber = new BigInt('12345')
    expect(bigNumber.toArray()).toEqual([1, 2, 3, 4, 5])
  })

  it('returns a string representation of the number', () => {
    const bigNumber = new BigInt(12345)
    expect(bigNumber.toString()).toBe('12345')
  })

  it('accepts an array of digits', () => {
    const bigNumber = BigInt.fromArray(['1', 2, 3, 4, '5'])
    expect(bigNumber.toString()).toBe('12345')
  })

  it('accepts an array of numbers', () => {
    const bigNumber = BigInt.fromArray(['11', 23, 34, 45, '56'])
    expect(bigNumber.toString()).toBe('1123344556')
  })
})
