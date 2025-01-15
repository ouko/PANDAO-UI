import { create } from 'zustand';

// Define the store
const useTokenWeightStore = create((set) => ({
  initialFormFields: {
    communityName: "",
    description: "",
    tokenSupply: 0,
    tokenPrice: 0,
    community_token_name:"",
    tokenWithDrawPrice: 0,
    communityImage: "",
    tokenImage: "",
    userAddress: "", // Adding userAddress
    purpose: "", 
    investment:"",
    insurance:"",
    lending_borrowing:"",
    tags: [],
    proposal_right:'',
    proposal_minimum_token:0,
    package_addr:''
 
  },
  formFields: {
    communityName: "",
    description: "",
    tokenSupply: 0,
    tokenPrice: 0,
    tokenWithDrawPrice: 0,
    communityImage: "",
    tokenImage: "",
    userAddress: "", // Adding userAddress
    purpose: "",
    community_token_name:"",
    investment:"",
    insurance:"",
    lending_borrowing:"",
    tags: [], 
    proposal_right:'',
    proposal_minimum_token:0,
      package_addr:''
  },
  setFormFields: (fields) => set((state) => ({
    formFields: {
      ...state.formFields,
      ...fields,
    },
  })),
  resetFormFields: () => set((state) => ({
    formFields: { ...state.initialFormFields }
  })),
}));

export default useTokenWeightStore;
