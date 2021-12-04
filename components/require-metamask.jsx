import styled from 'styled-components';

const StyledDiv = styled.div`
  text-align: center;
  margin: auto;
  margin-top: 8rem;
`;

const RequireMetaMask = () => {
  return (
    <StyledDiv>
      <h2>Login to MetaMask to view.</h2>
      <p>
        Please use the button in the top right to login or install MetaMask.
      </p>
    </StyledDiv>
  );
};

export default RequireMetaMask;
