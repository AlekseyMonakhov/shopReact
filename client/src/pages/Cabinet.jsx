import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import axios from "axios";

const Container = styled.div``;
const CabinetContainer = styled.div`
  display: flex;
  padding: 50px;
  flex-flow: column nowrap;
  gap: 30px;
`;
const ClientName = styled.h2`
  font-size: 24px;
`;
const ClientOrders = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;
const ClientOrdersTitle = styled.h3``;
const ClientOrder = styled.div`
  display: flex;
  position: relative;
  flex-flow: column nowrap;
  gap: 10px;
  width: 45%;
  padding: 25px 30px;
  overflow: hidden;
  ${mobile({ padding: "20px", width: "90%" })};
`;
const ClientOrderId = styled.h5`
  color: black;
  font-size: 16px;
  border-bottom: 1px solid grey;
`;
const ClientOrderDesc = styled.p`
  color: black;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 1px;
  ::first-letter {
    font-size: 22px;
    font-weight: 600;
  }
`;

const Cabinet = () => {
  const location = useLocation();
  const clientId = location.pathname.split("/")[2];
  const [orders, setOrders] = useState([]);
  const userName = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    const getUserOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/orders/find/${clientId}`,
          {
            headers: {
              token: `Bearer ${userName.accessToken}`,
            },
          }
        );
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserOrders();
  }, [clientId, userName.accessToken]);
  return (
    <Container>
      <Navbar />
      <CabinetContainer>
        <ClientName>Hello, {userName.username}</ClientName>
        <ClientOrdersTitle>You orders</ClientOrdersTitle>
        <ClientOrders>
          {orders.length ? (
            orders.map((order) => (
              <ClientOrder key={order._id}>
                <ClientOrderId>Order id: {order._id}</ClientOrderId>
                <ClientOrderDesc>amount: {order.amount}</ClientOrderDesc>
                <ClientOrderDesc>
                  adress: {order.address.city} {order.address.country}
                </ClientOrderDesc>
                <ClientOrderDesc>
                  order date: {order.createdAt.split("T")[0]}
                </ClientOrderDesc>
                <ClientOrderDesc>order status: {order.status}</ClientOrderDesc>
              </ClientOrder>
            ))
          ) : (
            <h4>No orders yet ... </h4>
          )}
        </ClientOrders>
      </CabinetContainer>
      <Footer />
    </Container>
  );
};

export default Cabinet;
