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

  .image-container {
    max-width: 439px;
    max-height: 566px;
    position: absolute;
    bottom: 0;
    right: 0;
    transform-origin: bottom right;

    @media only screen and (max-width: ${breakpoints.lg}) {
      scale: 0.8;
    }
  }
`;

// TODO: make dashboard page
const Dashboard = ({ theme }) => {
  return (
    <StyledMainLayout>
      <div className="heading">have like coinmarketcap type info here</div>

      {/* <div className="image-container">
        <img src={'/images/fang.png'} alt="One of my dogs" />
      </div> */}
    </StyledMainLayout>
  );
};

export default Dashboard;
