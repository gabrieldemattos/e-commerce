//react hooks
import { useEffect, useState } from "react";

//css
import styles from "./Details.module.css";

//react-router-dom
import { Link, useParams } from "react-router-dom";

//custom hooks
import { useFetch } from "../../hooks/useFetch";

//icons
import { FcApproval } from "react-icons/fc";

//components
import MyAccount from "../../components/layout/MyAccount";
import Loading from "../../components/layout/Loading";

const Details = () => {
  const { tracking_number } = useParams();

  const url = `http://localhost:3000/requests?tracking_number=${tracking_number}`;
  const { data: order, loading, error } = useFetch(url, "GET");

  const [status, setStatus] = useState("");

  //function to add css according to order status
  function selectAppropriateStyle(orderStatus) {
    switch (orderStatus) {
      case "pedido realizado":
        return setStatus("dispatched");
      case "entregue":
        return setStatus("delivered");
      case "cancelado":
        return setStatus("canceled");
      default:
        return setStatus("awaiting_payment");
    }
  }

  useEffect(() => {
    if (order) {
      selectAppropriateStyle(order[0]?.request_status);
    }
  }, [order]);

  return (
    <div>
      <MyAccount>
        {order && !loading && !error && (
          <div className={styles.container}>
            <h2>Detalhe do pedido</h2>
            {order.map((data) => (
              <div className={styles.order} key={data.user_id}>
                <div className={styles.order_details}>
                  <h2>Pedido {data.tracking_number}</h2>
                  <div className={styles.status_date}>
                    <div>
                      <span>Status</span>
                      <div className={`${styles[status]}`}>
                        <p>{data.request_status}</p>
                      </div>
                    </div>
                    <div>
                      <span>Data do pedido</span>
                      <h4>{data.request_date.replace(/-/g, "/")}</h4>
                    </div>
                  </div>
                  <div className={styles.address_delivery}>
                    <h2>Endereço de entrega</h2>
                  </div>
                  <div className={styles.address}>
                    <h3>{data.delivery_address.name}</h3>
                    <p>
                      {data.delivery_address.street},{" "}
                      {data.delivery_address.number}
                    </p>
                    <p>{data.delivery_address.district}</p>
                    <p>
                      {data.delivery_address.zipcode} -{" "}
                      {data.delivery_address.city} -{" "}
                      {data.delivery_address.state}
                    </p>
                  </div>
                </div>
                <div className={styles.order_payment}>
                  <h2>Informações do pedido</h2>
                  <div className={styles.status}>
                    <div>
                      <i>
                        <FcApproval />
                      </i>
                      <span>{data.request_status}</span>
                    </div>
                    <div>
                      <span>{data.request_date}</span>
                    </div>
                  </div>
                  <h2>Dados do pagamento</h2>
                  <div className={styles.payment}>
                    <span className={styles.payment_method}>
                      {(data.payment_method === "credit" &&
                        "cartão de crédito") ||
                        (data.payment_method === "pix" && "pix") ||
                        (data.payment_method === "payment-slip" &&
                          "boleto bancário")}
                    </span>
                  </div>
                  <div className={styles.payment}>
                    <span>Produtos</span>
                    <span>
                      R${" "}
                      {data.cost_freight === 1
                        ? Number(data.total_amount - 1)
                            .toFixed(2)
                            .toString()
                            .replace(".", ",")
                        : data.total_amount
                            .toFixed(2)
                            .toString()
                            .replace(".", ",")}
                    </span>
                  </div>
                  <div className={styles.payment}>
                    <span>Valor da entrega</span>
                    <span>
                      R${" "}
                      {data.cost_freight
                        .toFixed(2)
                        .toString()
                        .replace(".", ",")}
                    </span>
                  </div>
                  <div className={`${styles.payment} ${styles.total}`}>
                    <span>Total</span>
                    <span>
                      R${" "}
                      {data.total_amount
                        .toFixed(2)
                        .toString()
                        .replace(".", ",")}
                    </span>
                  </div>
                </div>
                <div className={styles.button}>
                  <Link to="/">
                    <button>voltar às compras</button>
                  </Link>
                </div>
              </div>
            ))}
            <h2 className={styles.title}>Vendido e entregue por E-Commerce</h2>
            <div className={styles.order_list}>
              {order.map((orders) =>
                orders.order_items.map((product, index) => (
                  <div className={styles.product_order} key={index}>
                    <div className={styles.order_img}>
                      <img src={product.img[0]} alt={product.name} />
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
                          <p>
                            R${" "}
                            {Number(product.discount_price * product.qtd)
                              .toFixed(2)
                              .toString()
                              .replace(".", ",")}
                          </p>
                        </div>
                      </div>
                      <div className={styles.item_quantity}>
                        <p>Qtd: {product.qtd}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        {loading && (
          <div className="loader">
            <Loading />
          </div>
        )}
        {error && !loading && <div className="request-error">{error}</div>}
      </MyAccount>
    </div>
  );
};

export default Details;
