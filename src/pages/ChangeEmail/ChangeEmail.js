//hooks
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useSelector } from "react-redux";

//css
import styles from "./ChangeEmail.module.css";

//components
import MyAccount from "../../components/layout/MyAccount";
import Input from "../../components/form/Input";
import SubmitButton from "../../components/form/SubmitButton";

const ChangeEmail = () => {
  const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);

  const url = `http://localhost:3000/users/${currentUser.id}`;
  const [patchUserData, setPatchUserData] = useState(null);
  useFetch(url, "PATCH", patchUserData);

  const [newEmail, setNewEmail] = useState("");
  const [confirmNewEmail, setConfirmNewEmail] = useState("");

  const [email, setEmail] = useState("");

  const [emailError, setEmailError] = useState("");

  const [validEmail, setValidEmail] = useState(false);

  const [users, setUsers] = useState([]);

  //fetch users
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((resp) => resp.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);

  //set data
  useEffect(() => {
    if (currentUser) {
      const { email } = currentUser;

      setEmail(email);
    }
  }, [patchUserData, currentUser]);

  //change e=mail
  const handleNewEmail = (e) => {
    e.preventDefault();

    if (emailError) {
      alert(emailError);
      return;
    }

    if (validEmail) {
      setEmail(newEmail);
      setPatchUserData({ ...currentUser, email: newEmail.toLocaleLowerCase() });

      setNewEmail("");
      setConfirmNewEmail("");
    }
  };

  //checks to validate email
  useEffect(() => {
    if (newEmail) {
      setValidEmail(false);

      //check that the new email is valid and not in use
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const validNewEmail = regex.test(newEmail);
      const newEmailExists = users.some((user) => user.email === newEmail);

      //set error if email is not valid or already in use
      if (!validNewEmail) {
        setEmailError("E-mail inválido.");
      } else if (newEmailExists) {
        setEmailError("E-mail já cadastrado.");
      }

      //checks if the email is the same as the confirmation email and sets the validEmail state to true
      if (validNewEmail && !newEmailExists) {
        if (newEmail === confirmNewEmail) {
          setEmailError("");
          return setValidEmail(true);
        } else if (newEmail !== confirmNewEmail) {
          setEmailError("Os email precisam ser iguais");
          setValidEmail(false);
        } else {
          setEmailError("Informe o novo e-mail");
          setValidEmail(false);
        }
      }
    }
  }, [confirmNewEmail, newEmail, users]);

  return (
    <MyAccount>
      <div className={styles.personal_info}>
        <h1>Alterar E-mail</h1>
        <div className={styles.personal_info_wrapper}>
          <div className={styles.personal_info_forms}>
            <div className={styles.psychal_form}>
              <h2>Dados de acesso do e-mail</h2>
              <form onSubmit={handleNewEmail}>
                <Input
                  text={"E-mail atual"}
                  type="text"
                  name="current-email"
                  value={email}
                  readOnly={true}
                  required={true}
                />
                <Input
                  text={"Novo e-mail"}
                  type={"email"}
                  name="new-email"
                  onChange={setNewEmail}
                  value={newEmail}
                  error={emailError}
                  required={true}
                />

                <Input
                  text={"Confirmar novo e-mail"}
                  type={"email"}
                  name="confirm-email"
                  onChange={setConfirmNewEmail}
                  value={confirmNewEmail}
                  error={emailError}
                  required={true}
                />
                {validEmail && (
                  <h5 style={{ color: "green" }}>E-mail válido</h5>
                )}

                <SubmitButton text="Alterar e-mail" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </MyAccount>
  );
};

export default ChangeEmail;
