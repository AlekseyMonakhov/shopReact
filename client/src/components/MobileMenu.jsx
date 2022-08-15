import styled from "styled-components";

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
const MenuLink = styled.a`
  cursor: pointer;
`;



const MobileMenu = (props) => {
    return (
        <Container>
            <Wrapper>
                <MenuTitle>IAMB</MenuTitle>
                <MenuLinks>
                    <MenuLink>LOGIN</MenuLink>
                </MenuLinks>
                <MenuLinks>
                    <MenuLink>REGISTER</MenuLink>
                </MenuLinks>
                <MenuLinks onClick={props}>
                    <MenuLink>CLOSE</MenuLink>
                </MenuLinks>
            </Wrapper>
        </Container>
    );
};

export default MobileMenu;
