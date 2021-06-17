import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Button, Carousel } from "react-bootstrap";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useParams } from "react-router-dom";
import placeholderImage from "../../images/placeholder.png";
import styles from "./ProductPage.module.css";
import { getProductByUuid } from "../../api/product";
import { addToCart, removeFromCart, isProductInCart } from "../../utility/cart";
import AuthContext from "../../context/AuthContext";
import CartContext from "../../context/CartContext";

const ProductPage = (props) => {
  const [authData] = useContext(AuthContext);
  const [cartItemsNum, setCartItemsNum] = useContext(CartContext);

  const { uuid } = useParams();
  const [product, setProduct] = useState({});
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProductByUuid(uuid);
      if (response.status === 200) {
        if (authData.authenticated) {
          setProduct({
            ...response.data,
            inCart: isProductInCart(response.data),
          });
        } else {
          setProduct(response.data);
        }
      } else {
        setErrored(true);
      }
    };

    fetchData();
  }, [uuid, authData.authenticated]);

  const onAddCartClick = () => {
    if (authData.authenticated) {
      addToCart(product);
      setCartItemsNum(cartItemsNum + 1);
      setProduct({ ...product, inCart: true });
    }
  };

  const onRemoveCartClick = () => {
    if (authData.authenticated) {
      removeFromCart(product);
      setCartItemsNum(cartItemsNum - 1);
      setProduct({ ...product, inCart: false });
    }
  };

  if (errored) {
    return <h1> Something went wrong! </h1>;
  }

  return (
    <Row className="p-5">
      <Col xs={6} md={4}>
        <h4> {product.name} </h4>
        <img src={placeholderImage} alt="Product" />
      </Col>
      <Col xs={6} md={8}>
        <h5> Price: {product.price} </h5>
        <h5> Description: </h5>
        <p>{product.description}</p>
        <h5> Tags: </h5>
        <p> {product.tags && product.tags.map((tag) => tag.name).join(",")} </p>
        {product.inCart ? (
          <Button variant="danger" size="lg" onClick={onRemoveCartClick}>
            REMOVE FROM CART <ShoppingCartIcon />
          </Button>
        ) : (
          <Button variant="primary" size="lg" onClick={onAddCartClick}>
            ADD TO CART <ShoppingCartIcon />
          </Button>
        )}
      </Col>
      <Col xs={12} className="d-flex justify-content-center">
        <Carousel
          style={{ width: "600px" }}
          className={styles["carousel--custom"]}
        >
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={placeholderImage}
              alt="gallery"
              style={{ height: "400px" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={placeholderImage}
              alt="gallery"
              style={{ height: "400px" }}
            />
          </Carousel.Item>
        </Carousel>
      </Col>
    </Row>
  );
};

export default ProductPage;
