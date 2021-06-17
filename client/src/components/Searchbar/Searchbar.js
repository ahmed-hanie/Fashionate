import React, { useState } from "react";
import { Row, InputGroup, FormControl, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import styles from "./Searchbar.module.css";

const Searchbar = () => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");
  const onSearchButtonClick = () => {
    if (searchTerm) {
      history.push(`/?name=${searchTerm}%`, {
        from: history.location.pathname,
      });
    } else {
      history.push("/");
    }
  };
  const onSearchTermChange = (ev) => {
    setSearchTerm(ev.target.value);
  };

  return (
    <Row>
      <div
        className={`${styles.container} d-flex justify-content-center align-items-center`}
      >
        <div className="mr-4">
          <Link to="/categories">
            <Button variant="primary">
              <span className={styles["categorybutton__long-text"]}>
                Browse Categories
              </span>
              <span className={styles["categorybutton__short-text"]}>
                Categories
              </span>
            </Button>
          </Link>
        </div>
        <div className="w-75">
          <InputGroup>
            <FormControl
              placeholder="What are you looking for?"
              size="lg"
              type="text"
              value={searchTerm}
              onChange={onSearchTermChange}
            />
            <InputGroup.Append>
              <Button variant="primary" onClick={onSearchButtonClick}>
                <SearchIcon />
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </div>
    </Row>
  );
};

export default Searchbar;
