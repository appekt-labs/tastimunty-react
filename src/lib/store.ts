import { create } from 'zustand'

interface ITastimuntyStore {
    tastimuntyId: string,
    setTastimuntyId: (id: string) => void;

}

export const useTastimuntyStore = create<ITastimuntyStore>((set) => ({
    tastimuntyId: "",
    setTastimuntyId: (token: string) => {
        set(state => ({ ...state, tastimuntyId: token }))
    },
}))
