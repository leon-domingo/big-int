class BigInt {
  /**
   * Creates a `BigInt` instance
   * @param {string|number|BigInt} intNumber The big number representation
   */
  constructor(intNumber) {
    const strNumber = intNumber.toString()
    if (!/^\d+$/.test(strNumber)) {
      throw `"${strNumber}" is not a valid representation of an integer`
    }
    this.number = strNumber.replace(/^0+/g, '') || '0'
  }

  toString() {
    return this.number
  }

  toArray() {
    return this.number.split('').map(Number)
  }

  static fromArray(arr) {
    const newArr = arr
      .map(digit => digit.toString())
      .reduce((acc, item) => {
        return acc.concat(item.split(''))
      }, [])
    return new BigInt(newArr.join(''))
  }

  plus(anotherNumber) {
    const thisNumberArr = this.toArray().reverse()
    const thisNumberLength = thisNumberArr.length
    let index1 = 0

    const anotherNumberArr = new BigInt(anotherNumber).toArray().reverse()
    const anotherNumberLength = anotherNumberArr.length
    let index2 = 0

    const sumArr = [];
    let rest = 0
    while (index1 < thisNumberLength || index2 < anotherNumberLength) {
      const value1 = thisNumberArr[index1++] || 0
      const value2 = anotherNumberArr[index2++] || 0
      const sum = value1 + value2 + rest
      if (sum >= 10) {
        rest = 1
        sumArr.push(sum - 10)
      } else {
        rest = 0
        sumArr.push(sum)
      }
    }
    if (rest > 0) {
      const restArr = rest
        .toString()
        .split('')
        .reverse().map(Number)
      sumArr.push(...restArr)
    }
    const sumStr = sumArr.reverse().join('')
    return new BigInt(sumStr)
  }

  add(...otherNumbers) {
    let bigSum = new BigInt(this.number)
    for (let anotherNumber of otherNumbers) {
      bigSum = bigSum.plus(anotherNumber)
    }
    this.number = bigSum.toString()
  }

  addAll(otherNumbers) {
    this.add(...otherNumbers)
  }

  static sum(...otherNumbers) {
    let bigSum = new BigInt(0)
    for (let anotherNumber of otherNumbers) {
      bigSum = bigSum.plus(anotherNumber)
    }
    return bigSum
  }

  static sumAll(otherNumbers) {
    return BigInt.sum(...otherNumbers)
  }
}

module.exports = BigInt;
