import React from "react";
import { Form } from "react-bootstrap";
import styles from "./FilterMenu.module.css";

const FilterMenu = (props) => {
  // Handle categories input
  // Push selected items up the menu
  let items = [];
  if (props.items) {
    if (props.search) {
      const selectedItems = [];
      const nonSelectedItems = [];
      props.items.forEach((item) => {
        if (item.selected) {
          selectedItems.push(item);
        } else {
          nonSelectedItems.push(item);
        }
      });
      items = [...selectedItems, ...nonSelectedItems].map((item, itemIndex) => {
        if (item.selected) {
          return (
            <div key={itemIndex}>
              <Form.Check
                inline
                checked={item.selected}
                onChange={(ev) => {
                  props.onItemSelect(ev, itemIndex);
                }}
              />
              <span className={styles.item__text}>{item.name}</span>
            </div>
          );
        } else if (
          item.name.toLowerCase().includes(props.search.toLowerCase())
        ) {
          return (
            <div key={itemIndex}>
              <Form.Check
                inline
                checked={item.selected}
                onChange={(ev) => {
                  props.onItemSelect(ev, itemIndex);
                }}
              />
              <span className={styles.item__text}>{item.name}</span>
            </div>
          );
        }
        return null;
      });
    } else {
      items = props.items.map((item, itemIndex) => {
        return (
          <div key={itemIndex}>
            <Form.Check
              inline
              checked={item.selected}
              onChange={(ev) => {
                props.onItemSelect(ev, itemIndex);
              }}
            />
            <span className={styles.item__text}>{item.name}</span>
          </div>
        );
      });
    }
  }

  return (
    <div className={styles.container}>
      <h4 className="mb-2"> {props.title} </h4>
      <Form.Control
        type="text"
        placeholder={`Enter a ${props.title.toLowerCase()}`}
        size="sm"
        className="mb-2"
        onChange={props.onSearch}
        value={props.search}
      />
      {items}
    </div>
  );
};

export default FilterMenu;
