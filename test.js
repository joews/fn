import { map, reduce, filter, flow, take } from './'

const a = [1, 2, 3, 4, 5]

// bounded iterable
function * g () {
  for (const i of a) {
    yield i
  }
}

// unbounded iterable
function * infinite () {
  let i = 0
  while (1) {
    yield i++
  }
}

const x2 = map((x) => x * 2)
const odd = filter((x) => x % 2)
const sum = reduce((a, e) => a + e)
const oddDoubleSum = flow(odd, x2, sum)
const take3 = take(3)
const sumOfFirst100 = flow(take(100), sum)

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
console.log(take3(a))
console.log(take3(g()))
console.log(take3(infinite()))
console.log(sumOfFirst100(infinite()))
