import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import "./Search.css";
const API_URL = process.env.REACT_APP_API_URL;

export const Search = () => {
  const [params] = useSearchParams();
  const query = params.get("q");
  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState([]);

  const fetchResults = useCallback(async () => {
    if (!query) return;

    try {
      setLoading(true);
      const res = await fetch(
        `${API_URL}/products/search?q=${encodeURIComponent(query)}`,
      );
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (error) {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  return (
    <>
      <h2 className="text-center mt-3">Search Results for: "{query}"</h2>
      <hr />
      {loading && <p className="text-center">Searching...</p>}
      <div className="container1 card-group mt-4">
        {!loading && results.length === 0 && <p>No products found</p>}
        {results.map((p) => (
          <div className="product" key={p._id}>
            <div className="card p-card m-2">
              <img
                src={`${p.images[0]}`}
                alt={p.name}
                className="card-img-top p-img"
              />
              <div className="card-body">
                <p className="card-title">{p.name}</p>
              </div>
              <div className="card-footer">
                <div className="text-body-secondary">Rs. {p.price}</div>
                <Link className="btn btn-primary" to={`/product/${p._id}`}>
                  View Product
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
