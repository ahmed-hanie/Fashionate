import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import ClearIcon from "@material-ui/icons/Clear";
import {
  createProduct,
  updateProduct,
  getProductByUuid,
} from "../../api/product";
import { getCategories } from "../../api/category";
import { getSubcategories } from "../../api/subcategory";
import { getTags } from "../../api/tag";
import styles from "./AdminProductForm.module.css";

const AdminProductForm = () => {
  const { uuid } = useParams();

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [subcategories, setSubcategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState(null);
  const [allSubcategories, setAllSubcategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [selectedSubcategory, setSelectedSubcategoory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onNameChange = (ev) => {
    setName(ev.target.value);
  };

  const onCategoryChange = (ev) => {
    setSelectedCategory(ev.target.value);
    for (let i = 0; i < allCategories.length; i++) {
      if (allCategories[i].name === ev.target.value) {
        setCategory(allCategories[i].id);
        break;
      }
    }
  };

  const onPriceChange = (ev) => {
    setPrice(parseFloat(ev.target.value));
  };

  const onSelectSubcategory = (ev) => {
    setSelectedSubcategoory(ev.target.value);
  };

  const onDescriptionChange = (ev) => {
    setDescription(ev.target.value);
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

  const onSelectTag = (ev) => {
    setSelectedTag(ev.target.value);
  };

  const onAddTag = () => {
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].name === selectedTag) {
        return;
      }
    }

    for (let i = 0; i < allTags.length; i++) {
      if (allTags[i].name === selectedTag) {
        tags.push(allTags[i]);
        setTags([...tags]);
        return;
      }
    }
  };

  const onRemoveTag = (id) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  const onFormSubmit = () => {
    window.event.preventDefault();

    if (editMode) {
      const doUpdateProduct = async () => {
        const response = await updateProduct(uuid, {
          name,
          subcategories: subcategories.map((subcategory) => subcategory.id),
          price,
          description,
          tags: tags.map((tag) => tag.id),
          categoryId: category,
        });
        if (response.status === 200) {
          setSuccess("Product edited successfully");
        } else {
          setError("Something went wrong");
        }
      };

      doUpdateProduct();
    } else {
      const doCreateProduct = async () => {
        const response = await createProduct({
          name,
          subcategories: subcategories.map((subcategory) => subcategory.id),
          price,
          description,
          tags: tags.map((tag) => tag.id),
          categoryId: category,
        });
        if (response.status === 200) {
          setSuccess("Product created successfully");
        } else {
          setError("Something went wrong");
        }
      };

      doCreateProduct();
    }
  };

  useEffect(() => {
    const fetchAllCategories = async () => {
      const response = await getCategories();
      if (response.status === 200) {
        setAllCategories(response.data.data);
        setCategory(response.data.data[0].id);
        setSelectedCategory(response.data.data[0].name);
      }
      return response.data.data;
    };

    if (uuid) {
      const fetchData = async () => {
        const allCats = await fetchAllCategories();
        const response = await getProductByUuid(uuid);
        if (response.status === 200) {
          setEditMode(true);
          setName(response.data.name);
          setDescription(response.data.description);
          setPrice(response.data.price);
          setSubcategories(response.data.subcategories);
          setTags(response.data.tags);
          setCategory(response.data.categoryId);
          for (let i = 0; i < allCats.length; i++) {
            if (allCats[i].id === response.data.categoryId) {
              setSelectedCategory(allCats[i].name);
              break;
            }
          }
        } else {
          setError("Something went wrong");
        }
      };
      fetchData();
    } else {
      fetchAllCategories();
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

    const fetchAllTags = async () => {
      const response = await getTags();
      if (response.status === 200) {
        setAllTags(response.data.data);
        if (response.data.data.length > 0) {
          setSelectedTag(response.data.data[0].name);
        }
      }
    };

    fetchAllTags();
  }, [uuid]);

  if (success) {
    return (
      <div className="p-5">
        <h1> {success} </h1>
        <Link to="/products">
          <Button variant="primary"> Go Back </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1>{editMode ? `Edit Product: ${uuid}` : "Create Product:"}</h1>
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
        <Form.Group controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={onPriceChange}
            min="1"
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={onDescriptionChange}
          />
        </Form.Group>
        <Form.Group controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={selectedCategory}
            onChange={onCategoryChange}
          >
            {allCategories.map((category) => (
              <option key={category.id}>{category.name}</option>
            ))}
          </Form.Control>
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
        <Form.Group controlId="tags">
          <div className="d-flex align-items-center">
            <Form.Label className="mr-3">Tags</Form.Label>
            <Form.Control
              as="select"
              className={`${styles.subcategoriesSelect} mr-3`}
              value={selectedTag}
              onChange={onSelectTag}
            >
              {allTags.map((tag) => (
                <option key={tag.id}>{tag.name}</option>
              ))}
            </Form.Control>
            <Button variant="primary" onClick={onAddTag}>
              Add Tag
            </Button>
          </div>
          <div className="d-flex flex-wrap mt-3">
            {tags.map((tag) => (
              <div
                className={`${styles.subcategoryItem} p-2 mr-4`}
                key={tag.id}
                onClick={() => {
                  onRemoveTag(tag.id);
                }}
              >
                <span> {tag.name} </span>
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

export default AdminProductForm;
