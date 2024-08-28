import React, { useEffect, useState } from 'react';
import './complaintRegistration.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories, registerComplaint } from '../../redux/slices/contact';
import BigLoader from '../Loader/BigLoader';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData'; // Import MetaData component

const ComplaintRegistration = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.contact);
  const { isAuth } = useSelector((state) => state.userAuth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    serialNumber: '',
    category: '',
    subCategory: '',
    productId: '',
    nature: '',
    description: '',
    contactNumber: '',
    address: '',
    pincode: '',
    bill: null, // Store the file object directly in formData
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContactNumberInput = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    setFormData({ ...formData, contactNumber: value });
  };

  const handlePincodeInput = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    setFormData({ ...formData, pincode: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, bill: file }); // Update formData with the file object
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAuth) {
      toast.error('Please Login First');
      navigate('/login');
      return;
    }

    // Check if bill is uploaded
    if (!formData.bill) {
      toast.error('Please upload a bill');
      return;
    }

    // Dispatch registerComplaint action with formData
    dispatch(registerComplaint(formData, setFormData));
  };

  const selectedCategory =
    categories?.length > 0 ? categories.find((cat) => cat._id === formData.category) : null;
  const subCategories = selectedCategory?.subCategories || [];
  const products =
    formData.subCategory ?
      subCategories.find((sub) => sub._id === formData.subCategory)?.products :
      selectedCategory?.products || [];

  return (
    loading ? <BigLoader /> :
      <div className='complaintRegistrationBody'>
        <MetaData title="Register Your Complaint - Moseta" description="Register your complaint with Moseta. Fill out the form with necessary details and submit." />

        <h1 className='complaintRegistrationHeading'>Register Your Complaint</h1>
        {/* Authentication warning */}
        {!isAuth && (
          <p className='text-red-600 mb-4'>
            ( Please Login First to register your complaint! )
          </p>
        )}

        <form className='complaintRegistrationForm' onSubmit={handleSubmit}>


          {/* Category */}
          <div className='complaintRegistrationCategory'>
            <h1 className='complaintRegistrationCategoryHeading'>Category:</h1>

            <select name='category' value={formData.category} onChange={handleChange} required>
              <option value='' disabled>Select Category</option>
              {categories?.length > 0 && categories.map((category) => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </div>

          {/* Sub Category */}
          {subCategories.length > 0 && (
            <div className='complaintRegistrationCategory'>
              <h1 className='complaintRegistrationCategoryHeading'>Sub Category:</h1>
              <select name='subCategory' value={formData.subCategory} onChange={handleChange} required>
                <option value='' disabled>Select Sub Category</option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory._id} value={subCategory._id}>{subCategory.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* Product */}
          <div className='complaintRegistrationProducts'>
            <h1 className='complaintRegistrationProductsHeading'>Product:</h1>
            <select name='productId' value={formData.productId} onChange={handleChange} required>
              <option value='' disabled>Select Product</option>
              {products?.length > 0 && products.map((product) => (
                <option key={product._id} value={product._id}>{product.name}</option>
              ))}
            </select>
          </div>

          {/* Serial Number */}
          <div className='complaintRegistrationFormGroup'>
            <label htmlFor='serialNumber'>Serial Number</label>
            <input
              type='text'
              id='serialNumber'
              name='serialNumber'
              value={formData.serialNumber}
              onChange={handleChange}
              required
            />
          </div>

          {/* Nature */}
          <div className='complaintRegistrationFormGroup'>
            <label htmlFor='nature'>Nature</label>
            <input
              type='text'
              id='nature'
              name='nature'
              value={formData.nature}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className='complaintRegistrationFormGroup'>
            <label htmlFor='description'>Description</label>
            <textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Contact Number */}
          <div className='complaintRegistrationFormGroup'>
            <label htmlFor='contactNumber'>Contact Number</label>
            <input
              type='text'
              id='contactNumber'
              name='contactNumber'
              value={formData.contactNumber}
              onChange={handleContactNumberInput}
              required
              maxLength={10}
              pattern='\d{10}'
              title='Contact number must be 10 digits.'
            />
          </div>

          {/* Address */}
          <div className='complaintRegistrationFormGroup'>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              id='address'
              name='address'
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* Pincode */}
          <div className='complaintRegistrationFormGroup'>
            <label htmlFor='pincode'>Pincode</label>
            <input
              type='text'
              id='pincode'
              name='pincode'
              value={formData.pincode}
              onChange={handlePincodeInput}
              required
              maxLength={6}
              pattern='\d{6}'
              title='Pincode must be 6 digits.'
            />
          </div>

          {/* Upload Bill */}
          <div className='complaintRegistrationFormGroup'>
            <label htmlFor='bill'>Upload Bill (compulsory)</label>
            <input
              type='file'
              id='bill'
              name='bill'
              accept='.pdf,.jpg,.jpeg,.png'
              onChange={handleFileChange}
              required
            />
          </div>

          <button type='submit' className='complaintRegistrationSubmitButton'>Submit</button>
        </form>
      </div>
  );
};

export default ComplaintRegistration;
