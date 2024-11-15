import { create } from 'zustand';

export const useAnnFormStore = create((set) => ({
  annuity: {
    contract_type: '',
    contract_role: '',
    contract_identifier: '',
    nominal_interest_rate: 0,
    currency: '',
    initial_exchange_date: 0,
    maturity_date: 0,
    notional_principal: 0,
    annuity_position: '',
    price: 0,
    number_of_annuities_to_mint: 0,
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
        contract_identifier: '',
        nominal_interest_rate: 0,
        currency: '',
        initial_exchange_date: 0,
        maturity_date: 0,
        notional_principal: 0,
        annuity_position: '',
        price: 0,
        number_of_annuities_to_mint: 0,
      },
    })),
}));
