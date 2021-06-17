import React, { useState, useContext } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  getCachedCart,
  updateProductCount,
  removeFromCart,
} from "../../utility/cart";
import placeholderImage from "../../images/placeholder.png";
import styles from "./CartPage.module.css";
import { createOrder } from "../../api/order";
import CartContext from "../../context/CartContext";

const CartPage = () => {
  const [cartItemsNum, setCartItemsNum] = useContext(CartContext);

  const [cart, setCart] = useState(getCachedCart());
  const [orderSuccess, setOrderSuccess] = useState(0);
  const [error, setError] = useState("Something went wrong");

  const onAddRemoveButtonClick = (product, count) => {
    if (count < 1) {
      return;
    }

    for (let i = 0; i < cart.length; i++) {
      if (product.uuid === cart[i].uuid) {
        setCartItemsNum(cartItemsNum + count - cart[i].quantity);
        cart[i].quantity = count;
        updateProductCount(product, count);
        setCart([...cart]);
        return;
      }
    }
  };

  const onProductQuantityChange = (product, count) => {
    if (count < 1) {
      return;
    }

    for (let i = 0; i < cart.length; i++) {
      if (product.uuid === cart[i].uuid) {
        setCartItemsNum(cartItemsNum + count - cart[i].quantity);
        cart[i].quantity = count;
        updateProductCount(product, count);
        setCart([...cart]);
        return;
      }
    }
  };

  const onRemoveProductClick = (product) => {
    removeFromCart(product);
    setCartItemsNum(cartItemsNum - product.quantity);
    setCart(cart.filter((item) => item.uuid !== product.uuid));
  };

  const confirmOrder = () => {
    if (!cart || cart.length === 0) {
      setError("Cart Empty!");
      setOrderSuccess(1);
      return;
    }

    const requestOrder = async () => {
      const response = await createOrder(cart);
      if (response.status === 200) {
        setOrderSuccess(2);
        localStorage.removeItem("cart");
        setCartItemsNum(0);
      } else {
        setError("Something went wrong");
        setOrderSuccess(1);
      }
    };

    requestOrder();
  };

  let totalPrice = 0;
  let totalItems = 0;
  if (cart) {
    for (let i = 0; i < cart.length; i++) {
      totalPrice += parseInt(cart[i].quantity) * cart[i].price;
      totalItems += parseInt(cart[i].quantity);
    }
  }

  const errorParagraph =
    orderSuccess === 1 ? <p className={styles.errorText}> {error} </p> : null;

  // Order complete
  if (orderSuccess === 2) {
    return (
      <div
        className={`d-flex justify-content-center align-items-center ${styles.successDiv}`}
      >
        <div>
          <h1> Order Succesful </h1>
          <div className="text-center">
            <Link to="/">
              <Button variant="primary"> Go Back </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <h1> Cart Details </h1>
      <div className="d-flex flex-column">
        <div>
          <hr />
        </div>
        {cart &&
          cart.map((product, index) => {
            return (
              <React.Fragment key={product.uuid}>
                <div className="d-flex">
                  <div style={{ width: "50%" }}>
                    <img src={placeholderImage} alt="Product" />
                  </div>
                  <div style={{ width: "50%" }}>
                    <p> Name: {product.name} </p>
                    <p> Price: {product.price} </p>
                    <div className="d-flex align-items-center">
                      <span className="mr-5"> Quantity: </span>
                      <InputGroup style={{ width: "200px" }}>
                        <InputGroup.Prepend>
                          <Button
                            variant="outline-secondary"
                            onClick={() => {
                              onAddRemoveButtonClick(
                                product,
                                parseInt(product.quantity) + 1
                              );
                            }}
                          >
                            +
                          </Button>
                        </InputGroup.Prepend>
                        <FormControl
                          value={parseInt(product.quantity)}
                          onChange={(ev) => {
                            onProductQuantityChange(product, ev.target.value);
                          }}
                          type="number"
                          className={styles.arrowshidden}
                          min="1"
                        />
                        <InputGroup.Append>
                          <Button
                            variant="outline-secondary"
                            onClick={() => {
                              onAddRemoveButtonClick(
                                product,
                                parseInt(product.quantity) - 1
                              );
                            }}
                          >
                            -
                          </Button>
                        </InputGroup.Append>
                      </InputGroup>
                    </div>
                    <Button
                      variant="danger"
                      className="mt-3"
                      onClick={() => {
                        onRemoveProductClick(product);
                      }}
                    >
                      Remove Item
                    </Button>
                  </div>
                </div>
                <div>
                  <hr />
                </div>
              </React.Fragment>
            );
          })}
      </div>
      <div className="d-flex mb-3">
        <h3 className="mr-5"> Total Price: {totalPrice} </h3>
        <h3 className="mr-5"> Total Items: {totalItems} </h3>
        <Button button="primary" onClick={confirmOrder}>
          Confirm Order
        </Button>
      </div>
      {errorParagraph}
    </React.Fragment>
  );
};

export default CartPage;
