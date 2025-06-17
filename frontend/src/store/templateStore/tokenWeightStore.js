import { create } from 'zustand';

// Define the store
const useTokenWeightStore = create((set) => ({
  initialFormFields: {
    userAddress: "",
    communityName: "",
    communityImage: "",
    description: "",
    purpose: "",
    tags: [],
    package_addr: "",
    token: {
      name: "",
      symbol: "",
      isMintable: true,
      totalSupply: 0,
      tokenImageUrl: "",
      tokenSupply: 0,
      tokenPrice: 0,
      tokenWithDrawPrice: 0
    },
    metaData: {
      website: "",
      discord: "",
      telegram: "",
      forum: ""
    },
    airDrop: {
      publicSale: 0,
      foundingTeam: 0,
      treasury: 0,
      communityIncentives: 0,
      airDropStartTime: 0,
      airDropEndTime: 0,
      amount_per_air_drop: 0
    },
    governance: {
      proposalThreshold: 0,
      quorumPercentage: 0,
      votingPeriodDays: 0,
      passThresholdPercentage: 0,
      proposal_right: "",
      proposal_minimum_token: 0
    }
  },
  formFields: {
    userAddress: "",
    communityName: "",
    communityImage: "",
    description: "",
    purpose: "",
    tags: [],
    package_addr: "",
    token: {
      name: "",
      symbol: "",
      isMintable: true,
      totalSupply: 0,
      tokenImageUrl: "",
      tokenSupply: 0,
      tokenPrice: 0,
      tokenWithDrawPrice: 0
    },
    metaData: {
      website: "",
      discord: "",
      telegram: "",
      forum: ""
    },
    airDrop: {
      publicSale: 0,
      foundingTeam: 0,
      treasury: 0,
      communityIncentives: 0,
      airDropStartTime: 0,
      airDropEndTime: 0,
      amount_per_air_drop: 0
    },
    governance: {
      proposalThreshold: 0,
      quorumPercentage: 0,
      votingPeriodDays: 0,
      passThresholdPercentage: 0,
      proposal_right: "",
      proposal_minimum_token: 0
    }
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
