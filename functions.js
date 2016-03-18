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

export function map (mapper, input) {
  return reduce((result, e) => [...result, mapper(e)], input, [])
}

export function filter (filterer, input) {
  return reduce((result, e) => (
    filterer(e)
      ? [...result, e]
      : result
  ), input, [])
}

export function take (n, input) {
  const output = []
  for (const e of input) {
    output.push(e)
    if (output.length >= n) {
      break
    }
  }

  return output
}

//
// Functions
//
export function flow (...fns) {
  return (input) => reduce((lastResult, fn) => fn(lastResult), fns, input)
}
