//hooks
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useSelector } from "react-redux";

//css
import styles from "./Address.module.css";

//icons
import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs";

//Mask
import { IMaskInput } from "react-imask";

//components
import MyAccount from "../../components/layout/MyAccount";
import Input from "../../components/form/Input";
import SubmitButton from "../../components/form/SubmitButton";

const Address = () => {
  const { zipCode: zip } = useSelector(
    (rootReducer) => rootReducer.zipCodeReducer
  );
  const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);

  const {
    zipcode: addressZipcode,
    street: addressStreet,
    number: addressNumber,
    complement: addressComplement,
    district: addressDistrict,
    state: addressState,
    city: addressCity,
    reference_point: addressReferencePoint,
  } = currentUser.address || {};

  const url = `http://localhost:3000/users/${currentUser.id}`;
  const [patchUserData, setPatchUserData] = useState(null);
  const alert =
    "Endereço adicionado com sucesso. Agora você pode realizar suas compras com mais facilidade!";
  useFetch(url, "PATCH", patchUserData, alert);

  const [zipCode, setZipCode] = useState(zip ? zip : "");

  const [zipCodeError, setZipCodeError] = useState("");

  const [street, setStreet] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [referencePoint, setReferencePoint] = useState("");

  //fetch in zip code
  useEffect(() => {
    setZipCodeError("");
    setStreet("");
    setDistrict("");
    setState("");
    setCity("");

    if (zipCode) {
      const formatedZipCode = zipCode.replace(/[^0-9]/g, "");

      if (formatedZipCode.length === 8) {
        fetch(`https://viacep.com.br/ws/${formatedZipCode}/json/`)
          .then((resp) => resp.json())
          .then((data) => {
            if (data.erro) {
              setZipCodeError("CEP não encontrado.");
              setStreet("");
              setDistrict("");
              setState("");
              setCity("");
            }
            if (!data.erro) {
              setZipCodeError("");

              setStreet(data.logradouro);
              setDistrict(data.bairro);
              setState(data.uf);
              setCity(data.localidade);
            }
          })
          .catch((err) => console.log(err));
      } else {
        setZipCodeError("Digite um CEP válido de 8 dígitos.");
        setStreet("");
        setDistrict("");
        setState("");
        setCity("");
      }
    }
  }, [zipCode]);

  //function that makes the number input accept only number and nothing else (not even the letter 'e')
  const handleAddressNumber = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "").substring(0, 7);
    if (inputValue === "") {
      setNumber("");
    } else {
      setNumber(inputValue);
    }
  };

  //form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (zipCodeError || !street || !number || !district || !state || !city) {
      alert(
        "Ops! Alguns dados inseridos são inválidos. Por favor, verifique e tente novamente."
      );
      return;
    }
    setPatchUserData({
      ...currentUser,
      address: {
        zipcode: zipCode,
        street: street.toLowerCase(),
        number: number,
        complement: complement.toLowerCase(),
        district: district.toLowerCase(),
        state: state.toLowerCase(),
        city: city.toLowerCase(),
        reference_point: referencePoint.toLowerCase(),
      },
    });
  };

  //open edit address
  const openEditAddress = () => {
    const editAddress = document.querySelector("#edit-address");

    if (editAddress.style.display === "block") {
      editAddress.style.display = "none";
    } else {
      editAddress.style.display = "block";
    }
  };

  //remove address
  const handleRemoveAddress = () => {
    setPatchUserData({ ...currentUser, address: null });
  };

  return (
    <MyAccount>
      <div className={styles.container}>
        {currentUser.address ? (
          <div className={styles.address}>
            <h1>Endereços</h1>
            <div className={styles.address_list}>
              <ul>
                <li>
                  <div className={styles.card}>
                    <div className={styles.address}>
                      <h2>Endereço Principal</h2>
                      <p className={styles.street}>
                        {addressStreet}, {addressNumber}
                      </p>
                      {addressComplement && (
                        <p>Complemento: {addressComplement}</p>
                      )}
                      <p className={styles.district}>
                        {addressDistrict} - {addressCity} - {addressState}
                      </p>
                      <p>CEP: {addressZipcode}</p>
                      {addressReferencePoint && (
                        <p>Ponto de referência: {addressReferencePoint}</p>
                      )}
                    </div>
                    <div className={styles.card_options}>
                      <button onClick={() => openEditAddress()}>
                        <i>
                          <BsPencilSquare />
                        </i>
                        Alterar
                      </button>
                      <button onClick={() => handleRemoveAddress()}>
                        <i>
                          <BsFillTrashFill />
                        </i>
                        Excluir
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className={styles.register_address}>
            <h1>
              Adicione um endereço de entrega para aproveitar nossas ofertas!
            </h1>
            <div>
              <SubmitButton
                text="Adicionar endereço"
                handleClick={() => openEditAddress()}
              />
            </div>
          </div>
        )}
        <div className={styles.edit_adress} id="edit-address">
          <div className={styles.new_address}>
            <h2>Editar endereço</h2>
            <form onSubmit={handleSubmit}>
              <IMaskInput
                mask="00.000-000"
                placeholder="Digite seu CEP.."
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className={styles.zipcode}
                style={{
                  border:
                    (zipCodeError && "1px solid red") ||
                    (!zipCodeError && zipCode && "1px solid green"),
                }}
              />
              {zipCodeError && <p className={styles.error}>{zipCodeError}</p>}
              <Input
                type="text"
                name="street"
                placeholder="Endereço"
                maxLength={90}
                value={street}
                onChange={setStreet}
                required
              />
              <div className={styles.complement_address}>
                <input
                  type="text"
                  value={number}
                  placeholder="Número"
                  onChange={handleAddressNumber}
                  maxLength={7}
                  required
                  className={styles.address_number}
                />
                <Input
                  type="text"
                  name="complement"
                  maxLength={30}
                  placeholder="Complemento"
                  value={complement}
                  onChange={setComplement}
                  required={false}
                  className={styles.complement}
                />
              </div>
              <Input
                type="text"
                name="district"
                placeholder="Bairro"
                maxLength={60}
                value={district}
                onChange={setDistrict}
              />
              <select
                name="state"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className={styles.state}
              >
                <option value="">Estado</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
              </select>
              <Input
                type="text"
                name="city"
                placeholder="Cidade"
                maxLength={100}
                value={city}
                onChange={setCity}
              />
              <Input
                type="text"
                name="reference-point"
                maxLength={30}
                placeholder="Ponto de referência (opcional)"
                value={referencePoint}
                onChange={setReferencePoint}
                required={false}
                className={styles.reference_point}
              />

              <SubmitButton text="Salvar informações" />
            </form>
            <p className={styles.cancel} onClick={() => openEditAddress()}>
              cancelar
            </p>
          </div>
        </div>
      </div>
    </MyAccount>
  );
};

export default Address;
