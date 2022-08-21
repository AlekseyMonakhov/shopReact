import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            switch (state.products.some(el => el._id === action.payload._id)) {
                case false:
                    state.quantity += action.payload.quantity;
                    state.total += action.payload.price * action.payload.quantity;
                    state.products.push(action.payload);
                    break;
                case true:
                    state.quantity += action.payload.quantity;
                    state.total += action.payload.price * action.payload.quantity;
                    state.products.find(el => el._id === action.payload._id).quantity += action.payload.quantity;

                    break;

                default:
                    state.quantity += action.payload.quantity;
                    state.total += action.payload.price * action.payload.quantity;
                    break;
            }
        },
    },
});


export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;