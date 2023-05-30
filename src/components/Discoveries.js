//hooks
import { useState, useEffect, useCallback } from "react";
import { useFetch } from "../hooks/useFetch";

//css
import styles from "./Discoveries.module.css";

//components
import ProductCard from "./ProductCard";
import Loading from "./layout/Loading";

const Discoveries = ({ section, border }) => {
  const [dataLength, setDataLength] = useState(0);
  const [randomIndex, setRandomIndex] = useState([]);

  const url = "http://localhost:3000/products";
  const { data, loading, error } = useFetch(url, "GET");

  useEffect(() => {
    if (data) {
      setDataLength(data.length);
    }
  }, [data]);

  const sumOfDiscount = (promotion, price) => {
    const discount = promotion / 100;
    const discounted = price * discount;

    return (price - discounted).toFixed(2);
  };

  const installment = (portion, promotion, price) => {
    return (sumOfDiscount(promotion, price) / portion).toFixed(2);
  };

  const randomProducts = useCallback(
    (maximum, amount) => {
      if (data) {
        let numbers = [];
        while (numbers.length < amount) {
          let e = Math.floor(Math.random() * maximum);
          if (numbers.indexOf(e) === -1) {
            numbers.push(e);
          }
        }
        return setRandomIndex(numbers);
      }
      return;
    },
    [data]
  );

  useEffect(() => {
    if (dataLength > 0) {
      randomProducts(dataLength, 10);
    }
  }, [dataLength, randomProducts]);

  return (
    <div className={styles.container}>
      {error && !loading ? (
        <div className="request-error">{error}</div>
      ) : (
        !error &&
        !loading && (
          <h1 style={{ borderBottom: `1.1rem solid ${border}` }}>{section}</h1>
        )
      )}
      <div className={styles.product}>
        {data &&
          !loading &&
          !error &&
          data.length > 0 &&
          randomIndex.map((index) => (
            <ProductCard
              product={data[index]}
              sumOfDiscount={sumOfDiscount}
              installment={installment}
              key={index}
              widthProduct={"23.5rem"}
            />
          ))}
        {loading && (
          <div className="loader">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

export default Discoveries;
