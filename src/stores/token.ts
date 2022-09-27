import { writable } from "svelte/store"

const key = "token"

export const token = writable(localStorage.getItem(key))
token.subscribe((value) => {
  if (value !== null) {
    localStorage.setItem(key, value)
  } else {
    localStorage.removeItem(key)
  }
})
