export const sumOfDiscount = (promotion, price) => {
  return (price - (price * promotion) / 100).toFixed(2);
};

//carousel
export const leftClick = (ref) => {
  ref.current.scrollLeft -= ref.current.offsetWidth;
};

export const rightClick = (ref) => {
  ref.current.scrollLeft += ref.current.offsetWidth;
};

//check if birth date is a valid date
export const isDateValid = (dateString) => {
  if (typeof dateString !== "string") {
    return false;
  }

  if (dateString.length !== 10) {
    return false;
  }

  const day = parseInt(dateString.substr(0, 2));
  const month = parseInt(dateString.substr(3, 2));
  const year = parseInt(dateString.substr(6, 4));

  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() + 1 !== month ||
    date.getDate() !== day
  ) {
    return false;
  }

  return true;
};
