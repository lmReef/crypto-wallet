import { useState } from 'react';
import styled from 'styled-components';
import MainLayout from '../components/layouts/MainLayout';
import { breakpoints } from '../styles/shared';

const StyledMainLayout = styled(MainLayout)`
  .heading {
    width: fit-content;
    height: fit-content;
    margin: 7rem;

    text-align: center;

    @media only screen and (max-width: ${breakpoints.lg}) {
      margin: 2rem auto 0 auto;
    }
  }
`;

// TODO: make dashboard page
const Dashboard = ({ theme }) => {
  const [coinData, setCoinData] = useState(null);

  // get data on coins from the api
  const getCoinData = async () => {
    const d = await fetch('/api/get-coin-prices')
      .then((res) => {
        // setLoading(false);
        return res.json();
      })
      .catch((e) => {
        console.log(e);
        return null;
      });

    return setCoinData(d[0]);
  };

  if (!coinData) getCoinData();

  return (
    <StyledMainLayout>
      <div className="coin-data-collection">
        {coinData?.length > 0 ? (
          coinData.map((coin, index) => {
            return (
              <div className="coin-data-item" key={index}>
                <p>{`${coin.ranking}. ${coin.symbol} ${coin.name}: ${coin.price}`}</p>
              </div>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </StyledMainLayout>
  );
};

export default Dashboard;
