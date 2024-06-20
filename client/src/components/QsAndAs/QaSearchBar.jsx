import React, {useState, useEffect} from 'react';
import axios from 'axios';

const QaSearchBar = ({onSearch}) =>  {
  const [term, setTerm] = useState('');

  const handleChange = (event) => {
    const newTerm = event.target.value;
    setTerm(newTerm);
    onSearch(newTerm);
  }

return (
<>
  <div className="relative mb-4 border-solid border border-black">
      <input type="text" className="border pl-2 py-2 py-x pr-8 focus:outline-none w-full font-bold text-black" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." value={term} onChange={handleChange}  name="searchTerm"/>
      <span className="absolute inset-y-0 right-0 flex items-center pr-3">
      <svg className="h-5 w-5 text-black" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
      </span>
  </div>
</>
);
};

export default QaSearchBar;