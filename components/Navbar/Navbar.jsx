import styled from 'styled-components';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLinkedin, faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import NavItem from './children/NavItem';
import LoginButton from './children/Login';
import { theme } from '../../styles/shared';

const Nav = styled.div`
  z-index: 20;
  top: 0;
  width: 100%;
  height: 5rem;
  margin: 0;
  display: flex;
  position: sticky;

  background-color: ${(props) => props.theme.Darkest};

  font-family: Poppins;
  font-weight: 500;
  font-size: 1.1rem;
  letter-spacing: 1px;

  a {
    text-decoration: none;
  }

  .nav-items {
    display: flex;
    min-width: 480px;
    margin: 0 auto;

    @media only screen and (max-width: ${(props) => props.theme.sm}) {
      min-width: 350px;
    }

    .socials {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);

      a {
        transition: all 0.2s ease-out;
      }

      svg {
        height: 2rem;
        width: 2rem;
        margin: 0.2rem;
      }
    }
  }
`;

const Navbar = ({ theme }) => {
  return (
    <Nav theme={theme}>
      <div className="nav-items">
        <NavItem theme={theme} title="Dashboard" link="/" />
        <NavItem theme={theme} title="Profile" link="/profile" />
        <NavItem theme={theme} title="About" link="/about" />
        <div className="socials">
          <LoginButton />
          {/* <a href="https://www.linkedin.com/in/reefmatson/" target="_blank">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://github.com/lmReef" target="_blank">
            <FontAwesomeIcon icon={faGithubSquare} />
          </a> */}
        </div>
      </div>
    </Nav>
  );
};

export default Navbar;
