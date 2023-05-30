import { useState, useMemo } from "react";

export const useDiscountAndInstallments = () => {
  const [promotion, setPromotion] = useState(0);
  const [price, setPrice] = useState(0);
  const [portion, setPortion] = useState(0);

  const discountedPrice = useMemo(() => {
    return (price - (price * promotion) / 100).toFixed(2);
  }, [promotion, price]);

  const installments = useMemo(() => {
    return (discountedPrice / portion).toFixed(2);
  }, [discountedPrice, portion]);

  const updatePromotion = (newPromotion) => {
    setPromotion(newPromotion);
  };

  const updatePrice = (newPrice) => {
    setPrice(newPrice);
  };

  const updatePortion = (newPortion) => {
    setPortion(newPortion);
  };

  return {
    promotion,
    price,
    portion,
    discountedPrice,
    installments,
    updatePromotion,
    updatePrice,
    updatePortion,
  };
};
