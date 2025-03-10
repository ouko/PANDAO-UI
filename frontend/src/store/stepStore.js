import { create } from 'zustand';



const useStepStore = create((set) => ({
  currentStep: 0,
  stepsLength: 3, 
  setStepsLength: (length) => set({ stepsLength: length }),
  handleNext: () =>
    set((state) => ({ currentStep: Math.min(state.currentStep + 1, state.stepsLength - 1) })),
  handlePrev: () =>
    set((state) => ({ currentStep: Math.max(state.currentStep - 1, 0) })),
  setStep: (step) =>
    set((state) => ({ currentStep: Math.max(0, Math.min(step, state.stepsLength - 1)) })),
}));

export default useStepStore;
