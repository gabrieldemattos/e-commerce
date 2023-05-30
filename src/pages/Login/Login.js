//CSS
import styles from "./Login.module.css";

//icon
import { FiUser } from "react-icons/fi";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { BiError } from "react-icons/bi";

//react-router-dom
import { Link } from "react-router-dom";

//hooks
import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Login = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const [visibleError, setVisibleError] = useState(false);

  const { error, loading } = useAuthentication(
    userData.email,
    userData.password
  );

  //submit email and password
  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "" && password === "") {
      return setVisibleError(true);
    }

    setUserData({
      email: email,
      password: password,
    });
    setVisibleError(false);
  };

  //visible password
  const handlePassword = () => {
    if (visiblePassword === false) {
      setVisiblePassword(true);
      setPasswordType("text");
    } else if (visiblePassword === true) {
      setVisiblePassword(false);
      setPasswordType("password");
    }
  };

  //alert invalid authentication
  useEffect(() => {
    setVisibleError(error);
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.bg}></div>
      <div className={styles.form}>
        <h1>
          <span>
            {" "}
            <FiUser />
          </span>{" "}
          Login
        </h1>
        <h3>
          Veja seus pedidos de forma fácil, compre mais rápido e tenha uma
          experiência personalizada.
        </h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className={styles.input_password}>
            <input
              type={passwordType}
              placeholder="Senha"
              className={styles.password}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <span className={styles.show_password} onClick={handlePassword}>
              {!visiblePassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
          <p>Esqueci a senha</p>
          {visibleError && (
            <div className={styles.error}>
              <i>
                <BiError />
              </i>
              <span>Usuário ou senha inválidos</span>
            </div>
          )}
          <button disabled={loading ? true : false}>Entrar</button>
        </form>
        <h4>
          Não tem cadastro?{" "}
          <Link to="/register">
            <span>Cadastre-se</span>
          </Link>
        </h4>
      </div>
    </div>
  );
};

export default Login;
