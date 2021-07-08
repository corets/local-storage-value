import { ObservableValue, createValue } from "@corets/value"
import {
  readLocalStorage,
  writeLocalStorage,
} from "@corets/local-storage-helpers"
import { CreateLocalStorageValue } from "./types"

const cache: Record<string, ObservableValue> = {}

export const createLocalStorageValue: CreateLocalStorageValue = <TValue>(
  storageKey,
  initialValue
) => {
  let value = cache[storageKey] as ObservableValue<TValue>

  if (value === undefined) {
    value = createValue(readLocalStorage(storageKey, initialValue) as TValue)
    value.listen((newValue) => writeLocalStorage(storageKey, newValue), {
      immediate: true,
    })
    cache[storageKey] = value
  }

  return value
}
