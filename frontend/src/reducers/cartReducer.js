import {CART_ADD_ITEM,CART_REMOVE_ITEM} from '../components/constants/cartConstant';

export const cartReducer = (oldlistCart={cartItems:[]},action)=>{
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = oldlistCart.cartItems.find((x)=>x.productId === item.productId);
            if(existItem){
                return{
                    ...oldlistCart,
                    cartItems: oldlistCart.cartItems.map(x=> x.productId === existItem.productId ? item : x)
                }
            }else{
                return{
                    ...oldlistCart,
                    cartItems:[...oldlistCart.cartItems,item]
                }
            }
        case CART_REMOVE_ITEM:
            return{
                ...oldlistCart,
                cartItems:oldlistCart.cartItems.filter(x=>{
                    return x.productId !== action.payload;
                })
            }
        default:
            return oldlistCart;
    }
}