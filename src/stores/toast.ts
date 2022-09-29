import { writable } from "svelte/store"

export enum ToastType {
  SUCCESS = 0,
  INFO,
  WARNING,
  ERROR,
}

export interface Toast {
  id: number
  type: ToastType
  message: string
  dismissible: boolean
  timeout?: number
}

export const toasts = writable<Toast[]>([])
