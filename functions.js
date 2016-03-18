export function map (mapper, input) {
  const output = []
  for (const e of input) {
    output.push(mapper(e))
  }

  return output
}

export function reduce (reducer, input, start = input[0]) {
  let result = start
  for (const e of input) {
    result = reducer(e, result)
  }

  return result
}

export function filter (filterer, input) {
  const output = []
  for (const e of input) {
    if (filterer(e)) {
      output.push(e)
    }
  }

  return output
}
