import { ObservableValue } from "@corets/value"

export type CreateLocalStorageValue = <TValue>(
  storageKey: string,
  initialValue: TValue
) => ObservableValue<TValue>
