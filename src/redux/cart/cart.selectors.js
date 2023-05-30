export const selectProductsCount = (rootReducer) => {
  return rootReducer.cartReducer.productsCart.reduce(
    (acc, curr) => acc + curr.qtd,
    0
  );
};

export const selectProductsTotalPrice = (rootReducer) => {
  return rootReducer.cartReducer.productsCart.reduce(
    (acc, curr) => acc + curr.price * curr.qtd,
    0
  );
};

export const selectTotalPriceDiscounted = (rootReducer) => {
  return rootReducer.cartReducer.productsCart.reduce(
    (acc, curr) => acc + curr.discount_price * curr.qtd,
    0
  );
};
