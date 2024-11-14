import { create } from 'zustand'

const useBluePrintSlugStore = create((set) => ({
    slug: '',
    setSlug: (newSlug) => set({ slug: newSlug }),
}))

export default useBluePrintSlugStore
