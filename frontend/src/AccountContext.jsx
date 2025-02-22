import { createContext, useContext, useState, useEffect } from 'react';
import { DataRequestBuilder } from "@radixdlt/radix-dapp-toolkit";
import { useRdt } from './hooks/useRdt';

const AccountContext = createContext();

export const useAccount = () => useContext(AccountContext);

export const AccountProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [isInitialized, setIsInitialized] = useState(false); // Track initialization

  const rdt = useRdt();

  useEffect(() => {
    setIsLoading(true);
    
    try {
      rdt.walletApi.setRequestData(DataRequestBuilder.accounts().atLeast(1));

      const subscription = rdt.walletApi.walletData$.subscribe((walletData) => {
        setAccounts(walletData && walletData.accounts ? walletData.accounts : []);
        setIsLoading(false);
        setIsInitialized(true);
      });

      return () => subscription.unsubscribe();
    } catch (error) {
      console.error('Error initializing wallet:', error);
      setIsLoading(false);
      setIsInitialized(true);
    }
  }, [rdt]);

  return (
    <AccountContext.Provider 
      value={{ 
        accounts, 
        setAccounts, 
        selectedAccount, 
        setSelectedAccount,
        isLoading,
        isInitialized
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};