import React, { useEffect, useState } from "react";
import "./Dropdown.css";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
const API_URL = process.env.REACT_APP_API_URL;


export const Dropdown = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/category`)
      .then((res) => res.json())
      .then((data) => buildTree(data))
      .catch((err) => console.log("Category fetch error:", err));
  }, []);

  // Convert flat list → parent-child structure
  const buildTree = (list) => {
    const parents = list.filter((c) => c.parent === null);

    const formatted = parents.map((parent) => ({
      ...parent,
      children: list.filter((c) => c.parent === parent._id),
    }));

    setCategories(formatted);
  };

  return (
    <>
      <div className="menu-drop">
        {categories.map((cat) => (
          <div className="item" key={cat._id}>
            <div className="dropdown">
              <button className="dropbtn">
                {cat.name}
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-caret-down-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </span>
              </button>

              <div className="dropdown-content">
                {/* Show Subcategories */}
                {cat.children.map((child) => (
                  <Nav.Link
                    key={child._id}
                    as={Link}
                    to={`/category/${child._id}`}
                    className="dropdown-item"
                  >
                    {child.name}
                  </Nav.Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

