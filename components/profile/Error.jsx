import styled from 'styled-components';

const StyledDiv = styled.div`
  text-align: center;
  margin: auto;
`;

const Error = () => {
  return (
    <StyledDiv>
      <h2>Error fetching data.</h2>
      <p>Please try again in a few minutes.</p>
    </StyledDiv>
  );
};

export default Error;
