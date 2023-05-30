import styles from "./InputRadio.module.css";

const InputRadio = ({ name, id, value, chosenValue, onChange, text }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.form_control}>
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        checked={chosenValue === value}
        onChange={handleChange}
      />
      <label htmlFor={id}>{text}</label>
    </div>
  );
};

export default InputRadio;
