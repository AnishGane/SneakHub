import React, { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useLocation } from 'react-router-dom';
import { LuSearchSlash } from 'react-icons/lu';

const SearchBar = () => {
  const { search, setSearch } = useStore();
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (location.pathname === '/collection') {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return visible ? (
    <div className="text-center">
      <div className="mb-5 inline-flex w-full items-center justify-center rounded-full border border-gray-600 py-2 pr-2 pl-4 sm:w-1/2 sm:py-1 sm:pl-5">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 bg-inherit text-sm outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="cursor-pointer rounded-full border-1 bg-gray-50 p-1.5">
          <LuSearchSlash width={24} height={24} />
        </div>
      </div>
    </div>
  ) : null;
};

// return showSearch && visible ? (
//   <div className="border-t bg-gray-50 text-center">
//     <div className="sm:1/2 mx-3 my-5 inline-flex w-3/4 items-center justify-center rounded-full border border-gray-400 px-5 py-2">
//       <input
//         type="text"
//         placeholder="Search"
//         className="flex-1 bg-inherit text-sm outline-none"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       {/* <img src={assets.search_icon} className="w-4" alt="" /> */}
//     </div>
//     <img
//       src={assets.cross_icon}
//       className="inline w-3 cursor-pointer"
//       onClick={() => setShowSearch(false)}
//       alt=""
//     />
//   </div>
// ) : null;

export default SearchBar;
