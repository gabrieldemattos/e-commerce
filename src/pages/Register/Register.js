//hoks
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";

//css
import styles from "./Register.module.css";

//mask
import { IMaskInput } from "react-imask";

//utils
import { isDateValid } from "../../utils/utils";

//components
import Loading from "../../components/layout/Loading";
import Input from "../../components/form/Input";
import InputPassword from "../../components/form/InputPassword";
import InputRadio from "../../components/form/InputRadio";
import SubmitButton from "../../components/form/SubmitButton";
import Container from "../../components/layout/Container";

//react-router-dom
import { Link } from "react-router-dom";

const Register = () => {
  //registers
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [cpf, setCpf] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);

  //validations
  const [nameError, setNameError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [telephoneError, setTelephoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  //post users
  const url = "http://localhost:3000/users";
  const { data, loading, error } = useFetch(url, "GET");
  const alert = "Conta criada com sucesso. Bem-vindo(a)!";
  useFetch(url, "POST", userData, alert);

  //submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      nameError ||
      genderError ||
      birthDateError ||
      cpfError ||
      telephoneError ||
      emailError ||
      passwordError
    ) {
      alert("Alguns dados estão incorretos.");
      return;
    }

    setUserData({
      name: name.trim().toLowerCase(),
      gender,
      birthDate,
      cpf,
      telephone,
      email,
      password,
    });

    setName("");
    setGender("");
    setBirthDate("");
    setCpf("");
    setTelephone("");
    setEmail("");
    setPassword("");
  };

  //validate name, gender and check if the email is already registered
  useEffect(() => {
    if (data) {
      if (name) {
        const regex =
          /^[a-zA-ZÀ-ÿ]+(([' ][a-zA-ZÀ-ÿ ])?[a-zA-ZÀ-ÿ]*)* [a-zA-ZÀ-ÿ]+(([' ][a-zA-ZÀ-ÿ ])?[a-zA-ZÀ-ÿ]*)*$/;

        !regex.test(name) ? setNameError("Nome inválido") : setNameError("");
      }

      !gender
        ? setGenderError("Por favor, escolha uma das opções.")
        : setGenderError("");

      if (birthDate) {
        if (!isDateValid(birthDate)) {
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

      if (cpf) {
        const cpfExists = data.some(
          (user) =>
            user.cpf.replace(/[^\d]+/g, "") === cpf.replace(/[^\d]+/g, "")
        );

        if (cpf.length === 0) {
          setCpfError("É necessário informar um CPF.");
        } else if (cpf.replace(/\D/g, "").length !== 11) {
          setCpfError(
            "O CPF precisa ter 11 dígitos, por exemplo: 123.456.789-10"
          );
        } else if (cpfExists) {
          setCpfError("CPF já cadastrado.");
        } else {
          setCpfError("");
        }
      }

      if (telephone) {
        const telephoneExists = data.some(
          (user) => user.telephone === telephone
        );

        if (telephone.length !== 14) {
          setTelephoneError("Número do telefone principal incompleto.");
        } else if (telephoneExists) {
          setTelephoneError("Telefone já cadastrado.");
        } else {
          setTelephoneError("");
        }
      }

      if (email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const validEmail = regex.test(email);
        const emailExists = data.some((user) => user.email === email);

        !validEmail ? setEmailError("E-mail inválido.") : setEmailError("");

        emailExists && setEmailError("E-mail já cadastrado.");
      }

      if (password) {
        const passwordRegex = /(?=.*[@#$!%*?&])/;

        if (!passwordRegex.test(password) && password.length >= 6) {
          setPasswordError(
            "A senha deve conter pelo menos um caractere especial."
          );
        } else if (password.length < 6) {
          setPasswordError(
            "A senha deve ter pelo menos seis caracteres, incluindo pelo menos um caractere especial."
          );
        } else {
          setPasswordError("");
        }
      }
    }
  }, [data, name, gender, email, cpf, birthDate, telephone, password]);

  return (
    <Container>
      <div className={styles.container}>
        {data && !loading && !error ? (
          <>
            <div className={styles.header}>
              <h1>Criar seu cadastro</h1>
              <p>
                Veja seus pedidos de forma fácil, compre mais rápido e tenha uma
                experiência personalizada
              </p>
              <p style={{ fontSize: "1.2rem", marginTop: "-.5rem" }}>
                <span>*</span>Campos obrigatórios
              </p>
            </div>
            <div className={styles.register}>
              <form onSubmit={handleSubmit} autoComplete="off">
                <div className={styles.name}>
                  <Input
                    span="*"
                    text={"Nome completo"}
                    type={"text"}
                    name={"name"}
                    onChange={setName}
                    value={name}
                    error={nameError}
                    required={true}
                  />
                </div>
                <div className={styles.gender}>
                  <label>
                    <span>*</span>Gênero
                  </label>
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
                <h2 style={{ display: genderError ? "block" : "none" }}>
                  {genderError}
                </h2>
                <label>
                  <span>*</span>Data de Nascimento
                </label>
                <p>
                  Necessário pra identificar a maioridade, no formato DD/MM/AAAA
                </p>
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
                {birthDateError && <h2>{birthDateError}</h2>}
                <label>
                  <span>*</span>CPF
                </label>
                <p>Necessário pra emissão das notas fiscais</p>
                <IMaskInput
                  type="tel"
                  name="cpf"
                  mask="000.000.000-00"
                  maxLength={14}
                  minLength={14}
                  placeholder="___ ___ ___-__"
                  onChange={(e) => setCpf(e.target.value)}
                  value={cpf}
                  className={styles.input_cpf}
                  required={true}
                  style={{
                    border:
                      (cpfError && "1px solid red") ||
                      (!cpfError && cpf && "1px solid green"),
                  }}
                />
                {cpfError && <h2>{cpfError}</h2>}
                <label>
                  <span>*</span>Telefone
                </label>
                <p>Caso a gente precise entrar em contato sobre seus pedidos</p>
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
                {telephoneError && <h2>{telephoneError}</h2>}
                <div className={styles.email}>
                  <Input
                    span="*"
                    text={"E-mail"}
                    information={
                      "Informe um e-mail válido para ativar sua conta"
                    }
                    type={"email"}
                    name="email"
                    onChange={setEmail}
                    value={email}
                    error={emailError}
                    required={true}
                  />
                </div>

                <div>
                  <div className={styles.password}>
                    <InputPassword
                      span="*"
                      text="Senha"
                      information="Precisa ter entre 6 e 20 caracteres"
                      name="password"
                      onChange={setPassword}
                      error={passwordError}
                      maxLength={20}
                      minLength={6}
                      value={password}
                    />
                  </div>
                  {passwordError && (
                    <h2 style={{ marginBlock: ".2rem 0" }}>{passwordError}</h2>
                  )}
                </div>
                <SubmitButton text="Criar cadastro" />
              </form>
              <div className={styles.login}>
                <h3>
                  Já tem uma conta? {""}
                  <Link to="/login">
                    <span>Entre agora</span>
                  </Link>
                </h3>
              </div>
            </div>
          </>
        ) : (
          error && !loading && <div className="request-error">{error}</div>
        )}
      </div>
      {loading && (
        <div className="loader">
          <Loading />
        </div>
      )}
    </Container>
  );
};

export default Register;
