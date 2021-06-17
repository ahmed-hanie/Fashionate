import React from "react";
import { Link } from "react-router-dom";
import styles from "./AdminHome.module.css";

const AdminHome = () => {
  return (
    <div className={`d-flex flex-wrap p-5 ${styles.container}`}>
      <div className={`${styles.item} p-5 mb-5`}>
        <Link to="/products">
          <h1> Products </h1>
        </Link>
      </div>
      <div className={`${styles.item} p-5 ml-5 mb-5`}>
        <Link to="/categories">
          <h1> Categories </h1>
        </Link>
      </div>
      <div className={`${styles.item} p-5 ml-5 mb-5`}>
        <Link to="/subcategories">
          <h1> Subcategories </h1>
        </Link>
      </div>
      <div className={`${styles.item} p-5 ml-5 mb-5`}>
        <Link to="/tags">
          <h1> Tags </h1>
        </Link>
      </div>
      <div className={`${styles.item} p-5 ml-5 mb-5`}>
        <Link to="/users">
          <h1> Users </h1>
        </Link>
      </div>
      <div className={`${styles.item} p-5 ml-5 mb-5`}>
        <Link to="/newaccount">
          <h1> Admins </h1>
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;
