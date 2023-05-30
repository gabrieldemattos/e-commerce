//icons
import { IoLocationOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

//components
import Modal from "./Modal";

//CSS
import styles from "./Navbar.module.css";

//redux
import { useSelector } from "react-redux";

//hooks
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { zipCode } = useSelector((rootReducer) => rootReducer.zipCodeReducer);

  const [categories, setCategories] = useState([]);

  //modal
  const showModal = () => {
    const modal = document.querySelector("#modal");
    modal.classList.remove("hide");
  };

  //set categories
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("http://localhost:3000/products_categories");
      const resp = await data.json();

      setCategories(resp);
    };

    fetchData();
  }, []);

  return (
    <nav className={styles.navbar}>
      <Modal />
      <div className={styles.navbar_container}>
        <div className={styles.zipcode}>
          <div>
            <i onClick={showModal}>
              <IoLocationOutline />
              {zipCode ? (
                <>
                  <span>Enviar para:</span>
                  <span className={styles.valid_zipcode}>{zipCode}</span>
                </>
              ) : (
                <span>Informe seu CEP</span>
              )}
            </i>
          </div>
        </div>
        <div className={styles.categories}>
          <div className={styles.category_submenu}>
            <div className={styles.hamburguer_menu}>
              <RxHamburgerMenu />
            </div>
            <div>
              <span>Categorias</span>
            </div>
          </div>
          <ul className={styles.category_menu}>
            <li>
              <div className={styles.category}>
                <ul>
                  {categories.map((category) => (
                    <Link
                      to={`/category/${category.toLowerCase()}`}
                      key={category}
                    >
                      <li>
                        <div>{category}</div>
                        <div>{">"}</div>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <Link to="/offers">
          <div className={styles.offers}>Ofertas</div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
