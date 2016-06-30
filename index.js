import * as fn from './functions'
const { autoPartial } = fn

// Values
export const isUndefined = fn.isUndefined
export const isPromise = fn.isPromise

// Iterable
export const reduce = autoPartial(fn.reduce)
export const map = autoPartial(fn.map)
export const filter = autoPartial(fn.filter)
export const take = autoPartial(fn.take)
export const toArray = fn.toArray
export const head = fn.head
export const tail = fn.tail
export const split = autoPartial(fn.split)
export const splitWhen = autoPartial(fn.splitWhen)

// Functions
export const flow = fn.flow
export const pipe = fn.pipe

// Promises
export const delay = fn.delay
export const flowAsync = fn.flowAsync
export const pipeAsync = fn.pipeAsync
