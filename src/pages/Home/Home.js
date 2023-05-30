//components
import ProductCarousel from "../../components/ProductCarousel";
import Banner from "../../components/layout/Banner";
import Discoveries from "../../components/Discoveries";
import Container from "../../components/layout/Container";

const Home = () => {
  return (
    <div>
      <Banner />
      <Container>
        <Discoveries section={"Descobertas do dia"} border={"lightcoral"} />
        <ProductCarousel
          category={"móveis"}
          border={"#c70606"}
          section={"móveis"}
          widthProduct={"30rem"}
        />
        <ProductCarousel
          category={"eletrônicos"}
          border={"#0303ffc5"}
          section={"eletrônicos"}
          widthProduct={"30rem"}
        />
        <ProductCarousel
          category={"games"}
          border={"#000000c9"}
          section={"games"}
          widthProduct={"30rem"}
        />
      </Container>
    </div>
  );
};

export default Home;
