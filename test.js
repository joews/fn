// @flow
import { map, reduce, filter, flow, take, toArray } from './'
import { map as bareMap } from "./functions"

const arr = [1, 2, 3, 4, 5]

function * bounded () {
  for (const i of arr) {
    yield i
  }
}

function * infinite () {
  let i = 0
  while (1) {
    yield i++
  }
}
const t = map(2)
const sum = reduce((sum, e) => e + sum)
const x3 = map((x) => x * 3)
const isEven = filter((x) => x % 2 === 1)
const first1k = take(1000)

const combo = flow(x3, isEven, first1k)
const comboSum = flow(combo, sum)
const comboArray = flow(combo, toArray)

console.log([...take(10, combo(infinite()))]) // don't log all 1k!
console.log(comboSum(infinite()))
console.log(comboArray(bounded()))

