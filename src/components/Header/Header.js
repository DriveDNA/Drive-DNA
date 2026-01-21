import React, { useEffect, useState } from "react";
import "./Header.css";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
const API_URL = process.env.REACT_APP_API_URL;

export const Header = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();
  let auth = localStorage.getItem("user");
  auth = auth ? JSON.parse(auth).result : null;

  const handleSearch = () => {
  if (search.trim() !== "") {
    navigate(`/search?q=${encodeURIComponent(search)}`);
    setShowSuggestions(false);
    setSearch("");
    closeNavbar();
  }
};

  const handleChange = async (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const res = await fetch(`${API_URL}/search/suggest?q=${value}`);
    const data = await res.json();
    setSuggestions(data);
    setShowSuggestions(true);
  };
  useEffect(() => {
    const close = () => setShowSuggestions(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

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

  const closeNavbar = () => {
    const navbar = document.getElementById("navbarSupportedContent");
    const bsCollapse = window.bootstrap.Collapse.getInstance(navbar);
    if (bsCollapse) bsCollapse.hide();
  };

  const Signup = () => {
    navigate("./signup");
  };
  const cart = () => {
    navigate("/cart");
  };
  const logout = () => {
    localStorage.clear("user");
    navigate("/");
  };
  const myorder = () => {
    navigate("/myorders");
  };

  return (
    <>
      <Nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link to="/">
            <img
              src="/logo.png"
              alt="logo"
              height="50px"
              style={{ cursor: "pointer" }}
            />
          </Link>

          <div className="d-flex align-items-center nav-icons">
            {auth ? (
              <span className="login-out">
                <Dropdown align="end">
                  <Dropdown.Toggle className="log-name-toggle">
                    {/* {auth.name} */}{" "}
                    {auth.name.length > 10
                      ? auth.name.substring(0, 10) + "..."
                      : auth.name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={logout}>
                      Logout
                    </Dropdown.Item>
                    <Dropdown.Item as="button" onClick={myorder}>
                      My Orders
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </span>
            ) : (
              <Button
                variant="link"
                className="login-icon login-out"
                onClick={Signup}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="currentColor"
                  className="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                </svg>
              </Button>
            )}

            <Button
              variant="link"
              className="cart-icon cart-out"
              onClick={cart}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path
                  d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5
                8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01
                3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102
                4l1.313 7h8.17l1.313-7zM5
                12a2 2 0 1 0 0 4 2 2 0 0
                0 0-4m7 0a2 2 0 1 0 0 4 2
                2 0 0 0 0-4m-7 1a1 1 0 1
                1 0 2 1 1 0 0 1 0-2m7
                0a1 1 0 1 1 0 2 1 1 0 0 1
                0-2"
                />
              </svg>
            </Button>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div
            className="collapse mob-nav navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mt-3">
              {/* ⭐ DYNAMIC CATEGORY DROPDOWNS ⭐ */}
              {categories.map((cat) => (
                <li key={cat._id} className="drop-hide mt-1">
                  <div className="dropdown d-grid">
                    <button
                      className="btn nav-o-link btn-danger dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                    >
                      {cat.name}
                    </button>

                    <ul className="dropdown-menu">
                      {cat.children.map((child) => (
                        <li key={child._id}>
                          <Link
                            className="dropdown-item"
                            to={`/category/${child._id}`}
                            onClick={closeNavbar}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>

            <form
              className="d-flex me-auto "
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search for products"
                autoComplete="off"
                value={search}
                onChange={handleChange}
                onFocus={() => setShowSuggestions(true)}
              />

              <button
                className="btn btn-danger"
                id="searchBtn"
                onClick={handleSearch}
                type="button"
              >
                Search
              </button>
              {showSuggestions && suggestions.length > 0 && (
                <div
                  className="list-group position-absolute mt-5 shadow"
                  style={{ zIndex: 999, width: "300px" }}
                >
                  {suggestions.map((item) => (
                    <button
                      key={item._id}
                      className="list-group-item list-group-item-action"
                      onClick={() => {
                        navigate(`/product/${item._id}`);
                        setShowSuggestions(false);
                        setSearch("");
                        closeNavbar();
                      }}
                    >
                      {item.name.length > 35
                        ? item.name.slice(0, 35) + "..."
                        : item.name}
                    </button>
                  ))}
                </div>
              )}
            </form>

            <div>
              {auth ? (
                <span className="login-in">
                  <Dropdown align="end">
                    <Dropdown.Toggle className="log-name-toggle">
                      {auth.name}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item as="button" onClick={logout}>
                        Logout
                      </Dropdown.Item>
                      <Dropdown.Item as="button" onClick={myorder}>
                        My Orders
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </span>
              ) : (
                <button className="btn btn-danger login-in" onClick={Signup}>
                  SignUp
                </button>
              )}
              <Button variant="link" onClick={cart}>
                <svg
                  className="cart-icon cart-in bi bi-cart"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </Nav>
    </>
  );
};
