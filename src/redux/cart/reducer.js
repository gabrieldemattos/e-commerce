import CartActionTypes from "./action-types";

const initialState = {
  productsCart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_PRODUCT:
      const productIsAlreadyInCart = state.productsCart.some(
        (product) => product.id === action.payload.id
      );

      if (productIsAlreadyInCart) {
        return {
          ...state,
          productsCart: state.productsCart.map((product) =>
            product.id === action.payload.id
              ? { ...product, qtd: product.qtd + 1 }
              : product
          ),
        };
      }

      return {
        ...state,
        productsCart: [...state.productsCart, { ...action.payload }],
      };

    case CartActionTypes.REMOVE_PRODUCT:
      return {
        ...state,
        productsCart: state.productsCart.filter(
          (product) => product.id !== action.payload
        ),
      };

    case CartActionTypes.INCREASE_PRODUCT_QUANTITY:
      return {
        ...state,
        productsCart: state.productsCart.map((product) =>
          product.id === action.payload
            ? { ...product, qtd: product.qtd + 1 }
            : product
        ),
      };
    case CartActionTypes.DECREASE_PRODUCT_QUANTITY:
      return {
        ...state,
        productsCart: state.productsCart
          .map((product) =>
            product.id === action.payload
              ? { ...product, qtd: product.qtd - 1 }
              : product
          )
          .filter((product) => product.qtd > 0),
      };

    case CartActionTypes.RESET_CART:
      return action.payload;

    default:
      return state;
  }
};

export default cartReducer;
