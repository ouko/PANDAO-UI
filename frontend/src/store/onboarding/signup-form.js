// store/onboarding/signup-form.js
import { create } from 'zustand';

export const useSignupFormStore = create((set) => ({
  // Existing properties
  public_address: '',
  username: '',
  email: '',
  newletterOpted: true,
  bio: '',
  otp: '',
  display_image: '',
  work_history: [],
  tags: [],
  
  // Form update methods
  setName: (username) => set({ username }),
  setEmail: (email) => set({ email }),
  setBio: (bio) => set({ bio }),
  setDisplayImage: (display_image) => set({ display_image }),
  setTags: (tags) => set({ tags }),
  setPublicAddress: (public_address) => set({ public_address }),
  setNewsletter: (newletterOpted) => set({ newletterOpted }),

  setFormData: (data) => set((state) => ({
    ...state,
    ...data,
  })),
  
  // Reset the form
  resetForm: () => set({
    public_address: '',
    username: '',
    email: '',
    newletterOpted: false,
    bio: '',
    otp: '',
    display_image: '',
    work_history: [],
    tags: [],
  }),
}));