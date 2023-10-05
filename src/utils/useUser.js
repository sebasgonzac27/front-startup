import { create } from "zustand";
import { getKey } from "./storage";

export const useUser = create((set) => ({
    user: getKey('user'),
    setUser: (data) => set(() => ({ user: data })),
  }))