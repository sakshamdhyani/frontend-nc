import React from 'react';
import './filters.css';
import { FaCheckSquare, FaSquare } from 'react-icons/fa';

const Filters = ({ filters, subCategories, onFilterChange }) => {
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    let updatedSubCategories;

    if (checked) {
      updatedSubCategories = [...filters.selectedSubCategories, value];
    } else {
      updatedSubCategories = filters.selectedSubCategories.filter(subCategory => subCategory !== value);
    }

    onFilterChange({ ...filters, selectedSubCategories: updatedSubCategories });
  };

  return (
    <div className="filters">
      <h3 className="filtersTitle">Filter</h3>
      <div className="filterSubCategories">
        {subCategories?.map((subCategory) => (
          <div key={subCategory.name} className="filterCheckbox">
            <label>
              <input
                type="checkbox"
                value={subCategory.name}
                checked={filters.selectedSubCategories.includes(subCategory.name)}
                onChange={handleCheckboxChange}
              />
              {filters.selectedSubCategories.includes(subCategory.name) ? (
                <FaCheckSquare className="checkboxIcon checked" />
              ) : (
                <FaSquare className="checkboxIcon" />
              )}
              <span className="subcategoryName">{subCategory.name}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
