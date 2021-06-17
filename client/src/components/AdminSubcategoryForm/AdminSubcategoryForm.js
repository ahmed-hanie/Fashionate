import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import {
  createSubcategory,
  updateSubcategory,
  getSubcategoryById,
} from "../../api/subcategory";

const AdminSubcategoryForm = () => {
  const { id: paramId } = useParams();

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onNameChange = (ev) => {
    setName(ev.target.value);
  };

  const onFormSubmit = () => {
    window.event.preventDefault();

    if (editMode) {
      const doUpdateSubcategory = async () => {
        const response = await updateSubcategory(paramId, { name });
        if (response.status === 200) {
          setSuccess("Subcategory edited successfully");
        } else {
          setError("Something went wrong");
        }
      };

      doUpdateSubcategory();
    } else {
      const doCreateSubcategory = async () => {
        const response = await createSubcategory({ name });
        if (response.status === 200) {
          setSuccess("Subcategory created successfully");
        } else {
          setError("Something went wrong");
        }
      };

      doCreateSubcategory();
    }
  };

  useEffect(() => {
    if (paramId) {
      const fetchSubcategory = async () => {
        const response = await getSubcategoryById(paramId);
        if (response.status === 200) {
          setEditMode(true);
          setName(response.data.name);
        } else {
          setError("Something went wrong");
        }
      };

      fetchSubcategory();
    }
  }, [paramId]);

  if (success) {
    return (
      <div className="p-5">
        <h1> {success} </h1>
        <Link to="/subcategories">
          <Button variant="primary"> Go Back </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1>
        {editMode ? `Edit Subcategory: ${paramId}` : "Create Subcategory:"}
      </h1>
      <Form onSubmit={onFormSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={onNameChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {error && <p> {error} </p>}
    </div>
  );
};

export default AdminSubcategoryForm;
