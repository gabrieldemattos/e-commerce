//css
import styles from "./Product.module.css";

//hooks
import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useDiscountAndInstallments } from "../../hooks/useDiscountAndInstallments";
import { useDispatch } from "react-redux";

//redux
import { addProduct } from "../../redux/cart/actions";

//utils
import { sumOfDiscount, leftClick, rightClick } from "../../utils/utils";

//components
import StarReviews from "../../components/StarReviews";
import Loading from "../../components/layout/Loading";
import Container from "../../components/layout/Container";

//reviews
const items = [...new Array(5).keys()];

const Product = () => {
  const dispatch = useDispatch();

  const carousel = useRef(null);
  const { id } = useParams();
  const url = `http://localhost:3000/products/${id}`;
  const { data: product, loading, error } = useFetch(url, "GET");
  const { product_images, product_review, product_description } = product;
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

  const [colorSelected, setColorSelected] = useState("");
  const [imgSelected, setImgSelected] = useState("");

  const [productVariations, setProductVariations] = useState([]);
  const [indexImg, setIndexImg] = useState(0);

  const [magnifyStyle, setMagnifyStyle] = useState();

  //reviews, discount and installments
  const [active, setActive] = useState();

  useEffect(() => {
    if (product) {
      setActive(product_review);
      updatePromotion(product.promotion);
      updatePrice(product.price);
      updatePortion(product.installments);
    }
  }, [product, product_review, updatePromotion, updatePrice, updatePortion]);

  //recovering color and images
  useEffect(() => {
    if (product && product_images) {
      let productImagesArray = Object.values(product_images);

      setProductVariations(productImagesArray);
    }
  }, [product, product_images]);

  //carousel
  const handleLeftClick = (e) => {
    e.preventDefault();

    leftClick(carousel);
  };

  const handleRightClick = (e) => {
    e.preventDefault();

    rightClick(carousel);
  };

  //zoom in img
  useEffect(() => {
    if (imgSelected) {
      setMagnifyStyle({ backgroundImage: `url(${imgSelected})` });
    }
  }, [imgSelected]);

  const handleMouseMove = (e) => {
    const MAGNIFY_SIZE = 200;
    const MAGNIFY_SIZE_HALF = MAGNIFY_SIZE / 2;

    const { offsetX, offsetY, target } = e.nativeEvent;
    const { offsetWidth, offsetHeight } = target;

    const xPercentage = (offsetX / offsetWidth) * 100;
    const yPercentage = (offsetY / offsetHeight) * 100;

    setMagnifyStyle((prev) => ({
      ...prev,
      display: "block",
      backgroundPosition: `${xPercentage}% ${yPercentage}%`,
      top: `${offsetY - MAGNIFY_SIZE_HALF}px`,
      left: `${offsetX - MAGNIFY_SIZE_HALF}px`,
    }));
  };

  const handleMouseLeave = (e) => {
    setMagnifyStyle((prev) => ({ ...prev, display: "none" }));
  };

  //add to cart
  const handleAddToCart = async (color, img) => {
    const resp = await fetch(`http://localhost:3000/products/${id}`);
    const data = await resp.json();

    const dataProduct = {
      name: data.name,
      promotion: data.promotion,
      price: data.price,
      id: id,
      qtd: 1,
      selected_color: color,
      img: img,
      size: data.size ? data.size : undefined,
      discount_price: sumOfDiscount(data.promotion, data.price),
    };

    dispatch(addProduct(dataProduct));
  };

  return (
    <Container>
      <div className={styles.product_container}>
        {product && !loading && !error && (
          <>
            <div className={styles.product_general}>
              <div className={styles.product_image}>
                <div className={styles.zoom}>
                  <img
                    src={
                      !imgSelected
                        ? product_images?.image_1[0] &&
                          setImgSelected(product_images?.image_1[0])
                        : imgSelected
                    }
                    alt={product.name}
                    className={styles.image}
                    draggable={false}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                  />
                  <div className={styles.magnify} style={magnifyStyle}></div>
                </div>
                <div className={styles.carousel} ref={carousel}>
                  <div className={styles.carousel_images}>
                    {productVariations.length > 0 &&
                      productVariations[indexImg].map((image, index) => (
                        <img
                          src={image}
                          alt={product.name}
                          key={index}
                          onClick={() => {
                            setImgSelected(image);
                          }}
                          draggable={false}
                        />
                      ))}
                  </div>
                </div>
                <div className={styles.arrows}>
                  <button onClick={handleLeftClick}>
                    <img
                      src="/static/images/216151_right_chevron_icon.png"
                      alt="Scroll Left"
                      draggable={false}
                    />
                  </button>
                  <button onClick={handleRightClick}>
                    <img
                      src="/static/images/216151_right_chevron_icon.png"
                      alt="Scroll Right"
                      draggable={false}
                    />
                  </button>
                </div>
              </div>
              <div className={styles.product_info}>
                <h1>{product.name}</h1>
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
                    ({product_review}{" "}
                    {product_review === 1 ? "avaliação" : "avaliações"})
                  </span>
                </div>
                <div className={styles.product_description}>
                  <p>{product_description}</p>
                  <h3>Mais informações</h3>
                </div>
                <div className={styles.others_infos}>
                  <p>
                    cor:{" "}
                    <span>
                      {colorSelected === "" ? "Não selecionado" : colorSelected}
                    </span>
                  </p>
                  <div className={styles.product_options}>
                    {product_images?.colors.map((color, index) => (
                      <button
                        key={color}
                        onClick={() => {
                          setColorSelected(color);
                          setIndexImg(index);
                          setImgSelected(
                            product_images[`image_${index + 1}`]?.[0]
                          );
                        }}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.product_price}>
              <div className={styles.price}>
                {product.promotion > 0 && (
                  <div className={styles.promotion}>
                    <p>R$ {price?.toString().replace(".", ",")} </p>
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
                <h3>R$ {discountedPrice.toString().replace(".", ",")}</h3>
                {product.installments > 1 ? (
                  <p className={styles.installments}>
                    {portion}x de R$ {installments.toString().replace(".", ",")}{" "}
                    <span>no cartão de crédito</span>
                  </p>
                ) : (
                  <p className={styles.installments}>
                    {portion}x no cartão de crédito
                  </p>
                )}
              </div>
              <div className={styles.purchase}>
                <div className={styles.buttons}>
                  {colorSelected ? (
                    <Link to="/cart">
                      <button
                        onClick={() =>
                          handleAddToCart(
                            colorSelected,
                            productVariations[indexImg]
                          )
                        }
                      >
                        comprar
                      </button>
                    </Link>
                  ) : (
                    <button
                      onClick={() => alert("Escolha uma cor, por favor.")}
                    >
                      comprar
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (!colorSelected) {
                        return alert("Escolha uma cor, por favor.");
                      }
                      handleAddToCart(
                        colorSelected,
                        productVariations[indexImg]
                      );
                    }}
                  >
                    adicionar ao carrinho
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {loading && !error && (
          <div className="loader">
            <Loading />
          </div>
        )}
        {error && <div className="request-error">{error}</div>}
      </div>
    </Container>
  );
};

export default Product;
