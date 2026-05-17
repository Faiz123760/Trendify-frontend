import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch, navigate } = useContext(ShopContext);
    const location = useLocation();

    const handleSearchSubmit = (e) => {
        if (e) e.preventDefault();
        // If search is submitted from outside the Collection catalog page, redirect there to show results
        if (!location.pathname.includes('collection')) {
            navigate('/collection');
        }
    };

    const handleClose = () => {
        setShowSearch(false);
        setSearch(''); // Clear search on close for great UX
    };

    return showSearch ? (
        <div className='text-center border-t border-b bg-gray-50/50 backdrop-blur-sm sticky top-[72px] z-40 transition-all duration-300'>
            <div className='flex items-center justify-center max-w-3xl mx-auto px-4 py-3 gap-3'>
                {/* Form allows hitting "Enter" on desktops and mobile keyboards to trigger search */}
                <form 
                    onSubmit={handleSearchSubmit} 
                    className='inline-flex items-center justify-between w-full md:w-3/4 px-5 py-2.5 border border-gray-300 rounded-full bg-white shadow-sm focus-within:border-black transition-all'
                >
                    <input 
                        value={search} 
                        onChange={(e) => {
                            setSearch(e.target.value);
                            // Auto-redirect to collection as they type if they're on another page
                            if (!location.pathname.includes('collection') && e.target.value.trim() !== '') {
                                navigate('/collection');
                            }
                        }} 
                        className='flex-1 text-sm outline-none bg-transparent placeholder-gray-400' 
                        type="text" 
                        placeholder='Search for premium apparel, styles...' 
                        autoFocus
                    />
                    <button type="submit" className="focus:outline-none flex items-center justify-center">
                        <img 
                            className='w-4 cursor-pointer hover:scale-110 active:scale-95 transition-all duration-200' 
                            src={assets.search_icon} 
                            alt="Search" 
                        />
                    </button>
                </form>
                
                <button 
                    onClick={handleClose} 
                    className='p-2 rounded-full hover:bg-gray-200 active:scale-95 transition-all duration-200'
                    title="Close Search"
                >
                    <img 
                        className='w-3 cursor-pointer' 
                        src={assets.cross_icon} 
                        alt="Close" 
                    />
                </button>
            </div>
        </div>
    ) : null
}

export default SearchBar
