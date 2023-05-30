//react-router-dom
import { useSearchParams, useNavigate } from "react-router-dom";

//css
import styles from "./Search.module.css";

//hooks
import { useFetch } from "../../hooks/useFetch";
import { useQueryContext } from "../../hooks/useQueryContext";
import { useEffect, useState } from "react";

//components
import ProductCard from "../../components/ProductCard";
import Loading from "../../components/layout/Loading";
import Container from "../../components/layout/Container";

const Search = () => {
  const { queryValue } = useQueryContext();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const url = "http://localhost:3000/products?" + searchParams;

  const { data, loading, error } = useFetch(url, "GET");
  const [products, setProducts] = useState([]);

  //checking if the product name matches the search
  useEffect(() => {
    if (!queryValue) {
      navigate("/");
      return;
    }

    if (data.length > 0) {
      const productsFiltered = data.filter((item) => {
        const search = queryValue
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        return item.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(search);
      });
      if (productsFiltered.length > 0) {
        setProducts(productsFiltered);
      } else {
        setProducts([]);
      }
    }
  }, [data, queryValue, navigate]);

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
      <div className={styles.container}>
        {loading && !error ? (
          <div className="loader">
            <Loading />
          </div>
        ) : products.length > 0 && !error && !loading ? (
          <h1>Resultados encontrados para: {queryValue} </h1>
        ) : (
          products.length <= 0 &&
          !error &&
          !loading && <h1> Nenhum resultado encontrado para: {queryValue} </h1>
        )}

        {error && <div className="request-error">{error}</div>}

        <div className={styles.results}>
          {products.length > 0 &&
            !error &&
            !loading &&
            products.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                sumOfDiscount={sumOfDiscount}
                installment={installment}
                widthProduct={"23.5rem"}
              />
            ))}
        </div>
      </div>
    </Container>
  );
};

export default Search;
