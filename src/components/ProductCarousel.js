//hooks
import { useRef } from "react";
import { useFetch } from "../hooks/useFetch";

//components
import ProductCard from "./ProductCard";

//css
import styles from "./ProductCarousel.module.css";

//utils
import { leftClick, rightClick } from "../utils/utils";

const ProductCarousel = ({ category, border, section }) => {
  const carousel = useRef(null);

  const url = "http://localhost:3000/products";
  const { data, loading, error } = useFetch(url, "GET");

  //carousel
  const handleLeftClick = (e) => {
    e.preventDefault();

    leftClick(carousel);
  };

  const handleRightClick = (e) => {
    e.preventDefault();

    rightClick(carousel);
  };

  return (
    <div className={styles.container}>
      {!loading && !error && (
        <>
          <h1 style={{ borderBottom: `1.1rem solid ${border}` }}>{section}</h1>
          <div className={styles.carousel} ref={carousel}>
            {data &&
              !loading &&
              !error &&
              data.map(
                (product) =>
                  product.category === category && (
                    <div className={styles.item} key={product.id}>
                      <ProductCard product={product} paddingBottom={"1.6rem"} />
                    </div>
                  )
              )}
          </div>
          <div className={styles.arrows}>
            <button onClick={handleLeftClick}>
              <img
                src="/static/images/216151_right_chevron_icon.png"
                alt="Scroll Left"
              />
            </button>
            <button onClick={handleRightClick}>
              <img
                src="/static/images/216151_right_chevron_icon.png"
                alt="Scroll Right"
              />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCarousel;
