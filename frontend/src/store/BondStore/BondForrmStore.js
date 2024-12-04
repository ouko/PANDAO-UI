import {create }from 'zustand';

export const useBondFormStore = create((set) => ({
  bond: {
    community_id: '',
    bond_name: '',
    bond_symbol: '',
    bond_identity: '',
    nominal_interest_rate: 0,
    currency: 'xrd',
    initial_exchange_date: 0,
    maturity_date: 0,
    notional_principal: 0,
    discount: 0,
    bond_position: '',
    bond_price: 0,
    number_of_bonds: 0,
    user_address: '',
    description: '',
    nft:''
  },
  updateBond: (key, value) => set((state) => ({ bond: { ...state.bond, [key]: value } })),
  resetBond: () => set(() => ({
    bond: {
      community_id: '',
      bond_name: '',
      bond_symbol: '',
      bond_identity: '',
      nominal_interest_rate: 0,
      currency: 'xrd',
      initial_exchange_date: 0,
      maturity_date: 0,
      notional_principal: 0,
      discount: 0,
      bond_position: '',
      bond_price: 0,
      number_of_bonds: 0,
      user_address: '',
      description: '',
      nft:''
    }
  }))
}));