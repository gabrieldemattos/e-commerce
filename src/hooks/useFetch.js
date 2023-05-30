import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

//redux
import { updateUser } from "../redux/user/actions";

export const useFetch = (url, method, userData, alertPost, alertPatch) => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (method === "GET") {
      setLoading(true);

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(`${url}`, options)
        .then((resp) => resp.json())
        .then((data) => {
          setData(data);
          setLoading(false);
          setError(null);
        })
        .catch((err) => {
          setLoading(false);
          setError("Ocorreu um erro ao carregar os dados, tente novamente.");
        });
    }

    if (method === "POST") {
      if (userData !== null) {
        const options = {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(userData),
        };

        fetch(`${url}`, options)
          .then(() => {
            if (alertPost) {
              alert(alertPost);
            } else {
              alert("Dados enviados com sucesso!");
            }
          })
          .catch(() => alert("Algo deu errado!"));
      }
    }

    if (method === "PATCH") {
      if (userData !== null) {
        const options = {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(userData),
        };

        fetch(`${url}`, options)
          .then(() => {
            if (alertPatch) {
              alert(alertPatch);
            } else {
              alert("Seus dados foram atualizados!");
            }

            dispatch(updateUser(userData));
          })
          .catch(() => alert("Algo deu errado, tente novamente!"));
      }
    }

    return;
  }, [url, method, userData, alertPost, alertPatch, dispatch]);

  return {
    data,
    loading,
    error,
  };
};
