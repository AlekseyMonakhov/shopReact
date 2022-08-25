import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { clearCart } from "../redux/cartRedux";
import { useDispatch } from "react-redux";


const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  gap: 50px;
  padding: 50px;
  text-align:center;
`;
const HomeButton = styled.button`
  padding: 10px;
  color: white;
  background-color:black;
  font-size: 18px;
  border-radius: 14px;
  cursor:pointer;

`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const accessToken = location.state.accessToken;
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch();
  const clear = () => {
    dispatch(clearCart());
  };
  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await axios.post("http://localhost:3001/api/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        }, { headers: { token: `Bearer ${accessToken}` }, });
        setOrderId(res.data._id);
        clear();
      } catch (err) {
        console.log(err);
      }
    };
    data && cart.total && createOrder();
      
    
  }, [cart, data, currentUser, accessToken]);

  return (
    <Container>
      <Navbar />
      <Content>
        {orderId
          ? <h4>Order has been created successfully. Your order ID is ${orderId}</h4>
          : <h4>No new orders yet...</h4>}
        <StyledLink to={"/"}>
          <HomeButton>Return to main</HomeButton>
        </StyledLink>
      </Content>
      <Footer />
    </Container>


  );
};

export default Success;