import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { Add, Remove } from "@mui/icons-material";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { changeQuantity } from "../redux/cartRedux";
import { useDispatch } from "react-redux";



const KEY = "pk_test_51LXUoZKHAec9sp94ocGA9IksEambeKUetYB93jsKWP3F0WFPG6jWNZxUgZFdlxdibCwP7T3wPDUuYWR6ZF3qsHui00MDs1CZ7D";

const Container = styled.div``;

const Wrapper = styled.div`
    padding: 20px;
  ${mobile({ padding: "10px" })};
`;

const Title = styled.h2`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${props => props.type === "filled" && "none"};
  background-color: ${props => props.type === "filled" ? "black" : "transparent"};
  color: ${props => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  @media only screen and (max-width: 835px) {
    & :first-child {
      display: none;
    }
  }
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })};
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })};
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  aspect-ratio: 3/4;
  object-fit: contain;
  ${mobile({ width: "100px" })};
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${mobile({ padding: "10px" })};
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid black;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })};
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })};
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgrey;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;
const SummaryTitle = styled.h4`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${props => props.type === "total" && "500"};
  font-size: ${props => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const EmptyCart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  height: 20vh;
`;

const Cart = () => {

  const cart = useSelector(state => state.cart);
  const user = useSelector(state => state.user);
  const quantityFavorite = useSelector((state) => state.favorite.quantity);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onToken = (token) => {
    setStripeToken(token);
  };
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total,
        });
        navigate("/success", {
          state: {
            stripeData: res.data,
            accessToken: user.currentUser.accessToken,
          },
        })
      } catch (err) {
        console.log(err);
      };
    }
    if (stripeToken && (cart.quantity >= 1) && user.currentUser) {
      makeRequest();
    }
    if (!user.currentUser) {
      navigate("/login");
    }
  }, [stripeToken, cart.total, navigate, cart, user.currentUser]);
  const setQuantity = (type, id) => {
    dispatch(changeQuantity({ type, id }));
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to={"/"}>
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag({cart.quantity})</TopText>
            <TopText>Your Wishlist({quantityFavorite})</TopText>
          </TopTexts>
        </Top>
        {cart.quantity
          ?
          <Bottom>
            <Info>
              {cart.products.map(product => (
                <Product key={product._id}>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <ProductName><b>Product:</b> {product.title}</ProductName>
                      <ProductId><b>ID:</b> {product._id}</ProductId>
                      <ProductColor color={product.color} />
                      <ProductSize><b>Size:</b> {product.size}</ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add style={{ cursor: "pointer" }} onClick={() => setQuantity("add", product._id)} />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Remove style={{ cursor: "pointer" }} onClick={() => setQuantity("remove", product._id)} />
                    </ProductAmountContainer>
                    <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                  </PriceDetail>
                </Product>
              ))}
              <Hr />
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>$ 5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>$ -5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <StripeCheckout
                name="IAMB"
                billingAddress
                shippingAddress
                description={`Your total is$${cart.total}`}
                amount={cart.total * 100}
                token={onToken}
                stripeKey={KEY}
              >
                <Button>CHECKOUT NOW</Button>

              </StripeCheckout>
            </Summary>
          </Bottom>
          : <EmptyCart><h5>Cart is empty yet ...</h5></EmptyCart>
        }
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
