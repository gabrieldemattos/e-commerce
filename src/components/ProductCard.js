//css
import styles from "./ProductCard.module.css";

//react-router
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

//components
import StarReviews from "./StarReviews";

//hooks
import { useDiscountAndInstallments } from "../hooks/useDiscountAndInstallments";

//reviews
const items = [...new Array(5).keys()];

const ProductCard = ({ product, widthProduct, paddingBottom }) => {
  const {
    promotion,
    price,
    portion,
    discountedPrice,
    installments,
    updatePromotion,
    updatePrice,
    updatePortion,
  } = useDiscountAndInstallments();

  //discount ans installments
  useEffect(() => {
    if (product) {
      updatePromotion(product.promotion);
      updatePrice(product.price);
      updatePortion(product.installments);
    }
  }, [product, updatePromotion, updatePrice, updatePortion]);

  //reviews
  const [active, setActive] = useState();

  useEffect(() => {
    if (product) {
      setActive(product.product_review);
    }
  }, [product]);

  return (
    <Link to={`/product/${product.id}`}>
      <div
        className={styles.product_card}
        style={{ maxWidth: `${widthProduct}` }}
      >
        <div className={styles.product_img}>
          <img src={product.product_images.image_1[0]} alt={product.name} />
          <button>conferir</button>
        </div>
        <div className={styles.products_info}>
          <div className={styles.reviews}>
            <h2>{product.name}</h2>
            {product.product_variations > 1 && (
              <h4>variações: {product.product_variations}</h4>
            )}
            <div className={styles.product_review}>
              <div>
                {items.map((index) => (
                  <StarReviews
                    key={index}
                    color={index < active ? "#f2c832" : "#ccc"}
                  />
                ))}
              </div>
              <span>
                ({product.product_review}{" "}
                {product.product_review === 1 ? "avaliação" : "avaliações"})
              </span>
            </div>
          </div>
          <div
            className={styles.price}
            style={{ paddingBottom: `${paddingBottom}` }}
          >
            {product.promotion > 0 && (
              <div className={styles.promotion}>
                <p>R$ {price.toString().replace(".", ",")} </p>
                <div className={styles.discount}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 10 11"
                    fill="#fff"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.discount_badge}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M.79 5.17a.462.462 0 10-.655.655l4.435 4.437a.462.462 0 00.69.04L9.727 5.83a.463.463 0 00-.654-.654l-3.68 3.682V1.024a.462.462 0 10-.924 0v7.83L.79 5.17z"
                      fill="#fff"
                    ></path>
                  </svg>
                  <span>{promotion}%</span>
                </div>
              </div>
            )}
            <h3>{`R$ ${discountedPrice.toString().replace(".", ",")}`}</h3>
            {product.installments > 1 ? (
              <p>
                {`${portion}x de R$ ${installments
                  .toString()
                  .replace(".", ",")} no
                cartão de crédito`}
              </p>
            ) : (
              <p>{portion}x no cartão de crédito</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
