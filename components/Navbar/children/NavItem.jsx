import Link from 'next/link';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  width: 12rem;
  height: 100%;

  /* display: flex; */
  /* flex-grow: 1; */
  /* justify-content: center;
  align-content: center;
  flex-direction: column; */

  text-align: center;
  border-bottom: 5px solid transparent;
  border-top: 5px solid transparent;

  transition: all 0.2s;

  &:hover {
    border-bottom: 5px solid ${(props) => props.theme.Secondary};
    color: ${(props) => props.theme.Primary};
  }
  &.active {
    border-bottom: 5px solid ${(props) => props.theme.Secondary};
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
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loc = window.location.toString();
      const reg = `${link}$`;
      const regex = new RegExp(reg);
      setActive(loc.match(regex));
      // active = loc.match(regex);
    }
  }, []);

  return (
    <StyledDiv theme={theme} className={`${active && 'active'}`}>
      <Link href={link}>{title}</Link>
    </StyledDiv>
  );
};

export default NavItem;
