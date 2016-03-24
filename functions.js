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

export function head (input) {
  return [...take(1, input)][0]
}

export function * tail (input) {
  let isFirst = true
  for (const e of input) {
    if (isFirst) {
      isFirst = false
    } else {
      yield e
    }
  }
}

export function * splitWhen (predicate, input) {
  let nextBatch = []

  for (const e of input) {
    nextBatch.push(e)

    if (predicate(e, nextBatch)) {
      yield nextBatch
      nextBatch = []
    }
  }

  if (nextBatch.length > 0) {
    yield nextBatch
  }
}

export function split (batchSize, input) {
  const splitter = (_, batch) => batch.length >= batchSize
  return splitWhen(splitter, input)
}

//
// Functions
//
export function flow (...fns) {
  return (input) => reduce((lastResult, fn) => fn(lastResult), fns, input)
}

export function pipe (value, ...fns) {
  return flow(...fns)(value)
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
