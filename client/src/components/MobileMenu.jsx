import styled from "styled-components";
import { Link } from "react-router-dom";
import React from "react";

const Container = styled.div`
  position: fixed;
  background: linear-gradient(179.88deg, #FFFFFF 23.28%, rgba(255, 255, 255, 0.65) 99.9%);
  left: 0;
  top: 0;
  z-index: 15;
  padding: 25px;
  width: 70vw;
  height: 100vh;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const MenuTitle = styled.h2`
  font-size: 36px;
  font-weight: 600;
`;
const MenuLinks = styled.div``;
const MenuLink = styled.h5`
  cursor: pointer;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;



const MobileMenu = (props, currentUser, logout) => {
  console.log(currentUser);
  return (
    <Container>
      <Wrapper>
        <MenuTitle>IAMB</MenuTitle>
        {!currentUser
          ? <React.Fragment>
            <MenuLinks>
              <StyledLink to={"/login"}>
                <MenuLink>LOGIN</MenuLink>
              </StyledLink>
            </MenuLinks>
            <MenuLinks>
              <StyledLink to={"register"}>
                <MenuLink>REGISTER</MenuLink>
              </StyledLink>
            </MenuLinks>
          </React.Fragment>
          : <MenuLinks>
            <MenuLink onClick={logout}>LOGOUT</MenuLink>
          </MenuLinks>
        }
        <MenuLinks onClick={props}>
          <MenuLink>CLOSE</MenuLink>
        </MenuLinks>
      </Wrapper>
    </Container>
  );
};

export default MobileMenu;
