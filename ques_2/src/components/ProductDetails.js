import React, { useState, useEffect } from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const ProductDetails = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE1MTQ0MjE5LCJpYXQiOjE3MTUxNDM5MTksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjljYzgyZWRiLTA1NDMtNGRjMi04NDkzLTk0NzMzZmU1NjU2NiIsInN1YiI6IjIxMjkxMDJAa2lpdC5hYy5pbiJ9LCJjb21wYW55TmFtZSI6IktJSVRCQlNSIiwiY2xpZW50SUQiOiI5Y2M4MmVkYi0wNTQzLTRkYzItODQ5My05NDczM2ZlNTY1NjYiLCJjbGllbnRTZWNyZXQiOiJRYU1mdFlTWlRyUkpRUUF4Iiwib3duZXJOYW1lIjoiU2hhc3dhdCBOYW5kYW4iLCJvd25lckVtYWlsIjoiMjEyOTEwMkBraWl0LmFjLmluIiwicm9sbE5vIjoiMjEyOTEwMiJ9.C2fVTI2ZWonq1bse2O2YDrqV9FtrD4LSVWOP0UCjpLo";
  const apiUrl = "http://20.244.56.144/test";
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${apiUrl}/test/categories/:categoryname/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setProduct(data);
    };

    fetchData();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={`https://picsum.photos/id/${product.id}/400/300`}
        alt={product.productName}
      />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {product.productName}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Price: ${product.price}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Rating: {product.rating}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Discount: {product.discount}%
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Availability: {product.availability ? "In Stock" : "Out of Stock"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
