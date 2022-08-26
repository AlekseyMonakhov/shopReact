import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from 'styled-components';
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import { useEffect, useState } from "react";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";


const Container = styled.div``;
const CabinetContainer = styled.div`
    display: flex;
    padding: 50px;
    flex-flow: column nowrap;
    gap: 30px;
`;
const ClientName = styled.h2`
 font-size: 24px;
`
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
    ::first-letter{
        font-size: 22px;
        font-weight: 600;
    }
`;


const Cabinet = () => {
    const location = useLocation();
    const clientId = location.pathname.split("/")[2];
    const [orders, setOrders] = useState([]);
    const userName = useSelector((state) => state.user.currentUser.username);
    useEffect(() => {
        const getUserOrders = async () => {
            try {
                const res = await userRequest.get(`/orders/find/${clientId}`);
                setOrders(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUserOrders();


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clientId,userRequest])
    console.log(orders);
    return (
        <Container>
            <Navbar />
            <CabinetContainer>
                <ClientName>Hello, {userName}</ClientName>
                <ClientOrdersTitle>You orders</ClientOrdersTitle>
                <ClientOrders>
                    {orders.map((order) => (
                        <ClientOrder key={order._id}>
                            <ClientOrderId>Order id: {order._id}</ClientOrderId>
                            <ClientOrderDesc>amount: {order.amount}</ClientOrderDesc>
                            <ClientOrderDesc>adress: {order.address.city} {order.address.country}</ClientOrderDesc>
                            <ClientOrderDesc>order date: {order.createdAt.split("T")[0]}</ClientOrderDesc>
                            <ClientOrderDesc>order status: {order.status}</ClientOrderDesc>
                        </ClientOrder>
                    ))}
                </ClientOrders>
            </CabinetContainer>
            <Footer />
        </Container>
    )
}

export default Cabinet