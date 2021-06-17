import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import styles from "./AdminSubcategory.module.css";
import { getSubcategories, deleteSubcategory } from "../../api/subcategory";

const AdminSubcategory = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onSubcategoryDelete = async (id) => {
    const response = await deleteSubcategory(id);
    if (response.status === 204) {
      setError(null);
      setSuccess("Tag deleted successfully");
      setSubcategories(
        subcategories.filter((subcategory) => subcategory.id !== id)
      );
    } else {
      setError("Something went wrong");
      setSuccess(null);
    }
  };

  useEffect(() => {
    const fetchSubcategories = async () => {
      const response = await getSubcategories();
      if (response.status === 200) {
        setSubcategories(response.data.data);
      }
    };

    fetchSubcategories();
  }, []);

  return (
    <div className="p-5">
      <div className="d-flex align-items-center">
        <h1 className="mr-5"> Subcategories: </h1>
        <Link to="/subcategory">
          <Button variant="primary" size="sm" className={styles.createButton}>
            Create Subcategory
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
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {subcategories &&
            subcategories.map((subcategory) => (
              <tr key={subcategory.id}>
                <td> {subcategory.id} </td>
                <td> {subcategory.name} </td>
                <td>
                  <Link to={`/subcategory/${subcategory.id}`}>
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
                      onSubcategoryDelete(subcategory.id);
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

export default AdminSubcategory;
