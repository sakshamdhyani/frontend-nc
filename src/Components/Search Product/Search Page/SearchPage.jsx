import React from 'react'
import "./searchPage.css"
import SearchPageCard from './SearchPageCard'

const SearchPage = () => {
  return (
    <div className='searchPageBody'>
        <div className='searchPageInput'>
            <input type="text" placeholder='Search for more'/>
        </div>
        <div className='searchPageProductContainer'>
            <SearchPageCard/>
        </div>
    </div>
  )
}

export default SearchPage