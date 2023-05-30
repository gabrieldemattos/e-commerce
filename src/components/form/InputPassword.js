import { useState } from "react";

//css
import styles from "./InputPassword.module.css";

//icon
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const InputPassword = ({
  span,
  text,
  information,
  name,
  minLength,
  maxLength,
  onChange,
  error,
  value,
}) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  //password
  const [showPasswordInInput, setShowPasswordInInput] = useState("password");
  const [visiblePassword, setVisiblePassword] = useState(false);

  const handlePassword = () => {
    if (visiblePassword === false) {
      setVisiblePassword(true);
      setShowPasswordInInput("text");
    } else if (visiblePassword === true) {
      setVisiblePassword(false);
      setShowPasswordInInput("password");
    }
  };

  return (
    <div>
      <div className={styles.label}>
        {text && (
          <label>
            {span && <span>{span}</span>}
            {text}
          </label>
        )}
      </div>
      {information && <p>{information}</p>}
      <div className={styles.password}>
        <input
          type={showPasswordInInput}
          name={name}
          maxLength={maxLength}
          minLength={minLength}
          onChange={handleChange}
          value={value}
          className={styles.input_password}
          style={{
            border:
              (error && "1px solid red") ||
              (!error && value && "1px solid green"),
          }}
          required
        />
        <span className={styles.show_password} onClick={handlePassword}>
          {!visiblePassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </span>
      </div>
    </div>
  );
};

export default InputPassword;
