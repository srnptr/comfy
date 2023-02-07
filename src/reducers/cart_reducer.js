/* import { startTrackValue } from "@testing-library/user-event/dist/types/document/trackValue"; */
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "./actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    const item = state.cart.find((item) => item.id === id + color);
    if (item) {
      const tempCart = state.cart.map((item) => {
        if (item.id === id + color) {
          let newAmount = item.amount + amount;
          if (newAmount > item.max) newAmount = item.max;
          return { ...item, amount: newAmount };
        } else {
          return { item };
        }
      });
      return {
        ...state,
        cart: tempCart,
      };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return {
        ...state,
        cart: [...state.cart, newItem],
      };
    }
  }
  if (action.type === REMOVE_CART_ITEM) {
    const newCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: newCart };
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        let newAmount = item.amount + value;
        if (newAmount > item.max) {
          newAmount = item.max;
        }
        if (newAmount < 1) {
          newAmount = 1;
        }
        return { ...item, amount: newAmount };
      } else {
        return item;
      }
    });
    return { ...state, cart: tempCart };
  }
  if (action.type === COUNT_CART_TOTALS) {
    const { totalItems, totalAmount } = state.cart.reduce(
      (total, cartItem) => {
        total.totalItems += cartItem.amount;
        total.totalAmount += cartItem.amount * cartItem.price;
        return total;
      },
      { totalItems: 0, totalAmount: 0 }
    );
    return { ...state, totalItems, totalAmount };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
