import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { Add, Remove } from "@mui/icons-material";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "25px", flexDirection: "column" })};
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  aspect-ratio: 3/4;
  max-height: 70vh;
  object-fit: contain;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  ${mobile({ padding: "0" })};
`;

const Title = styled.h2`
  font-weight: 200;
`;

const Desc = styled.p`
  padding: 20px 0;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })};
`;

const Filter = styled.fieldset`
  display: flex;
  border: none;
  gap: 5px;
  align-items: center;
  ${mobile({ padding: "2px" })};
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.input.attrs(props => ({
  type: "radio",
  name: "color",
  id: props.color,
}))`
display: none;
&:checked+label {
  scale: 125%;
}
`;
const FilterLabel = styled.label`
  width: 20px;
  height: 20px;
  border: 1px solid black;
  border-radius: 50%;
  background-color: ${props => props.color};
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
  cursor: pointer;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })};
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

const Button = styled.button`
  width: 125px;
  height: 50px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: #f8f4f4;
  }
`;

const ChoseSizeAndColor = styled.button`
  width: 125px;
  height: 50px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: #ffdbd1;
    border: 2px solid black;
  }
`;



const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [product, setProduct] = useState({});
  const [productVariant, SetProductVariant] = useState();
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState();
  const dispatch = useDispatch();


  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
        SetProductVariant(res.data.variant);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);


  const handleQuantity = (type) => {
    type === "inc" ? setQuantity(quantity + 1) : quantity > 1 && setQuantity(quantity - 1);
  };



  const handleClick = () => {
    const _id = productVariant[0]._id;
    dispatch(addProduct({ ...product, quantity, color, size, _id }));
  };
  console.log(size);
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>${product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.variant?.map((v, index) => (
                <React.Fragment key={v._id}>
                  <FilterColor color={v.color} key={v.color} onClick={() => {
                    let selectedVariant = product.variant.find(el => el.color === v.color);
                    setColor(v.color);
                    setSize(undefined);
                    SetProductVariant([selectedVariant]);
                  }} />
                  <FilterLabel htmlFor={v.color} color={v.color} key={index} />
                </React.Fragment>
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onClick={(e) => setSize(e.target.value)}>
                {productVariant?.map((v) => (
                  <FilterSizeOption key={v.size}>{v.size}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            {
              (size && color)
                ? <Button onClick={handleClick}>ADD TO CART</Button>
                : <ChoseSizeAndColor style={{fontSize:"12px"}}>Chose size and color</ChoseSizeAndColor>
            }
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default Product;
