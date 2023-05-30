//css
import styles from "./Footer.module.css";

//icons
import { CiInstagram, CiFacebook, CiTwitter, CiYoutube } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        <p>
          <span>E-Commerce</span> @ 2023
        </p>
      </div>
      <div className={styles.social_links}>
        <ul className={styles.list_social_links}>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li className={styles.facebook}>
              <CiFacebook />
            </li>
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li className={styles.instagram}>
              <CiInstagram />
            </li>
          </a>
          <a
            href="http://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li className={styles.twitter}>
              <CiTwitter />
            </li>
          </a>
          <a
            href="http://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li className={styles.youtube}>
              <CiYoutube />
            </li>
          </a>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
