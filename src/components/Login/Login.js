import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Login.css";
const API_URL = process.env.REACT_APP_API_URL;


export const Login = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    let auth=localStorage.getItem("user")
    auth=auth?JSON.parse(auth).result:null
    if(auth){
      navigate("/")
    }
  })
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    let result = await fetch(`${API_URL}/userlogin`, {
      method: "post",
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result=await result.json()
    if(result.success===true){
      localStorage.setItem('user',JSON.stringify(result))
      navigate("/")
    }else{
      toast.error(result.message)
    }
  };
  return (
    <>
      <div className="container s-form mt-4">
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="ControlEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={formData.email}
              name="email"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="ControlPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button type="submit" className="mt-2 btn-danger" size="md">
              Login
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};
