//hooks
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useSelector } from "react-redux";

//css
import styles from "./ChangePassword.module.css";

//components
import MyAccount from "../../components/layout/MyAccount";
import InputPassword from "../../components/form/InputPassword";
import SubmitButton from "../../components/form/SubmitButton";

const ChangePassword = () => {
  const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);

  const url = `http://localhost:3000/users/${currentUser.id}`;
  const [patchUserData, setPatchUserData] = useState(null);
  useFetch(url, "PATCH", patchUserData);

  const [password, setPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [validPassword, setValidPassword] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState(false);

  //change password
  const handleNewPassword = (e) => {
    e.preventDefault();

    if (validPassword) {
      if (password !== currentUser.password) {
        alert("Senha atual incorreta.");
        setCurrentPasswordError(true);
        return;
      } else {
        setPatchUserData({ ...currentUser, password: newPassword });
        setCurrentPasswordError(false);

        setPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      }
    }
  };

  //password validation checks
  useEffect(() => {
    if (newPassword && confirmNewPassword) {
      setValidPassword(false);

      const passwordRegex = /(?=.*[@$#!%*?&])/;

      if (!passwordRegex.test(newPassword) && newPassword.length >= 6) {
        setValidPassword(false);
        setPasswordError(
          "A senha deve conter pelo menos um caractere especial."
        );
      } else if (newPassword.length < 6) {
        setValidPassword(false);
        setPasswordError(
          "A senha deve ter pelo menos seis caracteres, incluindo pelo menos um caractere especial."
        );
      } else if (newPassword !== confirmNewPassword) {
        setValidPassword(false);
        setPasswordError(
          "As senhas digitadas nos campos nova senha e confirmar nova senha devem ser iguais."
        );
      } else {
        setValidPassword(true);
        setPasswordError("");
      }
    }
  }, [newPassword, confirmNewPassword]);

  return (
    <MyAccount>
      <div className={styles.personal_info}>
        <h1>Alterar Senha</h1>
        <div className={styles.personal_info_wrapper}>
          <div className={styles.personal_info_forms}>
            <div className={styles.psychal_form}>
              <h2>Dados de autenticação da sua conta.</h2>
              <form onSubmit={handleNewPassword}>
                <InputPassword
                  text="Senha atual"
                  type="password"
                  name="current-password"
                  required
                  onChange={setPassword}
                  error={currentPasswordError}
                  value={password}
                />

                <InputPassword
                  text="Nova senha"
                  type="password"
                  name="new-password"
                  maxLength={20}
                  minLength={6}
                  required
                  onChange={setNewPassword}
                  value={newPassword}
                  error={passwordError}
                />

                {passwordError && <h2>{passwordError}</h2>}

                <InputPassword
                  text="Confirmar nova senha"
                  type="password"
                  name="confirm-password"
                  maxLength={20}
                  minLength={6}
                  required
                  onChange={setConfirmNewPassword}
                  value={confirmNewPassword}
                  error={passwordError}
                />

                {passwordError && <h2>{passwordError}</h2>}

                <SubmitButton text="Alterar senha" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </MyAccount>
  );
};

export default ChangePassword;
