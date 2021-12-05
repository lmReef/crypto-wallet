import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MainLayout from '../components/layouts/MainLayout';
import { theme } from '../styles/shared';
import Error from '../components/profile/Error';
import RequireMetaMask from '../components/require-metamask';

import { ethers } from 'ethers';

const StyledMainLayout = styled(MainLayout)`
  h1 {
    margin: 3rem auto;
    text-align: center;
  }

  .blockchain-data-container {
    margin: 4rem;

    .blockchain-data-div {
      margin-bottom: 3rem;
    }

    .shade {
      opacity: 0.7;
    }

    &.loading {
      position: absolute;
      margin: auto;
      top: 50%;
      right: calc(50% - 3rem);
      width: 6rem;
      height: 6rem;
      border: 1.1rem solid ${theme.Darkish};
      border-left: 1.1rem solid ${theme.Primary};
      border-radius: 50%;
      animation: load8 1.1s infinite linear;
    }
    @keyframes load8 {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;

// TODO: work to abstract out the metamask web3 shit from here
let provider;
let signer;

const Profile = () => {
  const [blockchainData, setBlockchainData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [error, setError] = useState(false);

  const getBlockchainData = async (address) => {
    if (!address) return;
    console.log('Address:', address);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    const data = await fetch(`/api/get-blockchain-data/${address}`, {
      signal: controller.signal,
    })
      .then((res) => {
        setLoading(false);
        return res.json();
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        setError(true);
      });

    setBlockchainData(data);
    return data;
  };

  const isMetaMaskConnected = async () => {
    if (!provider) return false;
    const accounts = await provider?.listAccounts();
    return accounts.length > 0;
  };

  // TODO: cache this stuff somehow / store on db and check that first
  useEffect(() => {
    if (window?.ethereum) setInstalled(true);
    else {
      setInstalled(false);
      return;
    }

    if (!provider && typeof provider === 'undefined')
      provider = new ethers.providers.Web3Provider(window.ethereum);

    if (!signer && typeof signer === 'undefined') signer = provider.getSigner();

    async function checkMeta() {
      if (isMetaMaskConnected()) {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccount(accounts[0]);
      }
    }
    checkMeta();
  }, []);

  useEffect(() => {
    getBlockchainData(account);
  }, [account]);

  return (
    <StyledMainLayout>
      {!installed ? (
        <RequireMetaMask />
      ) : (
        <div className={`blockchain-data-container ${loading && 'loading'}`}>
          {(error && <Error />) ||
            (blockchainData?.length > 0 &&
              blockchainData?.map((data, index) => {
                return (
                  <div key={index} className="blockchain-data-div">
                    <h3>
                      <a href={data?.url} target="_blank" rel="noreferrer">
                        {data?.name}
                      </a>
                    </h3>
                    <p>
                      Calculated Value:{' '}
                      <b>
                        {data?.holdingsToken} {data?.symbol}
                      </b>
                      <span className="shade">
                        {' '}
                        / {data?.holdingsUSD} <b>USD</b>
                      </span>
                    </p>
                  </div>
                );
              }))}
        </div>
      )}
    </StyledMainLayout>
  );
};

export default Profile;
