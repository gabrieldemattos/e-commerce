const StarReviews = ({ color = "#ccc" }) => {
  return (
    <>
      <svg height="22" viewBox="0 0 50 50" width="22">
        <polygon
          fill={color}
          points="25,3.553 30.695,18.321 46.5,19.173   34.214,29.152 38.287,44.447 25,35.848 11.712,44.447 15.786,29.152 3.5,19.173 19.305,18.321 "
        ></polygon>
      </svg>
    </>
  );
};

export default StarReviews;
