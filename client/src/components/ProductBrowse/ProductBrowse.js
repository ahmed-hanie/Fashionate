import React, { useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import styles from "./ProductBrowse.module.css";
import placeholderImage from "../../images/placeholder.png";

const GRID_SIZE = 3;

const ProductBrowse = (props) => {
  // Fill empty gaps
  const fill = [];
  let remainder =
    props.products.length % 3 !== 0
      ? (Math.floor(props.products.length / GRID_SIZE) + 1) * GRID_SIZE -
        props.products.length
      : 0;

  for (let i = 0; i < remainder; i++) {
    fill.push(
      <Col
        key={i - 3}
        xs={4}
        className={`${styles.product__container} ${styles["product__container--empty"]}`}
      ></Col>
    );
  }

  const { hasMore, loadMore } = props;

  useEffect(() => {
    window.onscroll = (ev) => {
      if (
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight
      ) {
        if (hasMore) {
          loadMore();
        }
      }
    };
    return () => {
      window.onscroll = null;
    };
  }, [hasMore, loadMore]);

  return props.products.length ? (
    <Row className={styles.container}>
      {props.products &&
        props.products.map((product, productIndex) => {
          return (
            <Col
              xs={4}
              className={styles.product__container}
              key={productIndex}
            >
              <Link
                to={`/product/${product.uuid}`}
                style={{ textDecoration: "inherit", color: "inherit" }}
              >
                <div className={styles.product__link}>
                  <div className="text-center">
                    <img src={placeholderImage} alt="Logo" />
                  </div>
                  <h5> {product.name} </h5>
                  <h4 className={styles.product__price}>{product.price} EGP</h4>
                </div>
              </Link>
              {product.inCart ? (
                <React.Fragment>
                  <div className="text-center d-none d-lg-block">
                    <Button
                      variant="danger"
                      size="lg"
                      onClick={(ev) => {
                        props.onRemoveCartClick(product);
                      }}
                    >
                      REMOVE FROM CART <ShoppingCartIcon />
                    </Button>
                  </div>

                  <div className="text-center d-block d-lg-none">
                    <Button
                      variant="danger"
                      onClick={(ev) => {
                        props.onRemoveCartClick(product);
                      }}
                    >
                      REMOVE FROM CART <ShoppingCartIcon />
                    </Button>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="text-center d-none d-lg-block">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={(ev) => {
                        props.onAddCartClick(product);
                      }}
                    >
                      ADD TO CART <ShoppingCartIcon />
                    </Button>
                  </div>

                  <div className="text-center d-block d-lg-none">
                    <Button
                      variant="primary"
                      onClick={(ev) => {
                        props.onAddCartClick(product);
                      }}
                    >
                      ADD TO CART <ShoppingCartIcon />
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </Col>
          );
        })}
      {fill}
    </Row>
  ) : null;
};

export default ProductBrowse;

/*
<Row className={styles.container}>
  {props.products &&
    props.products.map((product, productIndex) => {
      return (
        <Col
          xs={4}
          className={styles.product__container}
          key={productIndex}
        >
          <Link
            to={`/product/${product.uuid}`}
            style={{ textDecoration: "inherit", color: "inherit" }}
          >
            <div className={styles.product__link}>
              <div className="text-center">
                <img src={placeholderImage} alt="Logo" />
              </div>
              <h5> {product.name} </h5>
              <h4 className={styles.product__price}>{product.price} EGP</h4>
            </div>
          </Link>
          <div className="text-center d-none d-lg-block">
            <Button
              variant="primary"
              size="lg"
              onClick={(ev) => {
                props.onAddCartClick(product);
              }}
            >
              ADD TO CART <ShoppingCartIcon />
            </Button>
          </div>
          <div className="text-center d-block d-lg-none">
            <Button
              variant="primary"
              onClick={(ev) => {
                props.onAddCartClick(product);
              }}
            >
              ADD TO CART <ShoppingCartIcon />
            </Button>
          </div>
        </Col>
      );
    })}
  {fill}
</Row>
*/
