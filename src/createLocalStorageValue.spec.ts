import { createLocalStorageValue } from "./createLocalStorageValue"
import { Value } from "@corets/value"

describe("createLocalStorageValue", () => {
  it("creates a hook store attached to local storage", () => {
    const key = Math.random().toString()
    const store1 = createLocalStorageValue(key, 1)

    expect(store1 instanceof Value).toBe(true)
    expect(store1.get()).toEqual(1)
    expect(JSON.parse(localStorage.getItem(key)!)).toEqual(1)

    store1.set(2)

    expect(store1.get()).toEqual(2)
    expect(JSON.parse(localStorage.getItem(key)!)).toEqual(2)

    const store2 = createLocalStorageValue(key, 1)

    expect(store2.get()).toEqual(2)
  })

  it("reuses instances based on the storage key", () => {
    const key1 = Math.random().toString()
    const key2 = `${key1}2`
    const value1 = createLocalStorageValue(key1, 1)
    const value2 = createLocalStorageValue(key2, 1)
    const value3 = createLocalStorageValue(key1, 1)

    expect(value1 === value2).toBe(false)
    expect(value1 === value3).toBe(true)
  })

  it("properly works with booleans", () => {
    const key = Math.random().toString()
    const store1 = createLocalStorageValue(key, false)

    expect(store1.get()).toEqual(false)
    expect(JSON.parse(localStorage.getItem(key)!)).toEqual(false)

    const store2 = createLocalStorageValue(key, true)

    expect(store2.get()).toEqual(false)
    expect(JSON.parse(localStorage.getItem(key)!)).toEqual(false)

    store1.set(true)

    expect(store1.get()).toEqual(true)
    expect(store2.get()).toEqual(true)
    expect(JSON.parse(localStorage.getItem(key)!)).toEqual(true)
  })
})
