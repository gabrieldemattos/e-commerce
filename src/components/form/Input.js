import styles from "./Input.module.css";

const Input = ({
  span,
  text,
  information,
  type,
  name,
  value,
  placeholder,
  error,
  onChange,
  maxLength,
  minLength,
  readOnly,
  required,
}) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.form_control}>
      {text && (
        <label>
          {span && <span>{span}</span>}
          {text}
        </label>
      )}
      {information && <p>{information}</p>}
      <input
        type={type}
        name={name}
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
        required={required}
        readOnly={readOnly}
        style={{
          border:
            (error && "1px solid red") ||
            (!error && value && "1px solid green"),
        }}
      />
      {error && <h4 className={styles.error}>{error}</h4>}
    </div>
  );
};

export default Input;
