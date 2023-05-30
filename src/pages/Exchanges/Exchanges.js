//css
import styles from "./Exchanges.module.css";

//react-router-dom
import { Link } from "react-router-dom";

//components
import MyAccount from "../../components/layout/MyAccount";

const Exchanges = () => {
  return (
    <MyAccount>
      <div className={styles.exchanges}>
        <h1>Trocas</h1>
        <div className={styles.exchanges_empty}>
          <div className={styles.empty_page}>
            <div className={styles.empty_page_wrapper}>
              <h2>Você ainda não fez nenhuma troca</h2>
              <p>
                Para trocar seu produto, é só fazer a solicitação na seção
                “Pedidos”.
              </p>
            </div>
            <Link to="/">
              <button>ir para página principal</button>
            </Link>
          </div>
        </div>
      </div>
    </MyAccount>
  );
};

export default Exchanges;
