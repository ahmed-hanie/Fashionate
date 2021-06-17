import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import styles from "./AdminTags.module.css";
import { getTags, deleteTag } from "../../api/tag";

const AdminTags = () => {
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onTagDelete = async (id) => {
    const response = await deleteTag(id);
    if (response.status === 204) {
      setError(null);
      setSuccess("Tag deleted successfully");
      setTags(tags.filter((tag) => tag.id !== id));
    } else {
      setError("Something went wrong");
      setSuccess(null);
    }
  };

  useEffect(() => {
    const fetchTags = async () => {
      const response = await getTags();
      if (response.status === 200) {
        setTags(response.data.data);
      }
    };

    fetchTags();
  }, []);

  return (
    <div className="p-5">
      <div className="d-flex align-items-center">
        <h1 className="mr-5"> Tags: </h1>
        <Link to="/tag">
          <Button variant="primary" size="sm" className={styles.createButton}>
            Create Tag
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
          {tags &&
            tags.map((tag) => (
              <tr key={tag.id}>
                <td> {tag.id} </td>
                <td> {tag.name} </td>
                <td>
                  <Link to={`/tag/${tag.id}`}>
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
                      onTagDelete(tag.id);
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

export default AdminTags;
