import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { createTag, updateTag, getTagById } from "../../api/tag";

const AdminTagForm = () => {
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
      const doUpdateTag = async () => {
        const response = await updateTag(paramId, { name });
        if (response.status === 200) {
          setSuccess("Tag edited successfully");
        } else {
          setError("Something went wrong");
        }
      };

      doUpdateTag();
    } else {
      const doCreateTag = async () => {
        const response = await createTag({ name });
        if (response.status === 200) {
          setSuccess("Tag created successfully");
        } else {
          setError("Something went wrong");
        }
      };

      doCreateTag();
    }
  };

  useEffect(() => {
    if (paramId) {
      const fetchTag = async () => {
        const response = await getTagById(paramId);
        if (response.status === 200) {
          setEditMode(true);
          setName(response.data.name);
        } else {
          setError("Something went wrong");
        }
      };

      fetchTag();
    }
  }, [paramId]);

  if (success) {
    return (
      <div className="p-5">
        <h1> {success} </h1>
        <Link to="/tags">
          <Button variant="primary"> Go Back </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1> {editMode ? `Edit Tag: ${paramId}` : "Create Tag:"} </h1>
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

export default AdminTagForm;
