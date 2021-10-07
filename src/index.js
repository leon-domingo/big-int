class BigInt {
  constructor(intNumber) {
    this.number = intNumber.toString().replace(/[^\d]/ig, '')
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
      .filter(digit => /\d/.test(digit))
    return new BigInt(newArr.join(''))
  }

  add(anotherNumber) {
    const thisNumberArr = this.toArray().reverse()
    const thisNumberLength = thisNumberArr.length
    let index1 = 0

    const anotherNumberArr = anotherNumber.toArray().reverse()
    const anotherNumberLength = anotherNumberArr.length
    let index2 = 0

    const sumArr = [];
    let rest = 0
    while (index1 < thisNumberLength || index2 < anotherNumberLength) {
      const value1 = thisNumberArr[index1++] || 0
      const value2 = anotherNumberArr[index2++] || 0
      const sum = value1 + value2 + rest
      if (sum > 10) {
        rest = 1
        sumArr.push(sum - 10)
      } else {
        rest = 0
        sumArr.push(sum)
      }
    }
    sumArr.reverse()
    return new BigInt(sumArr.join(''))
  }

  static sum(...otherNumbers) {
    let bigSum = new BigInt(0)
    for (let anotherNumber of otherNumbers) {
      bigSum = bigSum.add(anotherNumber)
    }
    return bigSum
  }
}

module.exports = BigInt;
