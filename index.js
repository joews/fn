import * as fn from './functions'
const { autoPartial } = fn

// Iterable
export const reduce = autoPartial(2, fn.reduce)
export const map = autoPartial(2, fn.map)
export const filter = autoPartial(2, fn.filter)
export const take = autoPartial(2, fn.take)
export const toArray = fn.toArray

// Functions
export const flow = fn.flow
