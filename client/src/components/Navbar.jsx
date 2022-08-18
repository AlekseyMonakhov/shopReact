import React, { useState } from 'react';
import styled from "styled-components";
import { CloseRounded, Menu, Search, ShoppingBagOutlined } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { mobile } from "../responsive";
import MobileMenu from "./MobileMenu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Container = styled.div`
  height: fit-content;
  padding: 10px 20px;
  position: sticky;
  z-index: 15;
  top: -1px;
  opacity: .9;
  background-color: white;
  ${mobile({ padding: "5px" })};
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Left = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })};
`;

const SearchContainer = styled.div`
  border: .5px solid lightgrey;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ marginLeft: 0 })};
`;

const Input = styled.input`
    border: none;
    ${mobile({ width: "50px" })};
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "32px" })};
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 1, justifyContent: "flex-start", flexDirection: "row-reverse" })};
`;

const MenuItem = styled.div`
  font-size: 14px;
  margin-left: 25px;
  cursor: pointer;
  @media only screen and (max-width: 835px) {
    &:not(:last-child) {
      display: none;
    }
  }
`;

const MenuMobileButton = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 1s ease;
  ${mobile({ display: "flex", marginLeft: "10px" })};
`;



const Navbar = () => {

  const quantity = useSelector((state) => state.cart.quantity);
  const [showMenu, setShowMenu] = useState(false);


  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center><Logo>IAMB</Logo></Center>
        <Right>
          <MenuItem>REGISTER</MenuItem>
          <MenuItem>SIGN IN</MenuItem>
          <MenuMobileButton onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? <CloseRounded /> : <Menu />}
          </MenuMobileButton>
          <Link to={"/cart"}>
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingBagOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
      {showMenu && MobileMenu(() => setShowMenu(!showMenu))}
    </Container>
  );
};

export default Navbar;
