import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useRouteMatch } from 'react-router-dom';

const Nav = styled.nav`
  width: 100vw;
  height: 50px;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background-color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  color: ${(props) => props.theme.white.lighter};
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled(motion.svg)`
  /* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */
  width: 50px;
  height: 30px;
  display: flex;
  margin-right: 10px;
  fill: ${(props) => props.theme.white.lighter};
  path {
    stroke-width: 6px;
    stroke: white;
  }
`;
const Search = styled.span`
  color: white;
  svg {
    height: 25px;
  }
`;
const Tabs = styled.ul`
  display: flex;
`;
const Tab = styled(motion.li)`
  margin-left: 10px;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  list-style: none;
  transition: color 0.3s ease-in-out;
  color: ${(props) => props.theme.white.darker};
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;
const Circle = styled.span`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: 15px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.white.lighter};
`;
const logoVariants = {
  initial: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [1, 0, 1],
    transition: {
      repeat: Infinity,
      duration: 4,
    },
  },
};
const tabVariants = {
  hover: {
    scale: 1.2,
  },
};

function Header() {
  const homeMatch = useRouteMatch('/');
  const tvMatch = useRouteMatch('/tv');
  const profileMatch = useRouteMatch('/profile');
  const settingMatch = useRouteMatch('/setting');
  return (
    <>
      <Nav>
        <Column>
          <Logo
            variants={logoVariants}
            whileHover="active"
            initial
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
          >
            <motion.path d="M45.6 32C20.4 32 0 52.4 0 77.6V434.4C0 459.6 20.4 480 45.6 480c5.1 0 10-.8 14.7-2.4C74.6 472.8 177.6 440 320 440s245.4 32.8 259.6 37.6c4.7 1.6 9.7 2.4 14.7 2.4c25.2 0 45.6-20.4 45.6-45.6V77.6C640 52.4 619.6 32 594.4 32c-5 0-10 .8-14.7 2.4C565.4 39.2 462.4 72 320 72S74.6 39.2 60.4 34.4C55.6 32.8 50.7 32 45.6 32zM160 160c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32zm208 0c7.9 0 15.4 3.9 19.8 10.5L512.3 353c5.4 8 5.6 18.4 .4 26.5s-14.7 12.3-24.2 10.7C442.7 382.4 385.2 376 320 376c-65.6 0-123.4 6.5-169.3 14.4c-9.8 1.7-19.7-2.9-24.7-11.5s-4.3-19.4 1.9-27.2L197.3 265c4.6-5.7 11.4-9 18.7-9s14.2 3.3 18.7 9l26.4 33.1 87-127.6c4.5-6.6 11.9-10.5 19.8-10.5z" />
          </Logo>
          <Tabs />
          <Tab variants={tabVariants} whileHover="hover">
            <Link to="/">Home {homeMatch?.isExact && <Circle />}</Link>
          </Tab>
          <Tab variants={tabVariants} whileHover="hover">
            <Link to="/tv">Tv {tvMatch && <Circle />}</Link>
          </Tab>
        </Column>
        <Column>
          <Search>
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Search>
          <Tabs>
            <Tab variants={tabVariants} whileHover="hover">
              <Link to="/profile">Profile{profileMatch && <Circle />}</Link>
            </Tab>
            <Tab variants={tabVariants} whileHover="hover">
              <Link to="/setting">Setting{settingMatch && <Circle />}</Link>
            </Tab>
          </Tabs>
        </Column>
      </Nav>
    </>
  );
}
export default Header;
