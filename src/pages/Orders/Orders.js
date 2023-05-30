//css
import styles from "./Orders.module.css";

//compenents
import MyAccount from "../../components/layout/MyAccount";

//hooks
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//react-router-dom
import { Link } from "react-router-dom";

const Orders = () => {
  const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);

  const [userRequest, setUserRequest] = useState([]);

  //function to add css according to order status
  function selectAppropriateStyle(orderStatus) {
    switch (orderStatus) {
      case "pedido realizado":
        return "dispatched";
      case "entregue":
        return "delivered";
      case "cancelado":
        return "canceled";
      default:
        return "awaiting_payment";
    }
  }

  //filter user orders and add order status
  useEffect(() => {
    if (currentUser.id) {
      fetch(`http://localhost:3000/requests`)
        .then((resp) => resp.json())
        .then((data) => {
          const filteredUserRequest = data.filter(
            (request) => request.user_id === currentUser.id
          );

          const statusBasedStyleName = filteredUserRequest.map((order) => {
            return {
              ...order,
              style: selectAppropriateStyle(order.request_status),
            };
          });

          setUserRequest(statusBasedStyleName);
        })
        .catch((err) => console.log(err));
    }
  }, [currentUser.id]);

  return (
    <MyAccount>
      {userRequest && (
        <div className={styles.user_orders}>
          <h1>Pedidos</h1>
          {userRequest.map((order) => (
            <Link
              key={order.tracking_number}
              to={`/my-account/orders/order-details/${order.tracking_number}`}
            >
              <div className={styles.orders}>
                <div className={styles.order_list}>
                  <h2>Pedido {order.tracking_number}</h2>
                  <div className={styles.list}>
                    <ul>
                      {order.order_items.map((img, index) => (
                        <div key={index}>
                          <li>
                            <img
                              src={img.img[0]}
                              alt={`imagem de ${order.product_name}}`}
                            />
                          </li>
                        </div>
                      ))}
                    </ul>
                    <div className={styles.order_details}>
                      <div>
                        <span>Status</span>
                        <div className={styles[order.style]}>
                          <p>{order.request_status}</p>
                        </div>
                      </div>
                      <div>
                        <span>Data do pedido</span>
                        <h4>{order.request_date}</h4>
                      </div>
                      <div>
                        <p className={styles.total_price}>Total</p>
                        <p className={styles.price}>
                          R${" "}
                          {order.total_amount
                            .toFixed(2)
                            .toString()
                            .replace(".", ",")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </MyAccount>
  );
};

export default Orders;
