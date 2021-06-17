import React, { useState, useEffect, useContext, useCallback } from "react";
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import FilterMenu from "../FilterMenu/FilterMenu";
import ProductBrowse from "../ProductBrowse/ProductBrowse";
import LoginModal from "../LoginModal/LoginModal";
import { getCategories } from "../../api/category";
import { getSubcategoriesFromCategory } from "../../api/subcategory";
import { getTags } from "../../api/tag";
import { getProducts } from "../../api/product";
import { addOrUpdateQuery, removeFromQuery } from "../../utility/querybuilder";
import {
  addToCart,
  removeFromCart,
  isProductInCart,
  getCachedCart,
  getProductCountInCart,
} from "../../utility/cart";
import AuthContext from "../../context/AuthContext";
import CartContext from "../../context/CartContext";

const ProductSearchPage = () => {
  const [authData] = useContext(AuthContext);
  const [cartItemsNum, setCartItemsNum] = useContext(CartContext);

  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [subcategorySearchTerm, setSubcategorySearchTerm] = useState("");
  const [tags, setTags] = useState([]);
  const [tagSearchTerm, setTagSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState({ limit: 9, offset: 0 });
  const [showModal, setShowModal] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const fetchProducts = useCallback(
    async (q, addToExisting = false) => {
      let newProducts = await getProducts(q);
      newProducts = newProducts.data;
      if (authData.authenticated) {
        let cachedCart = getCachedCart();
        newProducts.data = newProducts.data.map((product) => {
          product.inCart = isProductInCart(product, cachedCart);
          return product;
        });
      }
      if (addToExisting) {
        setProducts((oldProducts) => {
          return [...oldProducts, ...newProducts.data];
        });
      } else {
        setProducts(newProducts.data);
      }
      if (newProducts.has_more) {
        setHasMore(newProducts.has_more);
      }
    },
    [authData.authenticated]
  );

  const onCategorySearch = (ev) => {
    setCategorySearchTerm(ev.target.value);
  };

  const onCategoryItemSelect = async (ev, index) => {
    categories[index].selected = ev.target.checked;
    setCategories([...categories]);

    // If item selected, get subcategories for this category and filter products
    let newQuery = {};
    if (ev.target.checked) {
      let subcategoriesData = await getSubcategoriesFromCategory(
        categories[index].id
      );
      subcategoriesData = subcategoriesData.data.data;
      setSubcategories([
        ...subcategories,
        ...subcategoriesData.map((subcategory) => {
          subcategory.selected = false;
          return subcategory;
        }),
      ]);
      newQuery = {
        ...addOrUpdateQuery(query, "categoryId", {
          in: categories
            .filter((item) => item.selected)
            .map((category) => category.id),
        }),
        limit: 9,
        offset: 0,
      };
    } else {
      // An item was deselected, remove its subcategories and filter products
      let newSubcategories = subcategories.filter(
        (item) => item.categoryId !== categories[index].id
      );
      setSubcategories([...newSubcategories]);
      const selectedCategories = categories.filter((item) => item.selected);
      if (selectedCategories.length > 0) {
        newQuery = {
          ...addOrUpdateQuery(query, "categoryId", {
            in: selectedCategories.map((category) => category.id),
          }),
          limit: 9,
          offset: 0,
        };
        newQuery = {
          ...newQuery,
          ...addOrUpdateQuery(query, "subcategories.id", {
            in: newSubcategories.map((subcategory) => subcategory.id),
          }),
        };
      } else {
        newQuery = {
          ...removeFromQuery(query, "categoryId"),
          ...removeFromQuery(query, "subcategories.id"),
          limit: 9,
          offset: 0,
        };
      }
    }
    setQuery({ ...newQuery });
    fetchProducts(newQuery);
  };

  const onSubcategorySearch = (ev) => {
    setSubcategorySearchTerm(ev.target.value);
  };

  const onSubcategoryItemSelect = async (ev, index) => {
    subcategories[index].selected = ev.target.checked;
    setSubcategories([...subcategories]);

    // If item selected/deselected, filter products
    let newQuery = {};
    if (ev.target.checked) {
      newQuery = {
        ...addOrUpdateQuery(query, "subcategories.id", {
          in: subcategories
            .filter((item) => item.selected)
            .map((subcategory) => subcategory.id),
        }),
        limit: 9,
        offset: 0,
      };
    } else {
      const selectedSubcategories = subcategories.filter(
        (item) => item.selected
      );
      if (selectedSubcategories.length > 0) {
        newQuery = {
          ...addOrUpdateQuery(query, "subcategories.id", {
            in: selectedSubcategories.map((subcategory) => subcategory.id),
          }),
          limit: 9,
          offset: 0,
        };
      } else {
        newQuery = {
          ...removeFromQuery(query, "subcategories.id"),
          limit: 9,
          offset: 0,
        };
      }
    }
    setQuery({ ...newQuery });
    fetchProducts(newQuery);
  };

  const onTagSearch = (ev) => {
    setTagSearchTerm(ev.target.value);
  };

  const onTagItemSelect = async (ev, index) => {
    tags[index].selected = ev.target.checked;
    setTags([...tags]);

    // If item selected/deselected, filter products
    let newQuery = {};
    if (ev.target.checked) {
      newQuery = {
        ...addOrUpdateQuery(query, "tags.id", {
          in: tags.filter((item) => item.selected).map((tag) => tag.id),
        }),
        limit: 9,
        offset: 0,
      };
    } else {
      const selectedTags = tags.filter((item) => item.selected);
      if (selectedTags.length > 0) {
        newQuery = {
          ...addOrUpdateQuery(query, "tags.id", {
            in: selectedTags.map((tag) => tag.id),
          }),
          limit: 9,
          offset: 0,
        };
      } else {
        newQuery = {
          ...removeFromQuery(query, "tags.id"),
          limit: 9,
          offset: 0,
        };
      }
    }
    setQuery({ ...newQuery });
    fetchProducts(newQuery);
  };

  const onAddCartClick = (product) => {
    if (!authData.authenticated) {
      setShowModal(true);
    } else {
      addToCart(product);
      setCartItemsNum(cartItemsNum + 1);
      for (let i = 0; i < products.length; i++) {
        if (products[i].uuid === product.uuid) {
          products[i].inCart = true;
        }
      }
      setProducts([...products]);
    }
  };

  const onRemoveCartClick = (product) => {
    if (!authData.authenticated) {
      setShowModal(true);
    } else {
      const count = getProductCountInCart(product);
      removeFromCart(product);
      setCartItemsNum(cartItemsNum - count);
      for (let i = 0; i < products.length; i++) {
        if (products[i].uuid === product.uuid) {
          products[i].inCart = false;
        }
      }
      setProducts([...products]);
    }
  };

  const onModalClose = () => {
    setShowModal(false);
  };

  const onLoginSuccess = () => {
    setShowModal(false);
  };

  const fetchMoreData = () => {
    const newQuery = { ...query, offset: query.offset + 9 };
    setQuery(newQuery);
    fetchProducts(newQuery, true);
  };

  useEffect(() => {
    const fetchData = async () => {
      let categories = getCategories();
      let tags = getTags();
      let products = fetchProducts({ limit: 9, offset: 0 });

      Promise.all([categories, tags, products]).then((results) => {
        categories = results[0].data.data;
        tags = results[1].data.data;
        setCategories(
          categories.map((category) => {
            category.selected = false;
            return category;
          })
        );
        setTags(
          tags.map((tag) => {
            tag.selected = false;
            return tag;
          })
        );
      });
    };

    fetchData();
  }, [fetchProducts]);

  useEffect(() => {
    // Handle location changes
    // Search bar causes location update

    if (!location.search || location.search.length === 0) return;

    const queryParams = new URLSearchParams(location.search);

    let categories = getCategories();
    setCategorySearchTerm("");
    setSubcategorySearchTerm("");
    setTagSearchTerm("");
    getTags().then((tags) => {
      setTags(
        tags.data.data.map((tag) => {
          tag.selected = false;
          return tag;
        })
      );
    });

    /*
      0: Url contains name param
      1: Url contains subcategory, category params
    */
    let queryEnum = 0;
    let neededValue = null;
    let categoryId = null;

    for (const [key, value] of queryParams) {
      if (key === "name") {
        neededValue = value;
        queryEnum = 0;
        break;
      } else if (key === "subcategory") {
        neededValue = parseInt(value);
        queryEnum = 1;
      } else if (key === "category") {
        categoryId = parseInt(value);
      }
    }

    if (queryEnum === 0) {
      Promise.all([categories]).then((results) => {
        categories = results[0].data.data;
        setSubcategories([]);
        setCategories(
          categories.map((category) => {
            category.selected = false;
            return category;
          })
        );
        let newQuery = { limit: 9, offset: 0 };
        newQuery = addOrUpdateQuery(newQuery, "name", { like: neededValue });
        setQuery(newQuery);
        fetchProducts(newQuery);
      });
    } else if (queryEnum === 1) {
      let subcategories = getSubcategoriesFromCategory(categoryId);
      Promise.all([categories, subcategories]).then((results) => {
        categories = results[0].data.data;
        subcategories = results[1].data.data;
        setCategories(
          categories.map((category) => {
            category.selected = category.id !== categoryId ? false : true;
            return category;
          })
        );
        setSubcategories(
          subcategories.map((subcategory) => {
            subcategory.selected =
              subcategory.id !== neededValue ? false : true;
            return subcategory;
          })
        );
        let newQuery = { limit: 9, offset: 0 };
        newQuery = addOrUpdateQuery(newQuery, "categoryId", {
          in: [categoryId],
        });
        newQuery = addOrUpdateQuery(newQuery, "subcategories.id", {
          in: [neededValue],
        });
        setQuery(newQuery);
        fetchProducts(newQuery);
      });
    }
  }, [location, fetchProducts]);

  useEffect(() => {
    setProducts((products) =>
      products.map((product) => {
        product.inCart = isProductInCart(product);
        return product;
      })
    );
  }, [authData]);

  return (
    <Row>
      <Col xs={2} className="d-none d-lg-block">
        <FilterMenu
          title="Category"
          items={categories}
          onSearch={onCategorySearch}
          onItemSelect={onCategoryItemSelect}
          search={categorySearchTerm}
        />
        <hr />
        <FilterMenu
          title="Subcategory"
          items={subcategories}
          search={subcategorySearchTerm}
          onSearch={onSubcategorySearch}
          onItemSelect={onSubcategoryItemSelect}
        />
        <hr />
        <FilterMenu
          title="Tag"
          items={tags}
          search={tagSearchTerm}
          onSearch={onTagSearch}
          onItemSelect={onTagItemSelect}
        />
      </Col>
      <Col xs={12} lg={10}>
        <ProductBrowse
          products={products}
          onAddCartClick={onAddCartClick}
          onRemoveCartClick={onRemoveCartClick}
          loadMore={fetchMoreData}
          hasMore={hasMore}
        />
      </Col>
      {showModal ? (
        <LoginModal
          show={showModal}
          onModalClose={onModalClose}
          onLoginSuccess={onLoginSuccess}
        />
      ) : null}
    </Row>
  );
};

export default ProductSearchPage;
