import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import ProductList from './ProductList';
import Filters from './Filters';
import './filterCategoryPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { categoryDetails } from '../../redux/slices/dataFetch';
import { useParams } from 'react-router-dom';
import BigLoader from '../Loader/BigLoader';

const FilterCategoryPage = () => {
  const [filters, setFilters] = useState({
    selectedSubCategories: [],
  });

  const dispatch = useDispatch();
  const { category, loading } = useSelector((state) => state.dataFetch);
  const params = useParams();

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  useEffect(() => {
    dispatch(categoryDetails(params.id));
  }, [dispatch, params.id]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Function to filter products based on selected subcategories by name
  const filterProductsBySubCategories = (subCategories, selectedSubCategories) => {
    if (!subCategories || selectedSubCategories.length === 0) {
      return subCategories || []; // No subcategory selected, show all subcategories and their products
    }

    return subCategories.filter(subCategory => {
      return selectedSubCategories.includes(subCategory.name);
    });
  };

  // Determine products to display based on selected subcategories
  let productsToDisplay = [];
console.log()
  if (!isEmpty(category)) {
    const filteredSubCategories = filterProductsBySubCategories(category.subCategories, filters.selectedSubCategories);

    productsToDisplay = filteredSubCategories.map(subCategory => ({
      subCategory,
      products: subCategory.products || [], // Ensure products array is defined
    }));
  }

  return (
    <>
      <Helmet>
        <title>{category ? `${category.name} - Nand Computers` : 'Category Not Found - Nand Computers'}</title>
        <meta name="description" content={category ? `Explore a wide range of products in the ${category.name} category at Nand Computers. Filter by subcategories and find the best deals on electronic products.` : 'Category not found'} />
        <meta name="keywords" content={category ? `${category.name}, electronics, ${category.subCategories ? category.subCategories.map(sub => sub.name).join(', ') : ''}, Nand Computers` : 'category, not found'} />
      </Helmet>

      {loading ? (
        <BigLoader />
      ) : 
      !isEmpty(category) ? (
        <div className="filterCategoryPage">
          <h1 className="categoryNameHeading">{category?.name}</h1>

          <div className="filterCategoryPageContainer">
            <Filters filters={filters} subCategories={category.subCategories || []} onFilterChange={handleFilterChange} />
            <div className="productDisplayArea">
              {productsToDisplay.map(({ subCategory, products }) => (
                <div key={subCategory._id || subCategory.name} className="subCategorySection">
                  <h2>{subCategory.name}</h2>
                  {products.length === 0 ? (
                    <p className="text-lg mt-4">Coming Soon</p>
                  ) : (
                    <ProductList products={products} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center">
          <p className="text-2xl">Category Not Found!</p>
        </div>
      )}
    </>
  );
};

export default FilterCategoryPage;
