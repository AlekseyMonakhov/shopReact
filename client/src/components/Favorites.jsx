import styled from "styled-components";
import { Link } from "react-router-dom";
import { CloseRounded } from "@mui/icons-material";
import React from "react";
import { mobile } from "../responsive";


const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Container = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	width: 30vw;
	height: 100vh;
	z-index: 15;
	background-color: white;
	padding: 50px 15px;
	${mobile({ width: "100vw" })};
`;
const Wrapper = styled.div`
	display: flex;
	flex-flow: column nowrap;
`;
const FavoriteItem = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	gap: 5%;
	padding: 10px;
	border-top: 1px solid #a8aaad;
	${mobile({ padding: "5px" })};
`
const ItemImg = styled.img`
	aspect-ratio: 3/4;
	max-height: 75px;
`;
const ItemTitle = styled.h5`
	font-size: 18px;
	color: black;
	font-weight: 600;
	${mobile({ fontSize: "12px" })};
`;
const Close = styled.div`
	position: absolute;
	top: 10px;
	right: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	@media only screen and (max-width: 835px) {
        h5+&{
		top: 10px;
		right: 10px;
		}
    }
`;

const Favorites = (item, toggler, remove) => {

	return (
		<Container>
			<Wrapper>
				<h4 style={{ padding: "10px", borderBottom: "1px solid grey" }}>Favorite</h4>
				{item.length ?
					item.map((i) => (
						<FavoriteItem key={i._id}>
							<StyledLink to={`/product/${i._id}`}>
								<ItemImg src={i.img} />
							</StyledLink>
							<ItemTitle>{i.title}</ItemTitle>
							<Close onClick={() => remove(i)}>
								<CloseRounded />
							</Close>
						</FavoriteItem>
					))
					: <h5 style={{ padding: "20px", textAlign: "center", letterSpacing: "5px", fontSize: "24px" }}>Empty yet...</h5>
				}
				<Close onClick={toggler}>
					<CloseRounded />
				</Close>
			</Wrapper>
		</Container>
	);
};

export default Favorites;
