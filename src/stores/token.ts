import { get, writable, type Subscriber, type Unsubscriber, type Updater } from "svelte/store"

export class token {
  private static LOCAL_STORAGE_KEY = "token"
  private static storage = writable(localStorage.getItem(this.LOCAL_STORAGE_KEY))

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static get(): string {
    return get(this.storage) || ""
  }

  public static subscribe(run: Subscriber<string>): Unsubscriber {
    return this.storage.subscribe((value) => {
      value = value || ""

      run(value)
    })
  }

  public static set(value: string, save = true): void {
    value = value || ""

    this.storage.set(value)

    if (save) {
      localStorage.setItem(this.LOCAL_STORAGE_KEY, value)
    } else {
      localStorage.removeItem(this.LOCAL_STORAGE_KEY)
    }
  }

  public static update(updater: Updater<string>): void {
    this.storage.update((value) => {
      value = value || ""

      return updater(value)
    })
  }
}
