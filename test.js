import { map, reduce, filter } from './'

const a = [1, 2, 3, 4, 5]

const x2 = map((x) => x * 2)
const odd = filter((x) => x % 2)
const sum = reduce((a, e) => a + e)

console.log(x2(a))
console.log(odd(a))
console.log(sum(a))
console.log(map((a) => a * 3, a))
