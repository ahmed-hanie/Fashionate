import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./CategoriesPage.module.css";
import { getCategories } from "../../api/category";
import { getSubcategoriesFromCategory } from "../../api/subcategory";

const CategoriesPage = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let categories = await getCategories();
      categories = categories.data.data;
      let subcategories = [];
      categories.forEach((item) => {
        subcategories.push(getSubcategoriesFromCategory(item.id));
      });
      Promise.all(subcategories).then((values) => {
        subcategories = values.map((subcategory) => subcategory.data.data);
        for (let i = 0; i < categories.length; i++) {
          categories[i].subcategories = subcategories[i];
        }
        setCategories(categories);
      });
    };

    fetchData();
  }, []);

  return (
    <div className="p-5">
      <h3> Shop All Categories </h3>
      <Row className="mt-3">
        {categories.map((item, categoryIndex) => {
          const subcategoryParagraphs = item.subcategories.map(
            (subcategory, subcategoryIndex) => {
              return (
                <Link
                  to={`/?category=${item.id}&subcategory=${subcategory.id}`}
                  className={`${styles.subcategory} mb-2`}
                  key={subcategory.id}
                >
                  {subcategory.name}
                </Link>
              );
            }
          );
          return (
            <Col md={12} lg key={categoryIndex}>
              <div className={`${styles.card} mb-5`}>
                <Card>
                  <Card.Body>
                    <Card.Title> {item.name} </Card.Title>
                    <hr />
                    {subcategoryParagraphs}
                  </Card.Body>
                </Card>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default CategoriesPage;
