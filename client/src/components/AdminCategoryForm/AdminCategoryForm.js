import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import ClearIcon from "@material-ui/icons/Clear";
import {
  createCategory,
  updateCategory,
  getCategoryById,
} from "../../api/category";
import {
  getSubcategoriesFromCategory,
  getSubcategories,
} from "../../api/subcategory";
import styles from "./AdminCategoryForm.module.css";

const AdminCategoryForm = () => {
  const { id: paramId } = useParams();

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [allSubcategories, setAllSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategoory] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onNameChange = (ev) => {
    setName(ev.target.value);
  };

  const onSelectSubcategory = (ev) => {
    setSelectedSubcategoory(ev.target.value);
  };

  const onAddSubcategory = () => {
    for (let i = 0; i < subcategories.length; i++) {
      if (subcategories[i].name === selectedSubcategory) {
        return;
      }
    }

    for (let i = 0; i < allSubcategories.length; i++) {
      if (allSubcategories[i].name === selectedSubcategory) {
        subcategories.push(allSubcategories[i]);
        setSubcategories([...subcategories]);
        return;
      }
    }
  };

  const onRemoveSubcategory = (id) => {
    setSubcategories(
      subcategories.filter((subcategory) => subcategory.id !== id)
    );
  };

  const onFormSubmit = () => {
    window.event.preventDefault();

    if (editMode) {
      const doUpdateCategory = async () => {
        const response = await updateCategory(paramId, {
          name,
          subcategories: subcategories.map((subcategory) => subcategory.id),
        });
        if (response.status === 200) {
          setSuccess("Category edited successfully");
        } else {
          setError("Something went wrong");
        }
      };

      doUpdateCategory();
    } else {
      const doCreateCategory = async () => {
        const response = await createCategory({
          name,
          subcategories: subcategories.map((subcategory) => subcategory.id),
        });
        if (response.status === 200) {
          setSuccess("Category created successfully");
        } else {
          setError("Something went wrong");
        }
      };

      doCreateCategory();
    }
  };

  useEffect(() => {
    if (paramId) {
      const fetchCategory = async () => {
        const response = await getCategoryById(paramId);
        if (response.status === 200) {
          setEditMode(true);
          setName(response.data.name);
          const response1 = await getSubcategoriesFromCategory(paramId);
          if (response1.status === 200) {
            setSubcategories(response1.data.data);
          }
        } else {
          setError("Something went wrong");
        }
      };

      fetchCategory();
    }

    const fetchAllSubcategories = async () => {
      const response = await getSubcategories();
      if (response.status === 200) {
        setAllSubcategories(response.data.data);
        if (response.data.data.length > 0) {
          setSelectedSubcategoory(response.data.data[0].name);
        }
      }
    };

    fetchAllSubcategories();
  }, [paramId]);

  if (success) {
    return (
      <div className="p-5">
        <h1> {success} </h1>
        <Link to="/categories">
          <Button variant="primary"> Go Back </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1>{editMode ? `Edit Category: ${paramId}` : "Create Category:"}</h1>
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
        <Form.Group controlId="subcategories">
          <div className="d-flex align-items-center">
            <Form.Label className="mr-3">Subcategories</Form.Label>
            <Form.Control
              as="select"
              className={`${styles.subcategoriesSelect} mr-3`}
              value={selectedSubcategory}
              onChange={onSelectSubcategory}
            >
              {allSubcategories.map((subcategory) => (
                <option key={subcategory.id}>{subcategory.name}</option>
              ))}
            </Form.Control>
            <Button variant="primary" onClick={onAddSubcategory}>
              Add Subcategory
            </Button>
          </div>
          <div className="d-flex flex-wrap mt-3">
            {subcategories.map((subcategory) => (
              <div
                className={`${styles.subcategoryItem} p-2 mr-4`}
                key={subcategory.id}
                onClick={() => {
                  onRemoveSubcategory(subcategory.id);
                }}
              >
                <span> {subcategory.name} </span>
                <ClearIcon />
              </div>
            ))}
          </div>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {error && <p> {error} </p>}
    </div>
  );
};

export default AdminCategoryForm;
