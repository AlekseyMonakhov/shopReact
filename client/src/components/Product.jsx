import styled from "styled-components";
import { FavoriteBorderOutlined, SearchOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { addProduct, removeProduct } from "../redux/favoritesRedux";
import { useDispatch } from "react-redux";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Title = styled.h5`
  position: absolute;
  bottom: 20px;
  z-index: 5;
  color: rgba(0, 0, 0, 1);
  font-size: 120%;
  letter-spacing: 1.5px;
  min-width: 60%;
  max-width: 90%;
  border-radius: 25px;
  padding: 10px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.75);
  transition: all 1s ease;
  cursor: pointer;
  overflow: hidden;
  &::first-letter {
    
    font-size: 48px;
    line-height: 32px;
    color: rgba(145, 13, 13, 1);
  }
`;

const Container = styled.div`
  flex: 1;
  padding: 5px;
  display: flex;
  min-width: 250px;
  max-width: 250px;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  ${mobile({ minWidth: "50%", maxWidth: "100%" })};
  &:hover ${Info}{
    opacity: 1;
  }
  &:hover ${Title} {
    opacity: 0;
  }
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  
  &:hover{
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
  &:hover a svg {
    fill: rgba(160, 9, 9, 1);
  }
  &:hover>svg {
    fill: rgba(255, 0, 0, 1);
  }
`;



const Product = ({ item }) => {
  const dispatch = useDispatch();
  const productsFavorite = useSelector((state) => state.favorite.products);
  console.log();

  const addToFavorites = (prod) => {
    dispatch(addProduct(prod))
  };
  const removeToFavorites = (prod) => {
    dispatch(removeProduct(prod))
  };
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Icon>
          <Link style={{ color: "black" }} to={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </Icon>
        {
          productsFavorite?.some((el) => el._id === item._id) ?
            <Icon style={{ color: "red" }} onClick={() => removeToFavorites(item)}>
              <FavoriteBorderOutlined />
            </Icon>
            :
            <Icon onClick={() => addToFavorites(item)}>
              <FavoriteBorderOutlined />
            </Icon>

        }
      </Info>
      <Title>{item.title}</Title>
    </Container>
  );
};

export default Product;
