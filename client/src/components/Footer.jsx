import styled from "styled-components";
import {Email, Facebook, FmdGood, Instagram, Phone, Telegram} from "@mui/icons-material";
import {mobile} from "../responsive";


const Container = styled.div`
  display: flex;
  ${mobile({flexDirection: "column"})}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Logo = styled.h2``;
const Desc = styled.p`
  margin: 20px 0;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({display: "none"})};
`;

const Title =styled.h4`
  margin-bottom: 30px;
`;
const List =styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem =styled.li`
  width: 50%;
  margin-bottom: 10px;
`;


const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({backgroundColor: "#fff8f8"})}
`;

const ContactItem =styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>IAMB</Logo>
                <Desc>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto cum dolore in perferendis
                    saepe totam ullam veniam. Consequuntur deserunt, officiis!
                </Desc>
                <SocialContainer>
                    <SocialIcon color="3B5999">
                        <Facebook/>
                    </SocialIcon>
                    <SocialIcon color="E4405F">
                        <Instagram/>
                    </SocialIcon>
                    <SocialIcon color="55ACEE">
                        <Telegram/>
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Man Fashion</ListItem>
                    <ListItem>Woman Fashion</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <FmdGood style={{marginRight:"10px"}}/>Ukraine, Odesa, Bazarna 63
                </ContactItem>
                <ContactItem>
                    <Phone style={{marginRight:"10px"}}/>+123456789
                </ContactItem>
                <ContactItem>
                    <Email style={{marginRight:"10px"}}/>goshagriboeskii@gmail.com
                </ContactItem>
                <Payment src="https://i.ibb.co/Qfvn4z6/payment.png"/>
            </Right>
        </Container>
    );
};

export default Footer;
