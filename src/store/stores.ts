import { writable } from "svelte/store";
import type { ListInfo } from "./storeTypes";

export const todoLists = writable<ListInfo[]>([])