export function reduce (reducer, input, start = input[0]) {
  let result = start
  for (const e of input) {
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

export function flow (...fns) {
  return (input) =>
    reduce((lastResult, fn) => fn(lastResult), fns, input)
}
