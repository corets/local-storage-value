import { createLocalValue } from "./createLocalValue"
import { Value } from "@corets/value"

describe("createLocalValue", () => {
  it("creates a hook store attached to local storage", () => {
    const store1 = createLocalValue("test", 1)

    expect(store1 instanceof Value).toBe(true)
    expect(store1.get()).toEqual(1)
    expect(JSON.parse(localStorage.getItem("test")!)).toEqual(1)

    store1.set(2)

    expect(store1.get()).toEqual(2)
    expect(JSON.parse(localStorage.getItem("test")!)).toEqual(2)

    const store2 = createLocalValue("test", 1)

    expect(store2.get()).toEqual(2)
  })

  it("reuses instances based on the storage key", () => {
    const value1 = createLocalValue("foo", 1)
    const value2 = createLocalValue("bar", 1)
    const value3 = createLocalValue("foo", 1)

    expect(value1 === value2).toBe(false)
    expect(value1 === value3).toBe(true)
  })
})
