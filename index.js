import * as fn from './functions'

export function autoPartial (argCount, fn) {
  return function (...args) {
    if (args.length >= argCount) {
      return fn(...args)
    } else {
      return fn.bind(this, ...args)
    }
  }
}

export const map = autoPartial(2, fn.map)
export const reduce = autoPartial(2, fn.reduce)
export const filter = autoPartial(2, fn.filter)
export const flow = fn.flow
