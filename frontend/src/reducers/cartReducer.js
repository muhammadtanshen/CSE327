import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_RESET
} from "../components/constants/cartConstant";

export const cartReducer = (oldlistCart = { cartItems: [],shippingAddress:{} }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = oldlistCart.cartItems.find(
        (x) => x.productId === item.productId
      );
      if (existItem) {
        return {
          ...oldlistCart,
          cartItems: oldlistCart.cartItems.map((x) =>
            x.productId === existItem.productId ? item : x
          ),
        };
      } else {
        return {
          ...oldlistCart,
          cartItems: [...oldlistCart.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...oldlistCart,
        cartItems: oldlistCart.cartItems.filter((x) => {
          return x.productId !== action.payload;
        }),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...oldlistCart,
        shippingAddress: action.payload,
      };
      case CART_SAVE_PAYMENT_METHOD:
      return {
        ...oldlistCart,
        paymentMethod: action.payload,
      }
      case CART_RESET:
        return{
          oldlistCart:{cartItems:[]}
        }
    default:
      return oldlistCart;
  }
};
