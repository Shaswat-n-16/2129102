import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const Filter = ({
  categories,
  companies,
  selectedCompany,
  setSelectedCompany,
  selectedCategory,
  setSelectedCategory,
  selectedRating,
  setSelectedRating,
  selectedPriceRange,
  setSelectedPriceRange,
  sortBy,
  setSortBy,
}) => {
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  // Ensure that categories and companies are defined before mapping over them
  if (!categories || !companies) {
    return null; // Or handle the case where categories or companies are undefined
  }

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          label="Category"
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="company-label">Company</InputLabel>
        <Select
          labelId="company-label"
          id="company"
          value={selectedCompany}
          onChange={handleCompanyChange}
          label="Company"
        >
          <MenuItem value="">All</MenuItem>
          {companies.map((company) => (
            <MenuItem key={company} value={company}>
              {company}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Add other filter options here */}
    </div>
  );
};

export default Filter;
