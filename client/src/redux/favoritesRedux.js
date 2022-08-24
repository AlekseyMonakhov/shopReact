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
    },
});


export const { addProduct } = favoriteSlice.actions;
export default favoriteSlice.reducer;