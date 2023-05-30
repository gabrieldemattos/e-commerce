//components
import DefaultLayout from "./components/layout/DefaultLayout";
import HeaderFooterLayout from "./components/layout/HeaderFooterLayout";

//react router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//redux
import { useSelector } from "react-redux";

//pages
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import NotFound from "./pages/NotFound/NotFound";
import Search from "./pages/Search/Search";
import Cart from "./pages/Cart/Cart";
import ChangeEmail from "./pages/ChangeEmail/ChangeEmail";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import PersonalInfo from "./pages/PersonalInfo/PersonalInfo";
import Orders from "./pages/Orders/Orders";
import Exchanges from "./pages/Exchanges/Exchanges";
import Address from "./pages/Address/Address";
import Summary from "./pages/Summary/Summary";
import Details from "./pages/Details/Details";
import Categories from "./pages/Categories/Categories";
import Offers from "./pages/Offers/Offers";

function App() {
  const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);

  const { productsCart } = useSelector(
    (rootReducer) => rootReducer.cartReducer
  );
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <DefaultLayout>
                <Home />
              </DefaultLayout>
            }
          />
          <Route
            path="/login"
            element={
              !currentUser ? (
                <HeaderFooterLayout>
                  <Login />
                </HeaderFooterLayout>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/register"
            element={
              !currentUser ? (
                <HeaderFooterLayout>
                  <Register />
                </HeaderFooterLayout>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/product/:id"
            element={
              <DefaultLayout>
                <Product />
              </DefaultLayout>
            }
          />
          <Route
            path="/category/:category"
            element={
              <DefaultLayout>
                <Categories />
              </DefaultLayout>
            }
          />
          <Route
            exact
            path="/offers"
            element={
              <DefaultLayout>
                <Offers />
              </DefaultLayout>
            }
          />
          <Route
            path="*"
            element={
              <DefaultLayout>
                <NotFound />
              </DefaultLayout>
            }
          />
          <Route
            path="/search"
            element={
              <DefaultLayout>
                <Search />
              </DefaultLayout>
            }
          />
          <Route
            path="/cart"
            element={
              <DefaultLayout>
                <Cart />
              </DefaultLayout>
            }
          />
          <Route
            path="/my-account"
            element={
              currentUser ? (
                <HeaderFooterLayout>
                  <Orders />
                </HeaderFooterLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/my-account/orders"
            element={
              currentUser ? (
                <HeaderFooterLayout>
                  <Orders />
                </HeaderFooterLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/my-account/exchanges"
            element={
              currentUser ? (
                <HeaderFooterLayout>
                  <Exchanges />
                </HeaderFooterLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/my-account/personal-info"
            element={
              currentUser ? (
                <HeaderFooterLayout>
                  <PersonalInfo />
                </HeaderFooterLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/my-account/change-email"
            element={
              currentUser ? (
                <HeaderFooterLayout>
                  <ChangeEmail />
                </HeaderFooterLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/my-account/change-password"
            element={
              currentUser ? (
                <HeaderFooterLayout>
                  <ChangePassword />
                </HeaderFooterLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/my-account/address"
            element={
              currentUser ? (
                <HeaderFooterLayout>
                  <Address />
                </HeaderFooterLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/summary"
            element={
              currentUser && productsCart.length > 0 ? (
                <Summary />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/my-account/orders/order-details/:tracking_number"
            element={
              currentUser ? (
                <HeaderFooterLayout>
                  <Details />
                </HeaderFooterLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
