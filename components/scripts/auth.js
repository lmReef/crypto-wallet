import { ethers } from 'ethers';

export let provider;
export let signer;

export const getProvider = () => {
  if (!provider && typeof provider === 'undefined') {
    provider = new ethers.providers.Web3Provider(window?.ethereum);
  }
  if (!signer && typeof signer === 'undefined') signer = provider?.getSigner();
};

export const isMetaMaskConnected = async () => {
  if (!provider) return false;
  const accounts = await provider?.listAccounts();
  return accounts.length > 0;
};

export const isMetaMaskInstalled = () => {
  return !!window?.ethereum;
};
