import styled from 'styled-components';
import { theme, Light, Dark } from '../../styles/shared';
import Navbar from '../Navbar/Navbar';

const Wrapper = styled.div`
  color: ${(props) => props.theme.Light};
  background-color: ${(props) => props.theme.Dark};
  min-height: 100vh;
  overflow-y: scroll;

  h1,
  h2,
  h3,
  h4 {
    color: ${(props) => props.theme.Primary};
  }

  main.container {
    width: 75%;
    margin: 0 auto;
  }
`;

const MainLayout = ({ children, className }) => {
  return (
    <Wrapper className={className} theme={theme}>
      <Navbar theme={theme} />

      <main className="container">{children}</main>
    </Wrapper>
  );
};

export default MainLayout;
