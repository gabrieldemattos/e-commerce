import styles from "./Banner.module.css";

const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.offer}>
        <h1>Os melhores produtos para você e para sua casa</h1>
        <button>Aproveite {">"}</button>
      </div>
    </div>
  );
};

export default Banner;
