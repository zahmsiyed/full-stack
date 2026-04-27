import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);

      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.totalQuantity += 1;
    },
    removeItem: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);

      if (item) {
        state.totalQuantity -= item.quantity;
      }

      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (!item) {
        return;
      }

      if (quantity <= 0) {
        state.totalQuantity -= item.quantity;
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        state.totalQuantity += quantity - item.quantity;
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
