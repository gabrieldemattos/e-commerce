import styles from "./NotFound.module.css";

//react-router-dom
import { Link } from "react-router-dom";

//components
import Container from "../../components/layout/Container";

const NotFound = () => {
  return (
    <Container>
      <div className={styles.container}>
        <h1>404</h1>
        <h2>Página não encontrada.</h2>
        <Link to="/">
          <p>Voltar para página principal.</p>
        </Link>
      </div>
    </Container>
  );
};

export default NotFound;
