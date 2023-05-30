//react hooks
import { useEffect, useState } from "react";

//custom hooks
import { useFetch } from "../../hooks/useFetch";

//css
import styles from "./Offers.module.css";

//components
import Container from "../../components/layout/Container";
import Loading from "../../components/layout/Loading";
import ProductCard from "../../components/ProductCard";

const Offers = () => {
  const [products, setProducts] = useState([]);

  const url = "http://localhost:3000/products";
  const { data, loading, error } = useFetch(url, "GET");

  //get products
  useEffect(() => {
    if (data) {
      const searchProductsInPromotion = data
        .filter((product) => {
          return product.promotion > 0;
        })
        .sort((a, b) => b.promotion - a.promotion);

      setProducts(searchProductsInPromotion);
    }
  }, [data]);

  //discount
  const sumOfDiscount = (promotion, price) => {
    const discount = promotion / 100;
    const discounted = price * discount;

    return (price - discounted).toFixed(2);
  };

  const installment = (portion, promotion, price) => {
    return (sumOfDiscount(promotion, price) / portion).toFixed(2);
  };

  return (
    <Container>
      <h1 className={styles.title}>
        Aqui você encontra todas as promoções para aproveitar!
      </h1>
      <div className={styles.container}>
        {data &&
          !loading &&
          !error &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              sumOfDiscount={sumOfDiscount}
              installment={installment}
              widthProduct={"23.5rem"}
            />
          ))}
        {loading && (
          <div className="loader">
            <Loading />
          </div>
        )}
        {error && <div className="request-error">{error}</div>}
      </div>
    </Container>
  );
};

export default Offers;
