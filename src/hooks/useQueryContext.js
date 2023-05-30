import { useContext } from "react";
import { QueryContext } from "../context/QueryContext";

export const useQueryContext = () => {
  const context = useContext(QueryContext);

  if (!context) {
    console.log("Contexto não encontrado");
  }

  return context;
};
