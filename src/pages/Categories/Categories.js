//css
import styles from "./Categories.module.css";

//hooks
import { useFetch } from "../../hooks/useFetch";

//components
import Container from "../../components/layout/Container";
import ProductCard from "../../components/ProductCard";
import Loading from "../../components/layout/Loading";

//react-router-dom
import { useParams, Link } from "react-router-dom";

const Categories = () => {
  const { category } = useParams();

  const url = `http://localhost:3000/products?category=${category}`;
  const { data: products, loading, error } = useFetch(url, "GET");

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
      <div className={styles.category}>
        <Link to="/">
          <span>início</span>
        </Link>
        <span>{">"}</span>
        <Link to={`/category/${category}`}>
          <span>{category}</span>
        </Link>
      </div>
      <div className={styles.container}>
        {products &&
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
        {products.length === 0 && !error && !loading && (
          <h3 className={styles.empty_category}>
            Desculpe, não foi possível encontrar nenhum produto nesta categoria.
            Que tal verificar outras categorias ou voltar mais tarde?
          </h3>
        )}
      </div>
    </Container>
  );
};

export default Categories;
