//
// Functions
//
export function autoPartial (fn) {
  return function (...args) {
    if (args.length >= fn.length) {
      return fn(...args)
    } else {
      return fn.bind(this, ...args)
    }
  }
}

const _ = autoPartial

export function flow (...fns) {
  return (input) => reduce((lastResult, fn) => fn(lastResult), input, fns)
}

export const pipe = _(function pipe (value, ...fns) {
  return flow(...fns)(value)
})

//
// Values
//
export function isUndefined (a) {
  return typeof a === 'undefined'
}

export function isPromise (a) {
  return a instanceof Promise
}

//
// Iterables
//
export const reduce = _(function reduce (reducer, start, input) {
  let result = start
  for (const e of input) {
    result = reducer(result, e)
  }

  return result
})

export const map = _(function * map (mapper, input) {
  for (const e of input) {
    yield mapper(e)
  }
})

export const filter = _(function * filter (filterer, input) {
  for (const e of input) {
    if (filterer(e)) {
      yield e
    }
  }
})

export const take = _(function * take (n, input) {
  let outputCount = 0
  for (const e of input) {
    yield e
    if (++outputCount >= n) {
      return
    }
  }
})

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

export const splitWhen = _(function * splitWhen (predicate, input) {
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
})

export const split = _(function split (batchSize, input) {
  const splitter = (_, batch) => batch.length >= batchSize
  return splitWhen(splitter, input)
})

// Returns an iterable that yields values from each input iterable
// TODO
export const merge = _(function * merge (...iterables) {
  for (const iterable of iterables) {
    for (const e of iterable) {
      yield e
    }
  }
})

//
// Promises
//

// Returns a lazy async thunk that resolves to `value` after at least `delayInMs`
export function delay (delayInMs) {
  return (value) => new Promise((resolve) => {
    setTimeout(() => resolve(value), delayInMs)
  })
}

export function flowAsync (...fns) {
  return (input) => reduce((lastPromise, fn) => lastPromise.then(fn),
    Promise.resolve(input),
    fns
  )
}

export function pipeAsync (value, ...fns) {
  return flowAsync(...fns)(value)
}
