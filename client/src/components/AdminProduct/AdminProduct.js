import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import styles from "./AdminProduct.module.css";
import { getProducts, deleteProduct } from "../../api/product";

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onProductDelete = async (uuid) => {
    const response = await deleteProduct(uuid);
    if (response.status === 204) {
      setError(null);
      setSuccess("Category deleted successfully");
      setProducts(products.filter((product) => product.uuid !== uuid));
    } else {
      setError("Something went wrong");
      setSuccess(null);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
      if (response.status === 200) {
        setProducts(response.data.data);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-5">
      <div className="d-flex align-items-center">
        <h1 className="mr-5"> Products: </h1>
        <Link to="/product">
          <Button variant="primary" size="sm" className={styles.createButton}>
            Create Product
          </Button>
        </Link>
      </div>
      {error && <p className={styles.errorText}> {error} </p>}
      {success && <p className={styles.infoText}> {success} </p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Uuid</th>
            <th>Name</th>
            <th>Category</th>
            <th>Subcategories</th>
            <th>Tags</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => (
              <tr key={product.uuid}>
                <td> {product.uuid} </td>
                <td> {product.name} </td>
                <td> {product.category && product.category.name} </td>
                <td>
                  {product.subcategories &&
                    product.subcategories
                      .map((subcategory) => subcategory.name)
                      .join(", ")}
                </td>
                <td>
                  {product.tags &&
                    product.tags.map((tag) => tag.name).join(", ")}
                </td>
                <td> {product.description} </td>
                <td>
                  <Link to={`/product/${product.uuid}`}>
                    <Button size="sm" variant="primary">
                      <EditIcon />
                    </Button>
                  </Link>
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => {
                      onProductDelete(product.uuid);
                    }}
                  >
                    <ClearIcon />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminProduct;
