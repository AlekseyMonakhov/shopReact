import { createSlice } from "@reduxjs/toolkit";


const favoriteSlice = createSlice({
    name: "favorite",
    initialState: {
        products: [],
        quantity: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            if (!state.products.find((el) => el._id === action.payload._id)) {
                state.products.push(action.payload);
                state.quantity += 1;
            }
        },
        removeProduct: (state, action) => {
            let item = state.products.find((product) => product._id === action.payload._id);
            state.products.splice(state.products.indexOf(item), 1);
            state.quantity -= 1;
        },
    },
});


export const { addProduct, removeProduct } = favoriteSlice.actions;
export default favoriteSlice.reducer;