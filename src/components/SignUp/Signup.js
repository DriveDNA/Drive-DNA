import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import toast from "react-hot-toast";
const API_URL = process.env.REACT_APP_API_URL;


export const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    let auth = localStorage.getItem("user");
    auth = auth ? JSON.parse(auth).result : null;
    if (auth) {
      navigate("/");
    }
  });
  const login = () => {
    navigate("/login");
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormdata((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast("⚠️ All fields are required");
      return;
    }
    if (loading) return;
    setLoading(true);
    try {
      let result = await fetch(`${API_URL}/usersignup`, {
        method: "post",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      result = await result.json();

      if (result.success === true) {
        localStorage.setItem("user", JSON.stringify(result));
        navigate("/");
      } else {
        toast.success(result.message || "Signup failed");
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <>
      <div className="container s-form mt-4">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="ControlName">
            <Form.Label> Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="ControlEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="ControlPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button
              type="submit"
              className="btn btn-danger"
              size="md"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Creating account...
                </>
              ) : (
                "SignUp"
              )}
            </Button>

            <Button className="b-gray" onClick={login}>
              Already have account? Login
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};
