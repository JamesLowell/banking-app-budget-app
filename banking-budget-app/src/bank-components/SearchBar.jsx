import React from 'react';

const SearchBar = ({onChange}) => {
  return (
    <div className='w-1/5 bg-white py-2 px-4 rounded-full mb-4'>
        <input 
        className='w-full focus:outline-none border-none'
        type='text'
        placeholder='search customers...'
        onChange={(e) => onChange(e.target.value)}
    />
    </div>
  );
}

export default SearchBar