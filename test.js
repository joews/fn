import { map, reduce, filter, flow } from './'

const a = [1, 2, 3, 4, 5]

function * g () {
  for (const i of a) {
    yield i
  }
}

const x2 = map((x) => x * 2)
const odd = filter((x) => x % 2)
const sum = reduce((a, e) => a + e)
const oddDoubleSum = flow(odd, x2, sum)

console.log(x2(a))
console.log(x2(g()))
console.log(odd(a))
console.log(odd(g()))
console.log(sum(a))
console.log(sum(g()))
console.log(map((e) => e * 3, a))
console.log(map((e) => e * 3, g()))
console.log(oddDoubleSum(a))
console.log(oddDoubleSum(g()))
