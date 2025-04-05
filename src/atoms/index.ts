import { atom } from "jotai";

export type floatButtonModeType = 'Task' | 'Inbox' | null;

export const floatButtonMode = atom<floatButtonModeType>(null)