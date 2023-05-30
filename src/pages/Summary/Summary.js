//hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//css
import styles from "./Summary.module.css";

//icons
import { AiOutlineMail, AiOutlineBarcode } from "react-icons/ai";
import { BsTelephone, BsCreditCard2Back } from "react-icons/bs";
import { GrMapLocation } from "react-icons/gr";
import { RiPencilFill, RiWallet3Line } from "react-icons/ri";
import { FiTruck } from "react-icons/fi";
import { SiPixiv } from "react-icons/si";

//reacter-router-dom
import { Link } from "react-router-dom";

//context
import { useFetch } from "../../hooks/useFetch";

//components
import Footer from "../../components/layout/Footer";
import Container from "../../components/layout/Container";
import InputRadio from "../../components/form/InputRadio";

//redux
import { resetCart } from "../../redux/cart/actions";
import { selectTotalPriceDiscounted } from "../../redux/cart/cart.selectors";

const Summary = () => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);

  const { productsCart } = useSelector(
    (rootReducer) => rootReducer.cartReducer
  );

  const totalPriceDiscounted = useSelector(selectTotalPriceDiscounted);

  const url = "http://localhost:3000/requests";
  const [order, setOrder] = useState(null);
  const [alertForUser, setAlertForUser] = useState("");
  useFetch(url, "POST", order, alertForUser);

  const [user, setUser] = useState({});

  const [freight, setFreight] = useState("normal");
  const [payment, setPayment] = useState("credit");

  //sending the order
  const handleOrder = () => {
    if (productsCart.length > 0) {
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();

      const formattedDate = `${day < 10 ? "0" : ""}${day}-${
        month < 10 ? "0" : ""
      }${month}-${year}`;

      const updatedProducts = productsCart.map((product) => {
        return { ...product, amount: product.qtd * product.discount_price };
      });

      const shippingCost = freight === "express" ? 1 : 0;

      const userAddress = {
        ...user.address,
        telephone: user.telephone,
        name: user.name,
      };

      const order = {
        user_id: currentUser.id,
        order_items: updatedProducts,
        total_amount: Number(totalPriceDiscounted) + shippingCost,
        request_date: formattedDate,
        request_status: "aguardando pagamento",
        payment_method: payment,
        cost_freight: freight === "express" ? 1 : 0,
        tracking_number: Math.floor(Math.random() * 999999999),
        delivery_address: userAddress,
      };

      if (!user.address && freight !== "pick-up-in-store") {
        alert("Adicione um endereço para entrega.");
      } else {
        const orderPromise = setOrder(order);
        const alertPromise = setAlertForUser(
          "Parabéns! Seu pedido foi concluído com sucesso. Agradecemos por escolher nossa loja e esperamos que você aproveite seus produtos!"
        );
        Promise.all([orderPromise, alertPromise]).then(() => {
          dispatch(resetCart());
        });
      }
    } else {
      console.log("error");
    }
  };

  //retrieve user address data
  useEffect(() => {
    if (currentUser.id) {
      fetch(`http://localhost:3000/users/${currentUser.id}`)
        .then((resp) => resp.json())
        .then((data) => {
          setUser(data);
        })
        .catch((err) => console.log(err));
    }
  }, [currentUser.id]);

  return (
    <>
      <div className={styles.header}>
        <Link to="/">
          <div className={styles.logo}>
            <h1>E-commerce</h1>
          </div>
        </Link>
        <div className={styles.contacts_details}>
          <div className={styles.contacts}>
            <i>
              <AiOutlineMail />
            </i>
            <p>contato@email.com</p>
          </div>
          <div className={styles.contacts}>
            <i>
              <BsTelephone />
            </i>
            <p>(00) 1234-5678</p>
          </div>
        </div>
      </div>
      <Container>
        <div className={styles.container}>
          <div className={styles.order_details}>
            <div
              className={`${styles.details} ${styles.wrapper} ${styles.details_container}`}
            >
              <div className={styles.title}>
                <div className={styles.title_icon}>
                  <i>
                    <GrMapLocation />
                  </i>
                  <span>Endereço de entrega</span>
                </div>
              </div>
              {user.address && (
                <>
                  <h3>{user.name}</h3>
                  <div className={styles.user_address}>
                    <p className={styles.street}>
                      {user.address.street}, {user.address.number}
                    </p>
                    <p>{user.address.district}</p>
                    <p>
                      {user.address.zipcode} - {user.address.city} -{" "}
                      {user.address.state}
                    </p>
                  </div>
                </>
              )}
              <div className={styles.change_address}>
                <button>
                  <i>
                    <RiPencilFill />
                  </i>
                  <Link to="/my-account/address">
                    <p className={styles.change_title}>
                      {user.address
                        ? "alterar endereço da entrega"
                        : "adicione um endereço para continuar"}
                    </p>
                  </Link>
                </button>
              </div>
              <div className={styles.freight}>
                <div className={styles.freight_title}>
                  <i>
                    <FiTruck />
                  </i>
                  <span>Entregue por E-Commerce - R$ 0,00</span>
                </div>
              </div>
              <div className={styles.freight_options}>
                <form>
                  <div>
                    <InputRadio
                      name="normal"
                      id="normal"
                      value="normal"
                      chosenValue={freight}
                      onChange={setFreight}
                      text="Entrega Normal"
                    />
                    <h3>R$ 0,00</h3>
                  </div>
                  <div>
                    <InputRadio
                      name="express"
                      id="express"
                      value="express"
                      chosenValue={freight}
                      onChange={setFreight}
                      text="Entrega Expressa"
                    />
                    <h3>R$ 1,00</h3>
                  </div>
                  <div>
                    <InputRadio
                      name="pick-up-in-store"
                      id="pick-up-in-store"
                      value="pick-up-in-store"
                      chosenValue={freight}
                      onChange={setFreight}
                      text="Retirar no Local"
                    />
                    <p>
                      *Verificar horário de funcionamento do estabelecimento
                    </p>
                  </div>
                </form>
              </div>
              <div className={styles.order_list}>
                {productsCart &&
                  productsCart.map((product, index) => (
                    <div className={styles.order} key={index}>
                      <div className={styles.order_img}>
                        <img
                          src={product.img[0]}
                          alt={product.name}
                          draggable={false}
                        />
                      </div>
                      <div className={styles.item_information}>
                        <div className={styles.item_details}>
                          <div className={styles.item_name_size}>
                            <div className={styles.name}>
                              <h3>
                                {product.name} - {product.selected_color}
                              </h3>
                            </div>
                            <div className={styles.size}>
                              <p>
                                Tam:{" "}
                                {product.size === undefined
                                  ? "único"
                                  : product.size}
                              </p>
                            </div>
                          </div>
                          <div className={styles.item_price}>
                            {product.promotion > 0 ? (
                              <>
                                <p className={styles.old_price}>
                                  R${" "}
                                  {Number(product.price * product.qtd)
                                    .toFixed(2)
                                    .toString()
                                    .replace(".", ",")}
                                </p>
                                <p className={styles.new_price}>
                                  R${" "}
                                  {Number(product.discount_price * product.qtd)
                                    .toFixed(2)
                                    .toString()
                                    .replace(".", ",")}
                                </p>
                              </>
                            ) : (
                              <p>
                                R${" "}
                                {Number(product.discount_price * product.qtd)
                                  .toFixed(2)
                                  .toString()
                                  .replace(".", ",")}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className={styles.item_quantity}>
                          <p>Qtd: {product.qtd}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className={`${styles.payment} ${styles.wrapper}`}>
              <div className={styles.title}>
                <div className={styles.title_icon}>
                  <i>
                    <RiWallet3Line />
                  </i>
                  <span>Pagamento</span>
                </div>
              </div>
              <div className={styles.payment_options}>
                <div>
                  <div className={styles.options}>
                    <InputRadio
                      name="credit-card"
                      id="credit"
                      value="credit"
                      chosenValue={payment}
                      onChange={setPayment}
                      text={
                        <div className={styles.label_payment_option}>
                          <i>
                            <BsCreditCard2Back />
                          </i>
                          <span>Cartão de crédito</span>
                        </div>
                      }
                    />
                    <div className={styles.pix}>
                      <InputRadio
                        name="pix"
                        id="pix"
                        value="pix"
                        chosenValue={payment}
                        onChange={setPayment}
                        text={
                          <div className={styles.label_payment_option}>
                            <i>
                              <SiPixiv />
                            </i>
                            <span>Pix</span>
                          </div>
                        }
                      />
                      <div>
                        <p>Entrega mais rápida!</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className={styles.options}>
                    <InputRadio
                      name="payment-slip"
                      id="payment-slip"
                      value="payment-slip"
                      chosenValue={payment}
                      onChange={setPayment}
                      text={
                        <div className={styles.label_payment_option}>
                          <i>
                            <AiOutlineBarcode />
                          </i>
                          <span>Boleto</span>
                        </div>
                      }
                    />
                  </div>
                </div>
              </div>
              <div className={styles.payment_information}>
                {payment === "credit" && (
                  <>
                    <div>
                      <div></div>
                      <input type="text" placeholder="Número do cartão" />
                    </div>
                    <input type="text" placeholder="Nome do titular" />
                    <div>
                      <input
                        type="text"
                        placeholder="Validade (mm/aa ou mm/aaaa)"
                      />
                      <input type="text" placeholder="CVV" />
                    </div>
                  </>
                )}
                {payment === "pix" && (
                  <>
                    <div className={styles.option_pix}>
                      <h3>Pontos importantes</h3>
                      <p>
                        Pix é uma forma de pagamento ágil e facilitado, para
                        quem deseja comprar a vista. O seu pedido é aprovado na
                        hora, além de acelerar a liberação
                      </p>
                      <p>
                        No Pix, seu pedido é aprovado instantaneamente e CHEGA
                        ANTES!
                      </p>
                      <p>
                        - Você precisa ter cadastrado uma chave Pix na sua
                        instituição financeira favorita.
                      </p>
                      <p>
                        - Com o seu celular você poderá escanear o QR-code ou
                        copiar o código de pagamento.
                      </p>
                      <p>
                        - O pagamento é processado e debitado do valor
                        disponível na sua conta-corrente.
                      </p>
                      <p>
                        - Se o pagamento não for efetuado até a data do
                        vencimento, o pedido será cancelado.
                      </p>
                    </div>
                  </>
                )}
                {payment === "payment-slip" && (
                  <>
                    <div className={styles.payment_slip}>
                      <h3>Pontos importante</h3>
                      <p>
                        - Você pode pagar seu boleto via internet banking,
                        agências bancárias ou lotéricas.
                      </p>
                      <p>
                        - Vamos preparar o seu pedido assim que o pagamento for
                        confirmado pelo banco.
                      </p>
                      <p>
                        - Se o boleto não for pago até a data do vencimento o
                        pedido será cancelado.
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className={styles.total}>
                <span>Total</span>
                <span>
                  R${" "}
                  {freight === "express"
                    ? (Number(totalPriceDiscounted) + 1)
                        .toFixed(2)
                        .toString()
                        .replace(".", ",")
                    : Number(totalPriceDiscounted)
                        .toFixed(2)
                        .toString()
                        .replace(".", ",")}
                </span>
              </div>
              <button onClick={() => handleOrder()}>Finalizar pedido</button>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Summary;
