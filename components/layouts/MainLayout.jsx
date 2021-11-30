import styled from 'styled-components';
import { theme, Light, Dark } from '../../styles/shared';
import Navbar from '../Navbar/Navbar';
const Wrapper = styled.div`
  color: ${(props) => props.theme.Primary};
  background-color: ${(props) => props.theme.Background};
  min-height: 100vh;
  overflow-y: scroll;

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
