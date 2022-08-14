import React from 'react';
import styled from "styled-components";
import {Search, ShoppingBagOutlined} from "@mui/icons-material";
import {Badge} from "@mui/material";
import {mobile} from "../responsive";

const Container = styled.div`
  height: 60px;
  ${mobile({height: "50px"})};
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({padding: "10px 0"})};
`;
const Left = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({display: "none"})};
`;

const SearchContainer = styled.div`
  border: .5px solid lightgrey;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({marginLeft: "5px"})};
`;

const Input = styled.input`
    border: none;
    ${mobile({width: "50px"})};
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({fontSize: "4vh"})};
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({flex: 2,justifyContent: "center"})};
`;

const MenuItem =styled.div`
  font-size: 14px;
  margin-left: 25px;
  cursor: pointer;
  ${mobile({fontSize: "12px", marginLeft: "10px"})};
`;


const Navbar = () => {
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder="Search"/>
                        <Search style={{color: "gray", fontSize: 16}}/>
                    </SearchContainer>
                </Left>
                <Center><Logo>IAMB</Logo></Center>
                <Right>

                    <MenuItem>REGISTER</MenuItem>
                    <MenuItem>SIGN IN</MenuItem>
                    <MenuItem>
                        <Badge badgeContent={4} color="secondary">
                            <ShoppingBagOutlined />
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;
