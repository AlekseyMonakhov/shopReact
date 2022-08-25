import styled from "styled-components";
import { Link } from "react-router-dom";
import { CloseRounded } from "@mui/icons-material";
import React from "react";


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
`;
const Wrapper = styled.div`
	display: flex;
	flex-flow: column nowrap;
`;
const FavoriteItem = styled.div`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
`
const ItemImg = styled.img`
	aspect-ratio: 3/4;
	max-height: 100px;
`;
const ItemTitle = styled.h5`
 font-size: 18px;
 color: black;
 font-weight: 600;
`;
const Close = styled.div`
	position: absolute;
	top: 10px;
	right: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;

const Favorites = (item, toggler, remove) => {

	return (
		<Container>
			<Wrapper>
				{item.map((i) => (
					<FavoriteItem key={i._id}>
						<StyledLink to={`/product/${i._id}`}>
							<ItemImg src={i.img} />
						</StyledLink>
						<ItemTitle>{i.title}</ItemTitle>
						<Close onClick={() => remove(i)}>
							<CloseRounded />
						</Close>
					</FavoriteItem>
				))}
				<Close onClick={toggler}>
					<CloseRounded />
				</Close>
			</Wrapper>
		</Container>
	);
};

export default Favorites;
