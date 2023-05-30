import { useState } from "react";

//css
import styles from "./Modal.module.css";

//Mask
import { IMaskInput } from "react-imask";

//redux
import { useDispatch } from "react-redux";
import { addZipCode } from "../../redux/zipcode/actions";

const Modal = () => {
  const dispatch = useDispatch();

  const [zipCode, setZipCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const closeModal = () => {
    const modal = document.querySelector("#modal");
    modal.classList.add("hide");
  };

  const fetchCep = () => {
    const formatedZipCode = zipCode.replace(/[^0-9]/g, "");
    if (formatedZipCode.length === 8) {
      fetch(`https://viacep.com.br/ws/${formatedZipCode}/json/`)
        .then((resp) => resp.json())
        .then((data) => {
          if (data.erro) {
            setErrorMsg("CEP não encontrado.");
            dispatch(addZipCode(""));
          }
          if (!data.erro) {
            setErrorMsg("");
            dispatch(addZipCode(zipCode));
          }
        })
        .catch((err) => console.log(err));
    } else {
      setErrorMsg("Digite um CEP válido de 8 dígitos");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchCep();
  };

  return (
    <div id="modal" className="hide">
      <div className={styles.fade} onClick={closeModal}></div>
      <div className={styles.modal}>
        <h2>Selecione onde quer receber suas compras:</h2>
        <form onSubmit={handleSubmit}>
          {errorMsg && (
            <div className={styles.error}>
              <p>{errorMsg}</p>
            </div>
          )}
          <IMaskInput
            mask="00.000-000"
            placeholder="Digite seu CEP.."
            onChange={(e) => setZipCode(e.target.value)}
          />
          <button>Alterar</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
