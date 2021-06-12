import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Searchbar from "./components/Searchbar/Searchbar";
import CategoriesPage from "./components/CategoriesPage/CategoriesPage";
import ProductSearchPage from "./components/ProductSearchPage/ProductSearchPage";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Container fluid>
        <Router>
          <Searchbar />
          <Switch>
            <Route path="/categories">
              <CategoriesPage />
            </Route>
            <Route path="/products">
              <ProductSearchPage />
            </Route>
          </Switch>
        </Router>
      </Container>
    </React.Fragment>
  );
}

export default App;
