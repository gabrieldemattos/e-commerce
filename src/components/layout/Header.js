//react
import { useState } from "react";

//logo
import logo from "../../img/logo.png";

//css
import styles from "./Header.module.css";

//icons
import { FiUser, FiShoppingCart } from "react-icons/fi";
import { BiSearchAlt2 } from "react-icons/bi";

//react-router
import { Link, useNavigate } from "react-router-dom";

//hooks
import { useQueryContext } from "../../hooks/useQueryContext";

//redux
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/user/actions";
import { selectProductsCount } from "../../redux/cart/cart.selectors";

const Header = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);
  const totalItensInCart = useSelector(selectProductsCount);

  //user name
  const updateUserName = (user) => {
    const firstName = user.name.split(" ")[0];

    return firstName.charAt(0).toUpperCase() + firstName.slice(1);
  };

  //query
  const { setQueryValue } = useQueryContext();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    navigate("/search?q=" + query);

    setQueryValue(query);
  };

  //logout
  const handleLogouClick = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={logo} alt="logo e-commerce" />
        </Link>
      </div>
      <div className={styles.search} onSubmit={handleSearch}>
        <form>
          <div className={styles.form_group}>
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              required
            />
            <span>O que você está procurando?</span>
          </div>
          <div className={styles.icon_search}>
            <button>
              <BiSearchAlt2 />
            </button>
          </div>
        </form>
      </div>
      <div className={styles.user}>
        <li className={styles.login}>
          <Link to={!currentUser && "/login"}>
            <i className={styles.icon}>
              <FiUser />
              <span>
                {!currentUser
                  ? "Entrar"
                  : `Olá, ${updateUserName(currentUser)}`}
              </span>
            </i>
          </Link>

          <ul className={styles.submenu}>
            {!currentUser ? (
              <>
                <p>Acesse sua conta ou faça seu cadastro.</p>
                <li>
                  <Link to="/login">
                    <button>Entrar</button>
                  </Link>
                </li>
                <li>
                  <Link to="/register">
                    <button>Cadastrar</button>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={currentUser ? "/my-account" : "/login"}>
                    <button>Minha conta</button>
                  </Link>
                </li>
                <li>
                  <Link to={currentUser ? "/my-account" : "/login"}>
                    <button>Meus pedidos</button>
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogouClick}>Sair</button>
                </li>
              </>
            )}
          </ul>
        </li>
        <Link to="/cart">
          <i className={`${styles.icon} ${styles.icon_cart}`}>
            <FiShoppingCart /> <p>{totalItensInCart}</p>
          </i>
        </Link>
      </div>
    </header>
  );
};

export default Header;
