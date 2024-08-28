import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, createSubCategory, deleteCategory, deleteSubCategory, fetchCategories} from '../../redux/adminSlices/categoryHandler';
import { fetchProducts } from '../../redux/adminSlices/productHandler';
import Loader from '../Loader/Loader';
import BigLoader from '../Loader/BigLoader';

const NewCategory = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector(state => state.categoryHandler);
  const products = useSelector(state => state.productHandler.products);

  const [categoryName, setCategoryName] = useState('');
  const [categoryImages, setCategoryImages] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const [editCategoryData, setEditCategoryData] = useState(null);
  const [editSubCategoryData, setEditSubCategoryData] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);


// create category
  const handleCategorySubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', categoryName);

    for (let i = 0; i < categoryImages.length; i++) {
      formData.append('images', categoryImages[i]);
    }

    dispatch(createCategory(formData));
    setCategoryName('');
    setCategoryImages([]);
  };

//   create sub categoery
  const handleSubCategorySubmit = (e) => {
    e.preventDefault();

    dispatch(createSubCategory({
      name: subCategoryName,
      categoryId: selectedCategoryId
    }));

    setSubCategoryName('');
    setSelectedCategoryId('');
  };


  const handleCategoryEdit = (category) => {
    setEditCategoryData(category);
  };

  const handleSubCategoryEdit = (subCategory) => {
    setEditSubCategoryData(subCategory);
  };


//   update category
  const handleCategoryUpdate = (e) => {

    e.preventDefault();

    const formData = new FormData();
    formData.append('name', editCategoryData.name);
    
    for (let i = 0; i < editCategoryData.images.length; i++) {
      formData.append('images', editCategoryData.images[i]);
    }
    
    // dispatch(updateCategory({ id: editCategoryData._id, data: formData }));
    setEditCategoryData(null);
  };

//   update sub category
  const handleSubCategoryUpdate = (e) => {
    e.preventDefault();
    // dispatch(updateSubCategory({ id: editSubCategoryData._id, data: { name: editSubCategoryData.name } }));
    setEditSubCategoryData(null);
  };

  
//  delete category
  const handleCategoryDelete = (categoryId) => {

    const confirm = window.confirm("All the products and sub categories and their products will be deleted.");

    if(confirm){
        dispatch(deleteCategory(categoryId));
    }

  };


// delete sub category 
  const handleSubCategoryDelete = (subCategoryId) => {
    const confirm = window.confirm("All the products and sub categories and their products will be deleted.");

    if(confirm){
        dispatch(deleteSubCategory(subCategoryId));
    }
};




  return (

    loading ? <BigLoader/> :

    <div className="w-full mx-auto p-4">
      <div className="flex flex-col gap-4">

        {/* New Category Creation */}
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-bold mb-4">Create New Category</h2>
          <form onSubmit={handleCategorySubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Category Name</label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
                className="mt-1 block w-full border rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Category Images</label>
              <input
                type="file"
                multiple
                onChange={(e) => setCategoryImages(Array.from(e.target.files))}
                required
                className="mt-1 block w-full border rounded p-2"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white rounded p-2 flex justify-center items-center gap-2">
              Create Category
              {loading ? <Loader /> : null}
            </button>
          </form>
        </div>

        {/* New SubCategory Creation */}
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-bold mb-4">Create New SubCategory</h2>
          <form onSubmit={handleSubCategorySubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">SubCategory Name</label>
              <input
                type="text"
                value={subCategoryName}
                onChange={(e) => setSubCategoryName(e.target.value)}
                required
                className="mt-1 block w-full border rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Select Category</label>
              <select
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                required
                className="mt-1 block w-full border rounded p-2"
              >
                <option value="">Select Category</option>
                {categories && categories.map((category) => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white rounded p-2 flex justify-center items-center gap-2">
              Create SubCategory
              {loading ? <Loader /> : null}
            </button>
          </form>
        </div>

        {/* Categories, SubCategories, and Products */}
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-bold mb-4">Categories, SubCategories, and Products</h2>
          {categories && categories.map((category) => (
            <div key={category._id} className="mb-4">
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCategoryEdit(category)}
                  className="bg-yellow-500 text-white rounded p-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleCategoryDelete(category._id)}
                  className="bg-red-500 text-white rounded p-1"
                >
                  Delete

                </button>
              </div>
              {category.subCategories.map((subCategory) => (
                <div key={subCategory._id} className="ml-4">
                  <h4 className="text-md font-medium">{subCategory.name}</h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSubCategoryEdit(subCategory)}
                      className="bg-yellow-500 text-white rounded p-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleSubCategoryDelete(subCategory._id)}
                      className="bg-red-500 text-white rounded p-1"
                    >
                      Delete
                    </button>
                  </div>
                  <ul className="ml-4 list-disc">
                    {products
                      .filter((product) => product.subCategory === subCategory._id)
                      .map((product) => (
                        <li key={product._id}>{product.name}</li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Edit Category Modal */}
      {editCategoryData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Category</h2>
            <form onSubmit={handleCategoryUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Category Name</label>
                <input
                  type="text"
                  value={editCategoryData.name}
                  onChange={(e) => setEditCategoryData({ ...editCategoryData, name: e.target.value })}
                  required
                  className="mt-1 block w-full border rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Category Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setEditCategoryData({ ...editCategoryData, images: Array.from(e.target.files) })}
                  className="mt-1 block w-full border rounded p-2"
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white rounded p-2">
                Update Category
              </button>
              <button
                onClick={() => setEditCategoryData(null)}
                className="bg-gray-500 text-white rounded p-2 ml-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit SubCategory Modal */}
      {editSubCategoryData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit SubCategory</h2>
            <form onSubmit={handleSubCategoryUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">SubCategory Name</label>
                <input
                  type="text"
                  value={editSubCategoryData.name}
                  onChange={(e) => setEditSubCategoryData({ ...editSubCategoryData, name: e.target.value })}
                  required
                  className="mt-1 block w-full border rounded p-2"
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white rounded p-2">
                Update SubCategory
              </button>
              <button
                onClick={() => setEditSubCategoryData(null)}
                className="bg-gray-500 text-white rounded p-2 ml-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default NewCategory;
