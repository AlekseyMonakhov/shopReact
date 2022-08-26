import React, { useState } from 'react';
import styled from "styled-components";
import { CloseRounded, Menu, Search, ShoppingBagOutlined } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { mobile } from "../responsive";
import MobileMenu from "./MobileMenu";
import Favorites from "./Favorites";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/userRedux";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { removeProduct } from "../redux/favoritesRedux";



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
  -webkit-text-stroke: 1px black;
  ${mobile({ fontSize: "32px" })};
  &::first-letter {
    font-size: 38px;
    line-height: 32px;
    color: rgba(145, 13, 13, 1);
  }
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
  cursor: pointer;
  padding: 10px;
`;
const LogoutBtn = styled.div`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })};
`;

const MenuMobileButton = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 1s ease;
  ${mobile({ display: "flex", marginLeft: "10px" })};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 14px;
  cursor: pointer;
  padding: 10px;
  &:nth-child(1), &:nth-child(2) {
    ${mobile({ display: "none" })};
  }
`;



const Navbar = () => {

  const quantityCart = useSelector((state) => state.cart.quantity);
  const favorite = useSelector((state) => state.favorite);
  const currentUser = useSelector((state) => state.user.currentUser?._id);
  const [showMenu, setShowMenu] = useState(false);
  const [showFavorite, setShowFavorite] = useState(false);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logOut());
  };
  const removeFavorites = (item) => {
    dispatch(removeProduct(item));
  };


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
        <Center>
          <Link to={"/"} style={{ color: "black", textDecoration: "none" }}>
            <Logo>Shop</Logo>
          </Link>
        </Center>
        <Right>
          {!currentUser
            ?
            <React.Fragment>
              <StyledLink to={"/register"}>REGISTER</StyledLink>
              <StyledLink to={"/login"}>SIGN IN</StyledLink>
            </React.Fragment>
            :
            <React.Fragment>
              <StyledLink to={"/"}>
                <LogoutBtn onClick={() => logout()}>LOGOUT</LogoutBtn>
              </StyledLink>
              <StyledLink to={`/cabinet/${currentUser}`}>CABINET</StyledLink>
            </React.Fragment>
          }
          <MenuMobileButton onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? <CloseRounded /> : <Menu />}
          </MenuMobileButton>
          <MenuItem onClick={() => setShowFavorite(!showFavorite)}>
            <Badge badgeContent={favorite.quantity} color="primary">
              <FavoriteBorderOutlined style={favorite.quantity ? {color:"red"} : {color:"black"}} />
            </Badge>
          </MenuItem>
          <StyledLink to={"/cart"}>
            <Badge badgeContent={quantityCart} color="primary">
              <ShoppingBagOutlined />
            </Badge>
          </StyledLink>
        </Right>
      </Wrapper>
      {showMenu && MobileMenu(() => setShowMenu(!showMenu), currentUser, () => logout())}
      {showFavorite && Favorites(favorite.products, () => setShowFavorite(!showFavorite), removeFavorites)}
    </Container>
  );
};

export default Navbar;
