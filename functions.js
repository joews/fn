//
// Values
//
function isUndefined (a) {
  return a === undefined
}

//
// Iterables
//
export function reduce (reducer, input, start) {
  let result = start
  for (const e of input) {
    if (isUndefined(result)) {
      result = e
    }

    result = reducer(result, e)
  }

  return result
}

export function * map (mapper, input) {
  for (const e of input) {
    yield mapper(e)
  }
}

export function * filter (filterer, input) {
  for (const e of input) {
    if (filterer(e)) {
      yield e
    }
  }
}

export function * take (n, input) {
  let outputCount = 0
  for (const e of input) {
    yield e
    if (++outputCount >= n) {
      return
    }
  }
}

export function toArray (input) {
  return [...input]
}

//
// Functions
//
export function flow (...fns) {
  return (input) => reduce((lastResult, fn) => fn(lastResult), fns, input)
}

export function autoPartial (argCount, fn) {
  return function (...args) {
    if (args.length >= argCount) {
      return fn(...args)
    } else {
      return fn.bind(this, ...args)
    }
  }
}

