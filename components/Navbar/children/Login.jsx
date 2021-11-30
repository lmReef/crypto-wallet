import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/shared';
import Image from 'next/image';

import { ethers } from 'ethers';

const StyledButton = styled.button`
  height: 3rem;
  width: fit-content;
  padding: 0 1rem;

  display: flex;
  align-items: center;
  justify-items: center;

  background-color: ${theme.Secondary};
  color: ${theme.PrimaryDark};
  cursor: pointer;

  letter-spacing: 1px;

  border-radius: 10px;
  border: 0;

  transition: all 0.2s ease-out;

  &:hover {
    filter: brightness(0.85);
  }

  img {
    padding-left: 0.5rem !important;
  }
`;

const LoginButton = () => {
  const [account, setAccount] = useState(null);

  if (typeof window !== 'undefined') {
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner();
  }

  const isMetaMaskConnected = async () => {
    const accounts = await provider?.listAccounts();
    return accounts.length > 0;
  };

  const handleLogin = async () => {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
    console.log(account);
    // const balance = await provider.getBalance('ethers.eth');
    // console.log('balance: ', balance);
  };

  const onClick = () => {
    console.log(account);
  };

  return !account ? (
    <StyledButton onClick={handleLogin} className="metamask">
      Login With MetaMask
      <Image src="/metamask.svg" alt="MetaMask" width="20" height="20" />
    </StyledButton>
  ) : (
    <StyledButton onClick={onClick} className="metamask">
      {account.slice(0, 8) + '...'}
      <Image src="/metamask.svg" alt="MetaMask" width="20" height="20" />
    </StyledButton>
  );
};

export default LoginButton;
