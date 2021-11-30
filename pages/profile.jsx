import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MainLayout from '../components/layouts/MainLayout';
import { theme } from '../styles/shared';

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
      border: 1.1rem solid ${theme.Primary};
      border-left: 1.1rem solid ${theme.Secondary};
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

const Profile = () => {
  const [blockchainData, setBlockchainData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getBlockchainData = async () => {
    // setLoading(true); // comment this out when developing to save sanity
    const data = await fetch(
      '/api/get-blockchain-data/0x0235C9D8413b4807602468Ed363dfAa8A1c5Cde2',
    ).then((res) => {
      setLoading(false);
      return res.json();
    });
    setBlockchainData(data);
    return data;
  };

  // TODO: cache this stuff somehow / store on db and check that first
  useEffect(() => {
    getBlockchainData();
  }, []);

  return (
    <StyledMainLayout>
      <div className={`blockchain-data-container ${loading && 'loading'}`}>
        {blockchainData?.map((data) => {
          return (
            <div key={data} className="blockchain-data-div">
              <h3>
                <a href={data.url} target="_blank" rel="noreferrer">
                  {data.name}
                </a>
              </h3>
              <p>
                Calculated Value:{' '}
                <b>
                  {data.holdingsToken} {data.symbol}
                </b>
                <span className="shade">
                  {' '}
                  / {data.holdingsUSD} <b>USD</b>
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </StyledMainLayout>
  );
};

export default Profile;
