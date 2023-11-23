import { persisted } from "svelte-local-storage-store";
import { writable } from "svelte/store";
import { type Network, type Toast, type User } from "./types";

export const token = persisted<string>("token", "");
export const toasts = writable<Toast[]>([]);
export const user = writable<User>({ name: "Alex", role: "ADMIN", emoji: "🐢", created_at: new Date() });
export const time = writable<Date>(new Date());
export const network = writable<Network>({ name: "WLAN_PUMA-2G", strength: -63, security: "WPA/WPA2-PSK" });
