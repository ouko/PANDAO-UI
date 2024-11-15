import { create } from 'zustand';

export const useAnnFormStore = create((set) => ({
  annuity: {
    contract_type: '',
    contract_role: '',
    contract_identity: '',
    nominal_interest_rate: 0,
    initial_exchange_date: '',
    maturity_date: '',
    notional_principal: 0,
    ann_position: '',
    price: 0,
    number_of_ann: 0,
    user_address: '',
    community_id: '',
  },
  updateAnnuity: (key, value) =>
    set((state) => ({
      annuity: { ...state.annuity, [key]: value },
    })),
  resetAnnuity: () =>
    set(() => ({
      annuity: {
        contract_type: '',
        contract_role: '',
        contract_identity: '',
        nominal_interest_rate: 0,
        initial_exchange_date: '',
        maturity_date: '',
        notional_principal: 0,
        ann_position: '',
        price: 0,
        number_of_ann: 0,
        user_address: '',
        community_id: '',
      },
    })),
}));
