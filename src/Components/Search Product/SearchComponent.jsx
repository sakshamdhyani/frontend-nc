import React, { useState, useEffect, useCallback } from 'react';
import './searchComponent.css';
import SearchCard from './SearchCard';
import { IoSearchOutline } from "react-icons/io5";
import axios from 'axios';
import BigLoader from '../Loader/BigLoader';

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const SearchComponent = ({ searchPopup, setSearchPopup }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchResults = async (keyword) => {
    if (keyword) {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/v1/backend/products/search?keyword=${keyword}`);
        setSearchResults(data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const debouncedFetchSearchResults = useCallback(debounce(fetchSearchResults, 500), []);

  useEffect(() => {
    debouncedFetchSearchResults(searchTerm);
  }, [searchTerm, debouncedFetchSearchResults]);

  const handleCancel = () => {
    setSearchPopup(false);
    setSearchTerm("");
  };

  const handleCardClick = () => {
    setSearchPopup(false);
    setSearchTerm("");
  };

  return (
    <div className={searchPopup ? 'searchComponentBody' : 'hideSearchComponentBody'}>
      <div className="templateContainer">
        <div className="searchInput_Container">
          <div className='searchInput_ContainerIcon'>
            <IoSearchOutline />
          </div>
          <input
            id="searchInput"
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
          <button onClick={handleCancel}>Cancel</button>
        </div>
        <div className="template_Container">
          {loading ? (
            <BigLoader />
          ) : searchResults?.length > 0 ? (
            searchResults.map((product) => (
              <div key={product._id} onClick={handleCardClick}>
                <SearchCard product={product} />
              </div>
            ))
          ) : searchTerm && (
            <div className="noResults">No products found !</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
