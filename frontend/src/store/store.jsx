import { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import Abi from "../assets/ABI.json";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [wallet, setWallet] = useState("Connect Wallet");
  const [contract, setContract] = useState();

  const WEB3API = import.meta.env.VITE_APP_CONTRACT_ADDRESS;

  const handleClick = async (e) => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const wallet = await signer.getAddress();
      setWallet(wallet);
      const contract1 = new ethers.Contract(WEB3API, Abi, signer);
      setContract(contract1);
    }
  };

  return (
    <Context.Provider
      value={{
        WEB3API,
        wallet,
        contract,
        handleClick,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useValue = () => {
  const ContextValue = useContext(Context);
  if (!ContextValue) {
    throw new Error("useValue used outside of the Provider");
  }
  return ContextValue;
};
