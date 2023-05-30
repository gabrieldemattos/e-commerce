//css
import styles from "./Sidebar.module.css";

//icons
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { RxThickArrowUp, RxExit } from "react-icons/rx";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";

//react-router-dom
import { NavLink, useNavigate } from "react-router-dom";

//redux
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/user/actions";

const Sidebar = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  //logout
  const handleLogouClick = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <nav className={styles.side_menu}>
      <ul>
        <li>
          <NavLink to="/my-account/orders">
            <div>
              <i>
                <TbTruckDelivery />
              </i>
              <p>Pedidos</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-account/exchanges">
            <div>
              <i>
                <MdOutlinePublishedWithChanges />
              </i>
              <p>Trocas</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-account/personal-info">
            <div>
              <i>
                <HiOutlineUserCircle />
              </i>
              <p>Seus Dados</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-account/change-email">
            <div>
              <i>
                <HiOutlineMail />
              </i>
              <p>Alterar e-mail</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-account/change-password">
            <div>
              <i>
                <RiLockPasswordLine />
              </i>
              <p>Alterar senha</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-account/address">
            <div>
              <i>
                <RxThickArrowUp />
              </i>
              <p>Endereço</p>
            </div>
          </NavLink>
        </li>
        <li onClick={handleLogouClick}>
          <i>
            <RxExit />
          </i>
          <p>Sair</p>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
