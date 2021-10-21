import Link from 'next/link';
import styled from 'styled-components';

const StyledDiv = styled.div`
  width: fit-content;
  height: 100%;

  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-content: center;
  flex-direction: column;

  text-align: center;
  border-top: 0px solid transparent;

  transition: all 0.2s;

  &:hover {
    border-top: 5px solid ${(props) => props.theme.Secondary};
    color: ${(props) => props.theme.Primary};
  }

  a {
    width: 100%;
    height: 100%;

    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-content: center;
    flex-direction: column;

    color: ${(props) => props.theme.black};
  }
`;

const NavItem = ({ title, link, theme }) => {
  return (
    <StyledDiv theme={theme}>
      <Link href={link}>{title}</Link>
    </StyledDiv>
  );
};

export default NavItem;
