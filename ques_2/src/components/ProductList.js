import React, { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import Filter from "./Filter";
import { Grid, Container } from "@mui/material";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE1MTQ0MjE5LCJpYXQiOjE3MTUxNDM5MTksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjljYzgyZWRiLTA1NDMtNGRjMi04NDkzLTk0NzMzZmU1NjU2NiIsInN1YiI6IjIxMjkxMDJAa2lpdC5hYy5pbiJ9LCJjb21wYW55TmFtZSI6IktJSVRCQlNSIiwiY2xpZW50SUQiOiI5Y2M4MmVkYi0wNTQzLTRkYzItODQ5My05NDczM2ZlNTY1NjYiLCJjbGllbnRTZWNyZXQiOiJRYU1mdFlTWlRyUkpRUUF4Iiwib3duZXJOYW1lIjoiU2hhc3dhdCBOYW5kYW4iLCJvd25lckVtYWlsIjoiMjEyOTEwMkBraWl0LmFjLmluIiwicm9sbE5vIjoiMjEyOTEwMiJ9.C2fVTI2ZWonq1bse2O2YDrqV9FtrD4LSVWOP0UCjpLo";
const ProductList = ({
  category,
  company,
  sortBy,
  sortOrder,
  minPrice,
  maxPrice,
  rating,
  availability,
  n,
}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=${n}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setProducts(data);
    };

    fetchData();
  }, [
    category,
    company,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
    rating,
    availability,
    n,
  ]);

  return (
    <Container>
      <Filter
        category={category}
        company={company}
        sortBy={sortBy}
        sortOrder={sortOrder}
        minPrice={minPrice}
        maxPrice={maxPrice}
        rating={rating}
        availability={availability}
        n={n}
      />
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
