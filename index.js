// @flow
import * as fn from './functions'
const { autoPartial } = fn

type AutoIterable = Function | Iterable
type AutoMap = (fn: Function, i?: Iterable) => AutoIterable

// Iterable
export const reduce = autoPartial(2, fn.reduce)
export const map : AutoMap
  = autoPartial(2, fn.map)
export const filter = autoPartial(2, fn.filter)
export const take = autoPartial(2, fn.take)
export const toArray = fn.toArray

// Functions
export const flow = fn.flow

// FLow loses type annotations going through autoPartial, so I wondered
// about applying them here. It's not 100% dupe of the map signature
// because of the ? on optional args, but it's close.
// When I run this atm I get:
// ^^^^^^^^ function type. Callable signature not found in. See: functions.js:58
// I guess because I say I return Iterable, but it could be a Function!
