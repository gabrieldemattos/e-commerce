//css
import styles from "./PersonalInfo.module.css";

//hooks
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useSelector } from "react-redux";

//mask
import { IMaskInput } from "react-imask";

//utils
import { isDateValid } from "../../utils/utils";

//components
import Input from "../../components/form/Input";
import InputRadio from "../../components/form/InputRadio";
import SubmitButton from "../../components/form/SubmitButton";
import MyAccount from "../../components/layout/MyAccount";
import Loading from "../../components/layout/Loading";

const PersonalInfo = () => {
  const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);

  //update in user
  const url = `http://localhost:3000/users/${currentUser.id}`;
  const [patchUserData, setPatchUserData] = useState(null);
  useFetch(url, "PATCH", patchUserData);

  const [users, setUsers] = useState([]);

  const [name, setName] = useState(currentUser.name);
  const [birthDate, setBirthDate] = useState(currentUser.birthDate);
  const [gender, setGender] = useState(currentUser.gender);
  const [telephone, setTelephone] = useState(currentUser.telephone);

  //validations
  const [nameError, setNameError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");
  const [telephoneError, setTelephoneError] = useState("");

  //fetch users
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((resp) => resp.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);

  //send update data
  const handleUpdateUserData = (e) => {
    e.preventDefault();

    if (nameError || birthDateError || telephoneError) {
      alert(
        "Ops! Alguns dados inseridos são inválidos. Por favor, verifique e tente novamente."
      );
      return;
    }
    setPatchUserData({
      ...currentUser,
      name: name.toLowerCase(),
      birthDate,
      gender,
      telephone,
    });
  };

  //validate name, birthdate and telephone
  useEffect(() => {
    if (name) {
      const regex =
        /^[a-zA-ZÀ-ÿ]+(([' ][a-zA-ZÀ-ÿ ])?[a-zA-ZÀ-ÿ]*)* [a-zA-ZÀ-ÿ]+(([' ][a-zA-ZÀ-ÿ ])?[a-zA-ZÀ-ÿ]*)*$/;

      !regex.test(name) ? setNameError("Nome inválido") : setNameError("");
    }

    if (birthDate) {
      if (birthDate.length === 0) {
        setBirthDateError("É necessário informar a data de nascimento.");
      } else if (birthDate.length > 0 && birthDate.length < 10) {
        setBirthDateError("Informe a data de nascimento corretamente.");
      } else if (!isDateValid(birthDate)) {
        setBirthDateError("Informe uma data de nascimento válida.");
      } else {
        let partesData = birthDate.split("/");
        let diaNascimento = partesData[0];
        let mesNascimento = partesData[1];
        let anoNascimento = partesData[2];
        let dataAtual = new Date();
        let mesAtual = dataAtual.getMonth() + 1;
        let anoAtual = dataAtual.getFullYear();
        let userBirthDate = anoAtual - anoNascimento;

        if (
          mesAtual < mesNascimento ||
          (mesAtual === mesNascimento && dataAtual.getDate() < diaNascimento)
        ) {
          userBirthDate--;
        }

        if (userBirthDate >= 18) {
          setBirthDateError("");
        } else {
          setBirthDateError(
            "Você precisa ser maior de 18 anos para se cadastrar."
          );
        }
      }
    }

    if (telephone) {
      const telephoneExists = users.some(
        (user) => user.telephone === telephone && user.id !== currentUser.id
      );

      if (telephone.length !== 14) {
        setTelephoneError("Número do telefone principal incompleto.");
      } else if (telephoneExists) {
        setTelephoneError("Telefone já cadastrado.");
      } else {
        setTelephoneError("");
      }
    }
  }, [users, name, birthDate, telephone, currentUser.id]);

  return (
    <MyAccount>
      <div className={styles.personal_info}>
        <h1>Seus Dados</h1>
        <div className={styles.personal_info_wrapper}>
          {currentUser ? (
            <div className={styles.personal_info_forms}>
              <div className={styles.psychal_form}>
                <h2>Dados pessoais</h2>
                <form onSubmit={handleUpdateUserData}>
                  <Input
                    text="Nome completo"
                    type="text"
                    name="fullname"
                    value={name.toUpperCase()}
                    onChange={setName}
                    maxLength={48}
                    error={nameError}
                    required={true}
                  />
                  <label>Data de Nascimento</label>
                  <IMaskInput
                    type="tel"
                    name="birthDate"
                    mask="00/00/0000"
                    maxLength={10}
                    minLength={10}
                    placeholder="__/__/____"
                    onChange={(e) => setBirthDate(e.target.value)}
                    value={birthDate}
                    className={styles.input_date}
                    required={true}
                    style={{
                      border:
                        (birthDateError && "1px solid red") ||
                        (!birthDateError && birthDate && "1px solid green"),
                    }}
                  />
                  {birthDateError && <h5>{birthDateError}</h5>}
                  <label>CPF</label>
                  <IMaskInput
                    type="text"
                    readOnly
                    id="cpf"
                    mask="000***********"
                    required
                    maxLength={12}
                    value={`${currentUser.cpf.substring(0, 3)}***********}`}
                  />
                  <div className={styles.gender}>
                    <label>Sexo</label>
                    <div className={styles.radio}>
                      <InputRadio
                        name="gender"
                        id="female"
                        value="female"
                        chosenValue={gender}
                        onChange={setGender}
                        text="Feminino"
                      />
                      <InputRadio
                        name="gender"
                        id="male"
                        value="male"
                        chosenValue={gender}
                        onChange={setGender}
                        text="Masculino"
                      />
                      <InputRadio
                        name="gender"
                        id="no-information"
                        value="no-information"
                        chosenValue={gender}
                        onChange={setGender}
                        text="Não informar"
                      />
                    </div>
                  </div>
                  <label>Telefone</label>
                  <IMaskInput
                    type="tel"
                    name="telephone"
                    mask="(00)00000-0000"
                    maxLength={14}
                    minLength={14}
                    placeholder="(__) _____-____"
                    onChange={(e) => setTelephone(e.target.value)}
                    value={telephone}
                    className={styles.input_telephone}
                    required={true}
                    style={{
                      border:
                        (telephoneError && "1px solid red") ||
                        (!telephoneError && telephone && "1px solid green"),
                    }}
                  />
                  {telephoneError && <h5>{telephoneError}</h5>}
                  <div className={styles.personal_info_controller}>
                    <div className={styles.personal_info_button_wrapper}>
                      <SubmitButton text="Salvar informações" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="loader">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </MyAccount>
  );
};

export default PersonalInfo;
