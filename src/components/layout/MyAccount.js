//css
import styles from "./MyAccount.module.css";

//components
import Sidebar from "../Sidebar";

const MyAccount = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.account_menu}>
        <Sidebar />
      </div>

      <>{children}</>
    </div>
  );
};

export default MyAccount;
