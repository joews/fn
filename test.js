import * as fn from '.'
Object.assign(global, fn);

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

function log (msg) {
  console.log(msg)
  return msg
}

function logThunk (msg) {
  return () => log(msg)
}

const logIterable = flow(toArray, log)

const sum = reduce((sum, e) => e + sum)
const x3 = map((x) => x * 3)
const isEven = filter((x) => x % 2 === 1)
const first1k = take(1000)
const pairs = split(2)
const wonkySplit = splitWhen((e, batch) => (e < 10)
  ? batch.length >= 5
  : batch.length >= 2
)

const combo = flow(x3, isEven, first1k)
const comboSum = flow(combo, sum)
const comboArray = flow(combo, toArray)
const comboAsync = flowAsync(comboArray, delay(750), log)

log([...take(10, combo(infinite()))]) // don't log all 1k!
log(comboSum(infinite()))
log(comboArray(bounded()))

pipe(infinite(), take(10), toArray, sum, log)
pipe(infinite(), head, log)
pipe(bounded(), tail, logIterable)
pipe(bounded(), tail, tail, tail, tail, tail, logIterable)

pipe(new Set([1, 1, 2, 3, 5]), pairs, logIterable)
pipe(infinite(), take(15), wonkySplit, logIterable)

delay(1000)('delay 1').then(log)
pipeAsync(bounded(), take(2), delay(500), logIterable, logThunk('before delay'), delay(500), logThunk('after delay'))
pipeAsync(bounded(), comboAsync, delay(750), logThunk('nested async flows done'))
