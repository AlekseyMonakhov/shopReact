import styled from "styled-components";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { useState } from "react";
import { sliderItems } from "../data";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: ${props => props.direction === "left" && "10px"};
  right: ${props => props.direction === "right" && "10px"};
  bottom: 0;
  margin: auto;
  cursor: pointer;
  opacity: .5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translateX(${props => props.slideIndex * -100}vw);
  transition: all 1.5s ease;
`;
const Slide = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 80vh;
  background-color: #${props => props.bg};
  ${mobile({ position: "relative" })};
`;
const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
  text-align: center;
`;
const Image = styled.img`
  height: 100%;
`;


const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  ${mobile({
  position: "absolute",
  textAlign: "center",
  bottom: 0,
  padding: "20px",
  backgroundColor: "rgba(255,255,255,0.35)",
})};
`;

const Title = styled.h2`
  font-size: 70px;
  ${mobile({ fontSize: "3vh" })};
`;
const Desc = styled.p`
  margin: 50px 0;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
  ${mobile({ fontSize: "2vh", margin: "35px 0" })};
`;
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Slider = () => {

  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeft />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((slider) => (
          <Slide bg={slider.bg} key={slider.id}>
            <ImgContainer>
              <Image src={slider.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{slider.title}</Title>
              <Desc>{slider.desc}</Desc>
              <StyledLink to={`/products/new`}>
                <Button>SHOP NOW</Button>
              </StyledLink>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRight />
      </Arrow>
    </Container>
  );
};

export default Slider;
