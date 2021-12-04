import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/shared';
import Image from 'next/image';

import { ethers } from 'ethers';

const StyledButton = styled.button`
  height: 2.5rem;
  width: fit-content;
  min-width: 8rem;
  padding: 0 1rem;

  display: flex;
  align-items: center;
  justify-items: center;

  background-color: ${theme.Primary};
  color: ${theme.PrimaryDark};
  cursor: pointer;

  letter-spacing: 1px;

  border-radius: 50px;
  border: 0;

  transition: all 0.2s ease-out;

  &:hover {
    filter: brightness(0.85);
  }

  img {
    padding-left: 0.5rem !important;
  }
`;

let provider;
let signer;

const LoginButton = () => {
  const [account, setAccount] = useState(false);

  const isMetaMaskConnected = async () => {
    // if (!provider) return false;
    const accounts = await provider?.listAccounts();
    return accounts.length > 0;
  };

  const handleLogin = async () => {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts);
    setAccount(accounts[0]);
    // const balance = await provider.getBalance('ethers.eth');
    // console.log('balance: ', balance);
  };

  const handleLogout = async () => {
    console.log(account);
    // await provider.
  };

  useEffect(() => {
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    if (!provider && typeof provider === 'undefined')
      provider = new ethers.providers.Web3Provider(window.ethereum);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    if (!signer && typeof signer === 'undefined') signer = provider.getSigner();

    async function checkMeta() {
      if (await isMetaMaskConnected()) {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccount(accounts[0]);
      }
    }
    checkMeta();
  }, []);

  return (
    <StyledButton
      onClick={account ? handleLogout : handleLogin}
      className="metamask"
    >
      {account ? account.slice(0, 8) + '...' : 'Login With MetaMask'}
      <Image src="/metamask.svg" alt="MetaMask" width="20" height="20" />
    </StyledButton>
  );
};

export default LoginButton;
