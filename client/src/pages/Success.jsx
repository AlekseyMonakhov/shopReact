import { userRequest } from "../requestMethods";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import styled from "styled-components";
import { Link } from "react-router-dom";


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
  const cart = location.state.cart;
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log(currentUser);
  const [orderId, setOrderId] = useState(null);
  console.log(data);
  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest?.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        console.log(res);
        setOrderId(res.data._id);
      } catch (err) {
        console.log(err);
      }
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  console.log(cart);

  return (
    <Container>
      <Navbar />
      <Content>
        {orderId
          ? <h4>Order has been created successfully. Your order ID is ${orderId}</h4>
          : <h4>Successfull. Your order is being prepared...</h4>}
        <StyledLink to={"/"}>
          <HomeButton>Return to main</HomeButton>
        </StyledLink>
      </Content>
      <Footer />
    </Container>


  );
};

export default Success;