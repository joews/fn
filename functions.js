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

export function toArray (input: Iterable): Array<any> {
  // flow flags [...input] as a type error because of https://github.com/facebook/flow/issues/1059
  return Array.from(input)
}

//
// Functions
//
export function flow (...fns: Array<Function>): Function {
  return (input) => reduce((lastResult, fn) => fn(lastResult), fns, input)
}

export function autoPartial (argCount: number, fn: Function): Function {
  return function (...args) {
    if (args.length >= argCount) {
      return fn.call(this, ...args)
    } else {
      return fn.bind(this, ...args)
    }
  }
}

// type checking on autoPartial doesn't work because we lose the 
//  specifics of the types passed to the inner function.
// In the same way, types can't be checked here:
function call(fn: Function, arg: any) {
  fn(arg);
}

function a(x: number) {
  console.log(x * 2);
}

// a(10);
// call(a, "20");
