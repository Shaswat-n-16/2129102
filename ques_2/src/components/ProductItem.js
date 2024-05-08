import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const ProductItem = ({ product }) => {
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

export default ProductItem;
