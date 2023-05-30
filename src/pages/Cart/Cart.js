//react-router-dom
import { Link } from "react-router-dom";

//css
import styles from "./Cart.module.css";

//icons
import { HiOutlineTrash } from "react-icons/hi";
import { CiPercent } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";

//utils
import { sumOfDiscount } from "../../utils/utils";

//redux
import {
  selectProductsTotalPrice,
  selectTotalPriceDiscounted,
  selectProductsCount,
} from "../../redux/cart/cart.selectors";

import {
  removeProductFromCart,
  increaseProductQuantity,
  decreaseProductQuantity,
} from "../../redux/cart/actions";

//components
import Container from "../../components/layout/Container";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();

  const { productsCart } = useSelector(
    (rootReducer) => rootReducer.cartReducer
  );

  const productsCount = useSelector(selectProductsCount);
  const productsTotalPrice = useSelector(selectProductsTotalPrice);
  const totalPriceDiscounted = useSelector(selectTotalPriceDiscounted);

  const handleRemoveClick = (id) => {
    dispatch(removeProductFromCart(id));
  };

  const handleIncreaseClick = (id) => {
    dispatch(increaseProductQuantity(id));
  };

  const handleDecreaseClick = (id) => {
    dispatch(decreaseProductQuantity(id));
  };

  return (
    <Container>
      <div className={styles.container}>
        {productsCart.length > 0 ? (
          <>
            <div className={styles.list}>
              <h1>Meu carrinho</h1>
              {productsCart.length > 0 &&
                productsCart.map((product, index) => (
                  <div key={index}>
                    <div className={styles.cart}>
                      <div className={styles.product_list}>
                        <i
                          className={styles.remove_icon}
                          onClick={() => handleRemoveClick(product.id)}
                        >
                          <HiOutlineTrash />
                        </i>
                        <div className={styles.product_item}>
                          <Link to={`/product/${product.id}`}>
                            <div>
                              <img
                                src={product.img}
                                alt={`foto de ${product.name}`}
                              />
                            </div>
                          </Link>
                          <div className={styles.product_details}>
                            <h3>{product.name}</h3>
                            <p>
                              Cor: <span>{product.selected_color}</span>
                            </p>
                            <p>
                              Tamanho:{" "}
                              <span>
                                {product.size === undefined && "único"}
                              </span>
                            </p>
                            <p>
                              Preço unitário:{" "}
                              <span>
                                R${" "}
                                {product.promotion > 0
                                  ? product.discount_price
                                  : product.price}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className={styles.product_controller}>
                          <div className={styles.qtd}>
                            <span>Quatidade:</span>
                            <div className={styles.button_qtd}>
                              <button
                                onClick={() => handleDecreaseClick(product.id)}
                              >
                                -
                              </button>
                              <input
                                type="text"
                                readOnly={true}
                                value={product.qtd}
                              />
                              <button
                                onClick={() => handleIncreaseClick(product.id)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className={styles.price}>
                            {product.promotion > 0 && (
                              <>
                                <p className={styles.old_price}>
                                  R${" "}
                                  {(product.qtd * product.price)
                                    .toFixed(2)
                                    .toString()
                                    .replace(".", ",")}
                                </p>
                                <p className={styles.discount}>
                                  (-{product.promotion}% OFF)
                                </p>
                              </>
                            )}
                            <p className={styles.new_price}>
                              {`R$ ${(
                                sumOfDiscount(
                                  product.promotion,
                                  product.price
                                ) * product.qtd
                              )
                                .toFixed(2)
                                .toString()
                                .replace(".", ",")}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div>
              <h1>Resumo da compra</h1>
              <div className={styles.cart_summary}>
                <ul>
                  <li>
                    <p>
                      Subtotal ({productsCount}{" "}
                      {productsCount > 1 ? "itens" : "item"})
                    </p>
                  </li>
                  <li>
                    <span>
                      R${" "}
                      {parseFloat(totalPriceDiscounted)
                        .toFixed(2)
                        .toString()
                        .replace(".", ",")}
                    </span>
                  </li>
                </ul>
                <ul>
                  <li>
                    <p>Frete</p>
                  </li>
                  <li>
                    <span>R$ 0,0</span>
                  </li>
                </ul>
                <ul>
                  <li>
                    <p>Valor total</p>
                  </li>
                  <li>
                    <span>
                      R${" "}
                      {parseFloat(totalPriceDiscounted)
                        .toFixed(2)
                        .toString()
                        .replace(".", ",")}
                    </span>
                  </li>
                </ul>
                <div className={styles.summary_economy}>
                  <div className={styles.economy}>
                    <i>
                      <CiPercent className={styles.economy_icon} />
                    </i>
                    <span>
                      VOCÊ ESTÁ ECONOMIZANDO R${" "}
                      {parseFloat(productsTotalPrice - totalPriceDiscounted)
                        .toFixed(2)
                        .toString()
                        .replace(".", ",")}
                    </span>
                  </div>
                </div>
                <div className={styles.summary_actions}>
                  <Link to="/summary">
                    <button className={styles.buy_button}>finalizar</button>
                  </Link>
                  <Link to="/">
                    <button className={styles.keep_buying}>
                      escolher mais
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.empty_cart}>
            <div className={styles.icon_cart}>
              <i>
                <FiShoppingCart />
              </i>
            </div>
            <h3>Seu carrinho está vazio</h3>
            <p>Escolha seus produtos e adicione em seu carrinho</p>
            <Link to={"/"}>
              <button>comece a comprar agora</button>
            </Link>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Cart;
