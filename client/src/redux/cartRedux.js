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
        changeQuantity: (state, action) => {
            let item = state.products.find((product) => product._id === action.payload.id);

            switch (action.payload.type) {
                case "add":
                    state.quantity += 1;
                    item.quantity += 1;
                    state.total += item.price;
                    break;

                default:
                    state.quantity -= 1;
                    item.quantity -= 1;
                    state.total -= item.price;
                    break;
            }
            if (item.quantity === 0) {
                state.products.splice(state.products.indexOf(item), 1);
            }
        },
        clearCart: (state, action) => {
            state.products.length = 0;
            state.quantity = 0;
            state.total = 0;
        }
    },
});


export const { addProduct, changeQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;