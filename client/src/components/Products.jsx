import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(
                    cat
                        ? `http://localhost:3001/api/products?category=${cat}`
                        : `http://localhost:3001/api/products`
                );
                setProducts(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getProducts()
    }, [cat]);

    useEffect(() => {
        cat &&
            setFilteredProducts(
                products.filter((item) =>
                    Object.entries(filters).every(([key, value]) =>
                        item[key].includes(value)
                    )
                )
            );
    }, [products, cat, filters]);
    useEffect(() => {
        if (sort === "newest") {
            setFilteredProducts(prev =>
                [...prev].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            );
        } if (sort === "asc") {
            setFilteredProducts(prev =>
                [...prev].sort((a, b) => a.price - b.price)
            );
        }
        if (sort === "desc") {
            setFilteredProducts(prev =>
                [...prev].sort((a, b) => b.price - a.price)
            );
        };

    }, [sort]);


    return (
        <Container>
            {cat
                ? filteredProducts.map(product => <Product item={product} key={product._id} />)
                : products.slice(0,8).map(product => <Product item={product} key={product._id} />)
            }
        </Container>
    );
};

export default Products;
