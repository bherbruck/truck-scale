export type SerializeFn<T> = (value: T) => string
export type DeserializeFn<T> = (value: string) => T

export class LocalStorage<T> {
  // @ts-ignore
  value: T = $state<T>()
  key: string
  serializeFn: SerializeFn<T>
  deserializeFn: DeserializeFn<T>

  constructor(
    key: string,
    defaultValue: T,
    serializeFn: SerializeFn<T> = JSON.stringify,
    deserializeFn: DeserializeFn<T> = JSON.parse,
  ) {
    this.key = key
    this.serializeFn = serializeFn
    this.deserializeFn = deserializeFn

    const initialValue = localStorage.getItem(key)
    this.value = initialValue ? this.deserializeFn(initialValue) : defaultValue

    $effect(() => {
      localStorage.setItem(this.key, this.serializeFn(this.value))
    })
  }

  get(): T {
    return this.value
  }

  set(value: T) {
    this.value = value
    localStorage.setItem(this.key, this.serializeFn(value))
  }
}
