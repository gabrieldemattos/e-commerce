//components
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default DefaultLayout;
