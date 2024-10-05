import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductsToDeals, deleteDealProduct, fetchDeals } from '../../redux/adminSlices/categoryHandler';
import BigLoader from '../Loader/BigLoader';


const PFYAddProduct = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [pfyCategory, setPfyCategory] = useState('');

  const dispatch = useDispatch();
  const { categories, loading, deals } = useSelector((state) => state.categoryHandler);

  // console.log(deals)

  useEffect(() => {
    dispatch(fetchDeals());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find(cat => cat.name === selectedCategory);
      setSubcategories(category ? category.subCategories : []);
      const categoryProducts = category ? category.products : [];
      setSelectedSubcategory('');
      setProducts(categoryProducts);
      setSelectedProducts([]);
    }
  }, [selectedCategory, categories]);

  useEffect(() => {
    if (selectedSubcategory) {
      const subcategory = subcategories.find(sub => sub.name === selectedSubcategory);
      const subcategoryProducts = subcategory ? subcategory.products : [];
      setProducts(prevProducts => [...prevProducts, ...subcategoryProducts]);
      setSelectedProducts([]);
    }
  }, [selectedSubcategory, subcategories]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  const handleProductsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedProducts(selectedOptions);
  };

  const handleAddProduct = () => {
    const updatedProduct = {
      products: selectedProducts,
      dealName: pfyCategory,
    };

    dispatch(addProductsToDeals(updatedProduct));
  };

  const handleDeleteProduct = (dealCategory, productId) => {
    
    const confirm = window.confirm(`are you sure you want to delete this product from ${dealCategory} ?`);

    if(confirm){
      dispatch(deleteDealProduct(dealCategory, productId))
    }

  };

  const pfyCategories = [
    { value: 'newest', label: 'Newest' },
    { value: 'bestDeal', label: 'Best Deals' },
    { value: 'mostPopular', label: 'Most Popular' },
  ];

  return (
    loading ? <BigLoader /> :

      <div style={{ padding: '2rem' }}>
        <h4>Picks For You</h4>
        <div style={{ padding: '2rem', marginTop: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ flex: '1 1 45%' }}>
              <label htmlFor="category-select">Select Category</label>
              <select
                id="category-select"
                value={selectedCategory || ''}
                onChange={handleCategoryChange}
                style={{ width: '100%', padding: '0.5rem' }}
              >
                <option value="" disabled>Select Category</option>
                {categories && categories.map((category, index) => (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ flex: '1 1 45%' }}>
              <label htmlFor="subcategory-select">Select Subcategory</label>
              <select
                id="subcategory-select"
                value={selectedSubcategory || ''}
                onChange={handleSubcategoryChange}
                style={{ width: '100%', padding: '0.5rem' }}
                disabled={!selectedCategory}
              >
                <option value="" disabled>Select Subcategory</option>
                {subcategories.map((subcategory, index) => (
                  <option key={index} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ flex: '1 1 45%' }}>
              <label htmlFor="product-select">Select Products</label>
              <select
                id="product-select"
                multiple
                value={selectedProducts}
                onChange={handleProductsChange}
                style={{ width: '100%', padding: '0.5rem', height: '10rem' }}
                disabled={!selectedCategory}
              >
                <option value="" disabled>Select Products</option>
                {products.map((product, index) => (
                  <option key={index} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ flex: '1 1 45%' }}>
              <label htmlFor="pfy-category-select">Select "Picks For You" Category</label>
              <select
                id="pfy-category-select"
                value={pfyCategory || ''}
                onChange={(e) => setPfyCategory(e.target.value)}
                style={{ width: '100%', padding: '0.5rem' }}
                disabled={!selectedProducts.length}
              >
                <option value="" disabled>Select "Picks For You" Category</option>
                {pfyCategories.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleAddProduct}
            style={{
              backgroundColor: 'rgb(84, 206, 68)',
              color: 'white',
              marginTop: '2rem',
              padding: '0.75rem',
              width: '100%',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            disabled={!pfyCategory}
          >
            Add Products to "Picks For You" Category
          </button>
        </div>



        {/* existing products in deals */}
        <div style={{ marginTop: '2rem' }} className='flex flex-col gap-10'>

          <h5 className='text-2xl font-bold my-5'>Existing Products in Deals</h5>

            {/* Newest */}
            <div className='flex flex-col gap-5'>

              <h2 className='font-semibold text-xl'>
                Best Deals
              </h2>

              {deals && deals?.bestDeal?.map((product , index) => (

                <div key={index} className='border border-black p-1 flex justify-between'>
                    <img src={product?.themeImage?.url} width={50} alt="" />
                    <p>{product.name}</p>

                    <button className='border bg-red-600 p-1 rounded-sm text-white' onClick={() => handleDeleteProduct("bestDeal" , product._id)}>
                        Delete
                    </button>
                </div>

              ))}
            </div>

            {/* Newest */}
            <div className='flex flex-col gap-5'>

              <h2 className='font-semibold text-xl'>
                Newest
              </h2>

              {deals && deals?.newest?.map((product , index) => (

                <div key={index} className='border border-black p-1 flex justify-between'>
                    <img src={product?.themeImage?.url} width={50} alt="" />
                    <p>{product.name}</p>

                    <button className='border bg-red-600 p-1 rounded-sm text-white' onClick={() => handleDeleteProduct("newest" , product._id)}>
                        Delete
                    </button>
                </div>

              ))}
            </div>

            {/* Most Popular */}
            <div className='flex flex-col gap-5'>

              <h2 className='font-semibold text-xl'>
                Most Popular
              </h2>

              {deals && deals?.mostPopular?.map((product , index) => (

                <div key={index} className='border border-black p-1 flex justify-between'>
                    <img src={product?.themeImage?.url} width={50} alt="" />
                    <p>{product.name}</p>

                    <button className='border bg-red-600 p-1 rounded-sm text-white' onClick={() => handleDeleteProduct("mostPopular" , product._id)}>
                        Delete
                    </button>
                </div>

              ))}
            </div>

        </div>
      </div>
  );
};

export default PFYAddProduct;
