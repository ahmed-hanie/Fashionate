import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import styles from "./AdminCategory.module.css";
import {
  getCategoriesWithSubcategories,
  deleteCategory,
} from "../../api/category";

const AdminCategory = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onCategoryDelete = async (id) => {
    const response = await deleteCategory(id);
    if (response.status === 204) {
      setError(null);
      setSuccess("Category deleted successfully");
      setCategories(categories.filter((category) => category.id !== id));
    } else {
      setError("Something went wrong");
      setSuccess(null);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategoriesWithSubcategories();
      if (response.status === 200) {
        setCategories(response.data.data);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="p-5">
      <div className="d-flex align-items-center">
        <h1 className="mr-5"> Categories: </h1>
        <Link to="/category">
          <Button variant="primary" size="sm" className={styles.createButton}>
            Create Category
          </Button>
        </Link>
      </div>
      {error && <p className={styles.errorText}> {error} </p>}
      {success && <p className={styles.infoText}> {success} </p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Subcategories</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.map((category) => (
              <tr key={category.id}>
                <td> {category.id} </td>
                <td> {category.name} </td>
                <td>
                  {category.subcategories
                    .map((subcategory) => subcategory.name)
                    .join(", ")}
                </td>
                <td>
                  <Link to={`/category/${category.id}`}>
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
                      onCategoryDelete(category.id);
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

export default AdminCategory;
