import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Searchbar from "./components/Searchbar/Searchbar";
import CategoriesPage from "./components/CategoriesPage/CategoriesPage";
import ProductSearchPage from "./components/ProductSearchPage/ProductSearchPage";
import ProductPage from "./components/ProductPage/ProductPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import CartPage from "./components/CartPage/CartPage";
import OrdersPage from "./components/OrdersPage/OrdersPage";
import AdminHome from "./components/AdminHome/AdminHome";
import AdminUserPage from "./components/AdminUserPage/AdminUserPage";
import AdminCreateAccount from "./components/AdminCreateAccount/AdminCreateAccount";
import AdminTags from "./components/AdminTags/AdminTags";
import AdminTagForm from "./components/AdminTagForm/AdminTagForm";
import AdminSubcategory from "./components/AdminSubcategory/AdminSubcategory";
import AdminSubcategoryForm from "./components/AdminSubcategoryForm/AdminSubcategoryForm";
import AdminCategory from "./components/AdminCategory/AdminCategory";
import AdminCategoryForm from "./components/AdminCategoryForm/AdminCategoryForm";
import AdminProduct from "./components/AdminProduct/AdminProduct";
import AdminProductForm from "./components/AdminProductForm/AdminProductForm";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import AuthContext from "./context/AuthContext";
import CartContext from "./context/CartContext";
import { syncAuthContext } from "./utility/authHandler";
import { getTotalProductsInCart } from "./utility/cart";

function App() {
  const authHook = useState({ authenticated: false, data: null });
  const cartHook = useState(0);
  const [initDone, setInitDone] = useState(false);

  /*
    First time app init
    Update AuthContext in case a logged in user opens app
    where AuthContext is empty. This is not dependent on
    AuthContext's state, it only fires once when app starts.
  */
  useEffect(() => {
    const doSync = async () => {
      const [, setAuthData] = authHook;
      await syncAuthContext(setAuthData);
      const [, setCart] = cartHook;
      setCart(getTotalProductsInCart());
      setInitDone(true);
    };

    doSync();
    // eslint-disable-next-line
  }, []);

  if (!initDone) {
    return <p> Loading ... </p>;
  }

  if (authHook[0].authenticated) {
    const roles = authHook[0].data.roles.split(",");
    if (roles.includes("admin")) {
      return (
        <AuthContext.Provider value={authHook}>
          <Router>
            <Navbar />
            <Container fluid>
              <Switch>
                <AdminRoute exact path="/">
                  <AdminHome />
                </AdminRoute>
                <AdminRoute path="/users">
                  <AdminUserPage />
                </AdminRoute>
                <AdminRoute path="/newaccount">
                  <AdminCreateAccount />
                </AdminRoute>
                <AdminRoute path="/tags">
                  <AdminTags />
                </AdminRoute>
                <AdminRoute path="/tag/:id">
                  <AdminTagForm />
                </AdminRoute>
                <AdminRoute path="/tag">
                  <AdminTagForm />
                </AdminRoute>
                <AdminRoute path="/subcategories">
                  <AdminSubcategory />
                </AdminRoute>
                <AdminRoute path="/subcategory/:id">
                  <AdminSubcategoryForm />
                </AdminRoute>
                <AdminRoute path="/subcategory">
                  <AdminSubcategoryForm />
                </AdminRoute>
                <AdminRoute path="/categories">
                  <AdminCategory />
                </AdminRoute>
                <AdminRoute path="/category/:id">
                  <AdminCategoryForm />
                </AdminRoute>
                <AdminRoute path="/category">
                  <AdminCategoryForm />
                </AdminRoute>
                <AdminRoute path="/products">
                  <AdminProduct />
                </AdminRoute>
                <AdminRoute path="/product/:uuid">
                  <AdminProductForm />
                </AdminRoute>
                <AdminRoute path="/product">
                  <AdminProductForm />
                </AdminRoute>
              </Switch>
            </Container>
          </Router>
        </AuthContext.Provider>
      );
    }
  }

  return (
    <CartContext.Provider value={cartHook}>
      <AuthContext.Provider value={authHook}>
        <Router>
          <Navbar />
          <Container fluid>
            <Searchbar />
            <Switch>
              <Route path="/categories">
                <CategoriesPage />
              </Route>
              <Route exact path="/">
                <ProductSearchPage />
              </Route>
              <Route path="/product/:uuid">
                <ProductPage />
              </Route>
              <Route path="/register">
                <RegisterPage />
              </Route>
              <ProtectedRoute path="/cart">
                <CartPage />
              </ProtectedRoute>
              <ProtectedRoute path="/orders">
                <OrdersPage />
              </ProtectedRoute>
            </Switch>
          </Container>
        </Router>
      </AuthContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
