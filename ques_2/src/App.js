import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "./components/ProductList";
import Filter from "./components/Filter";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 0]);
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);

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
  const apiUrl = "http://20.244.56.144/test";

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(selectedCompany, selectedCategory);
        let productsUrl = `${apiUrl}/companies/${selectedCompany}/categories/${selectedCategory}/products`;
        const productsResponse = await axios.get(productsUrl);
        setProducts(productsResponse.data);
        setFilteredProducts(productsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedCompany, selectedCategory]);

  useEffect(() => {
    setFilteredProducts(
      products
        .filter((product) => {
          const { company, category, rating, price } = product;

          const isCompanySelected =
            !selectedCompany || company === selectedCompany;
          const isCategorySelected =
            !selectedCategory || category === selectedCategory;
          const isRatingSelected = rating >= selectedRating;
          const isPriceInRange =
            price >= selectedPriceRange[0] && price <= selectedPriceRange[1];

          return (
            isCompanySelected &&
            isCategorySelected &&
            isRatingSelected &&
            isPriceInRange
          );
        })
        .sort((a, b) => {
          if (sortBy === "price-asc") {
            return a.price - b.price;
          } else if (sortBy === "price-desc") {
            return b.price - a.price;
          } else {
            return 0;
          }
        })
    );
  }, [
    products,
    selectedCompany,
    selectedCategory,
    selectedRating,
    selectedPriceRange,
    sortBy,
  ]);

  return (
    <div className="App">
      <h1>Product Catalog</h1>
      <Filter
        companies={companies}
        categories={categories}
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        selectedPriceRange={selectedPriceRange}
        setSelectedPriceRange={setSelectedPriceRange}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <ProductList products={filteredProducts} page={page} setPage={setPage} />
    </div>
  );
}

export default App;
