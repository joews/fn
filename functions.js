// @flow

//
// Values
//
function isUndefined (a) {
  return a === undefined
}

//
// Iterables
//
export function reduce (reducer: Function, input: Iterable, start: any): any {
  let result = start
  for (const e of input) {
    if (isUndefined(result)) {
      result = e
    }

    result = reducer(result, e)
  }

  return result
}

export function * map (mapper: Function, input: Iterable): Iterable {
  for (const e of input) {
    yield mapper(e)
  }
}

export function * filter (filterer: Function, input: Iterable): Iterable {
  for (const e of input) {
    if (filterer(e)) {
      yield e
    }
  }
}

export function * take (n: number, input: Iterable): Iterable {
  let outputCount = 0
  for (const e of input) {
    yield e
    if (++outputCount >= n) {
      return
    }
  }
}

// FIXME input should be Iterable
// Blocked on https://github.com/facebook/flow/issues/1059
export function toArray (input: any): Array<any> {
  return [...input]
}

//
// Functions
//
export function flow (...fns: Array<Function>): Function {
  return (input) => reduce((lastResult, fn) => fn(lastResult), fns, input)
}

export function autoPartial (argCount: number, fn: Function): Function {
  return function (...args: Array<any>) {
    if (args.length >= argCount) {
      return fn(...args)
    } else {
      return fn.bind(this, ...args)
    }
  }
}

