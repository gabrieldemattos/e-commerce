//hooks
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

//redux
import { loginUser } from "../redux/user/actions";

export const useAuthentication = (email, password) => {
  const dispatch = useDispatch();

  const [isLogged, setIsLogged] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError(false);
    if (email && password) {
      setLoading(true);

      fetch("http://localhost:3000/users")
        .then((resp) => resp.json())
        .then((data) => {
          const filteredUserEmail = data.filter((user) => user.email === email);
          const filteredUserNameAndPassword = filteredUserEmail.filter(
            (userPassword) => userPassword.password === password
          );

          if (filteredUserNameAndPassword.length === 1) {
            const user = filteredUserNameAndPassword[0];

            dispatch(loginUser(user));
            setIsLogged(true);
            setError(false);
            return setLoading(false);
          } else {
            setError(true);
            setLoading(false);
            return setIsLogged(false);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [email, password, dispatch]);

  return {
    isLogged,
    error,
    loading,
  };
};
