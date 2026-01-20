import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;


export const VerifySuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = new URLSearchParams(window.location.search).get("id");

    if (userId) {
      fetch(`${API_URL}/user-by-id/` + userId)
        .then(res => res.json())
        .then(data => {
          localStorage.setItem("user", JSON.stringify({ success: true, result: data }));
          navigate("/");
        });
    }
  }, [navigate]);

  return <h3>Verifying your email…</h3>;
};
