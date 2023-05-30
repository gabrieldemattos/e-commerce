import styles from "./SubmitButton.module.css";

const SubmitButton = ({ text, handleClick }) => {
  return (
    <button className={styles.btn} onClick={handleClick}>
      {text}
    </button>
  );
};

export default SubmitButton;
