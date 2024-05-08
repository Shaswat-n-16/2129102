const express = require("express");
const axios = require("axios");
const _ = require("lodash");
const app = express();
const companies = ["AMZ", "FLP", "SNP", "MYN", "ΑΖΟ"];
const categories = [
  "Phone",
  "Computer",
  "TV",
  "Earphone",
  "Tablet",
  "Charger",
  "Mouse",
  "Keypad",
  "Bluetooth",
  "Pendrive",
  "Remote",
  "Speaker",
  "Headset",
  "Laptop",
  "PC",
];

app.get("/categories/:categoryName/products", async (req, res) => {
  const { categoryName } = req.params;
  const { n, page, sortBy, sortOrder } = req.query;
  const minPrice = req.query.minPrice || 0;
  const maxPrice = req.query.maxPrice || Infinity;

  if (!categories.includes(categoryName)) {
    return res.status(400).json({ error: "Invalid category" });
  }

  if (!n || n < 1) {
    return res.status(400).json({ error: "Invalid number of products" });
  }

  if (n > 10) {
    if (!page || page < 1) {
      return res
        .status(400)
        .json({ error: "Pagination required for more than 10 products" });
    }
  }

  const products = await getProductsFromCompanies(
    categoryName,
    minPrice,
    maxPrice,
    n,
    page
  );
  const sortedProducts = sortProducts(products, sortBy, sortOrder);

  res.json(sortedProducts);
});

app.get("/categories/:categoryName/products/:productId", async (req, res) => {
  const { categoryName, productId } = req.params;

  if (!categories.includes(categoryName)) {
    return res.status(400).json({ error: "Invalid category" });
  }

  const product = await getProductFromCompanies(categoryName, productId);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
});

async function getProductsFromCompanies(
  categoryName,
  minPrice,
  maxPrice,
  n,
  page
) {
  const products = [];
  for (const company of companies) {
    const url = `http://20.244.56.144/test/companies/${company}/categories/${categoryName}/products?top=${n}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    const response = await axios.get(url);
    const productsFromCompany = response.data;
    products.push(...productsFromCompany);
  }

  if (page) {
    const startIndex = (page - 1) * n;
    const endIndex = startIndex + n;
    products = products.slice(startIndex, endIndex);
  }

  return products;
}

async function getProductFromCompanies(categoryName, productId) {
  for (const company of companies) {
    const url = `http://20.244.56.144/test/companies/${company}/categories/${categoryName}/products/${productId}`;
    const response = await axios.get(url);
    const product = response.data;
    if (product) {
      return product;
    }
  }
  return null;
}

function sortProducts(products, sortBy, sortOrder) {
  if (!sortBy) {
    return products;
  }

  const sortedProducts = _.sortBy(products, sortBy);
  if (sortOrder === "desc") {
    sortedProducts.reverse();
  }

  return sortedProducts;
}

app.listen(3000, () => {
  console.log("Top Products Microservice listening on port 3000");
});
