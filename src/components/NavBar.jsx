import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const NavBar = () => {
    const [visible, setVisible] = useState(false);
    const { 
        getCartCount, 
        navigate, 
        token, 
        setToken, 
        setCartItems, 
        wishlist, 
        search, 
        setSearch, 
        searchCategory, 
        setSearchCategory 
    } = useContext(ShopContext);

    // Location States
    const [locationName, setLocationName] = useState(localStorage.getItem('userLocation') || 'India');
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [zipInput, setZipInput] = useState('');
    const [cityInput, setCityInput] = useState('');
    const [userName, setUserName] = useState('sign in');

    // Language list flyout
    const [langListOpen, setLangListOpen] = useState(false);

    // Search History and Suggestions States
    const [searchFocused, setSearchFocused] = useState(false);
    const [recentSearches, setRecentSearches] = useState(
        JSON.parse(localStorage.getItem('recentSearches')) || []
    );

    const trendingSearches = ["Winter Wear", "Cotton Shirt", "Denim Jacket", "Women Top", "Kids Apparel"];

    // Decode Username from token if logged in
    useEffect(() => {
        if (token) {
            setUserName('Member');
        } else {
            setUserName('sign in');
        }
    }, [token]);

    const logout = () => {
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
        toast.info("Logged out successfully");
    }

    const handleSearchSubmit = (e) => {
        if (e) e.preventDefault();
        if (search.trim()) {
            addRecentSearch(search);
        }
        setSearchFocused(false);
        navigate('/collection');
    };

    const addRecentSearch = (query) => {
        if (!query.trim()) return;
        const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
    };

    const removeRecentSearch = (e, query) => {
        e.stopPropagation();
        const updated = recentSearches.filter(s => s !== query);
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
    };

    const handleLocationSubmit = (e) => {
        e.preventDefault();
        if (cityInput.trim()) {
            const loc = `${cityInput}${zipInput ? ' ' + zipInput : ''}`;
            setLocationName(loc);
            localStorage.setItem('userLocation', loc);
            setShowLocationModal(false);
            setCityInput('');
            setZipInput('');
            toast.success(`Delivery address updated to: ${loc}`);
        } else {
            toast.error("Please enter a city name");
        }
    };

    return (
        <header className='bg-[#faf9f5] text-[#141413] sticky top-0 z-50 select-none font-sans border-b border-[#e6dfd8] shadow-sm'>
            {/* Top Main Navigation Bar */}
            <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-3 gap-3 md:gap-4 relative z-50'>
                
                {/* Left Cluster: Menu Burger, Logo, Location Picker */}
                <div className='flex items-center justify-between w-full md:w-auto gap-4'>
                    {/* Burger Menu for Mobile Drawer */}
                    <button 
                        onClick={() => setVisible(true)} 
                        className='p-1.5 hover:bg-[#efe9de] rounded-lg md:hidden transition-colors'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-[#141413]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>

                    {/* Logo (Crisp, Elegant Brand Slate/Ink Color) */}
                    <Link to='/' className='flex items-center gap-1.5 p-1 rounded transition-all duration-300 hover:opacity-85 hover:scale-[1.02]'>
                        {/* 4-spoke radial brand glyph asterisk prefix */}
                        {/* <svg className='w-5 h-5 text-[#cc785c] animate-pulse' viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2v20M2 12h20M5 5l14 14M5 19L19 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        </svg> */}
                        <img 
                            src={assets.logo} 
                            className='w-24 sm:w-28' 
                            alt="Trendify Logo" 
                        />
                    </Link>

                    {/* Delivery Location Indicator */}
                    <div 
                        onClick={() => setShowLocationModal(true)} 
                        className='hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-[#efe9de]/50 hover:bg-[#efe9de] hover:border-[#cc785c] border border-[#e6dfd8] rounded-xl cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md'
                        title="Update Delivery Location"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 text-[#cc785c]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <div className='flex flex-col text-left'>
                            <span className='text-[9px] text-[#6c6a64] uppercase tracking-wider font-semibold leading-3'>Deliver to</span>
                            <span className='text-xs font-bold text-[#141413] leading-4 truncate max-w-[100px]'>{locationName}</span>
                        </div>
                    </div>

                    {/* Shopping Cart Shortcut for Mobile (Aligns Right) */}
                    <Link to='/cart' className='flex items-center gap-1 p-2 md:hidden relative hover:text-[#cc785c] transition-colors'>
                        <div className='relative'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6.5 h-6.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.116 60.116 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                            <span className='absolute top-[-5px] right-[-5px] bg-[#cc785c] text-white font-bold text-[10px] rounded-full px-1.5 py-0.2 min-w-[16px] text-center shadow-sm'>
                                {getCartCount()}
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Central Premium Minimalist Search Bar Container */}
                <div className='flex-grow w-full md:max-w-2xl relative'>
                    <form 
                        onSubmit={handleSearchSubmit} 
                        className={`flex items-center bg-[#efe9de] border rounded-full overflow-hidden transition-all duration-300 shadow-inner ${
                            searchFocused ? 'border-[#cc785c] ring-2 ring-[#cc785c]/15' : 'border-[#e6dfd8]'
                        }`}
                    >
                        {/* Category Selector Dropdown */}
                        <div className='relative bg-[#e6dfd8] border-r border-[#e6dfd8]/55 hover:bg-[#efe9de] cursor-pointer h-11 flex items-center px-3 rounded-l-full transition-colors'>
                            <select 
                                value={searchCategory}
                                onChange={(e) => setSearchCategory(e.target.value)}
                                className='bg-transparent text-xs text-[#3d3d3a] font-semibold outline-none cursor-pointer pr-3 appearance-none'
                            >
                                <option value="All">All</option>
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Kids">Kids</option>
                            </select>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-[#6c6a64] pointer-events-none absolute right-2">
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                            </svg>
                        </div>

                        {/* Search Text Input */}
                        <input 
                            type="text" 
                            value={search}
                            onFocus={() => setSearchFocused(true)}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search Trendify collections..." 
                            className='flex-grow h-11 px-4 text-xs sm:text-sm outline-none bg-transparent text-[#141413] placeholder-[#8e8b82]'
                        />

                        {/* Inline Input Clearer button */}
                        {search && (
                            <button 
                                type="button"
                                onClick={() => setSearch("")}
                                className='p-1 text-gray-400 hover:text-[#cc785c] rounded-full mr-1.5 transition-colors focus:outline-none'
                                title="Clear Search"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}

                        {/* Clean Minimalist Search Icon Submit Button */}
                        <button 
                            type="submit" 
                            className='bg-[#cc785c] hover:bg-[#a9583e] h-11 w-14 flex items-center justify-center transition-colors duration-200 focus:outline-none rounded-r-full'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </button>
                    </form>

                    {/* Highly Elegant Search Suggestion & History Dropdown Panel */}
                    {searchFocused && (
                        <div className='absolute top-full left-0 right-0 mt-2 bg-[#faf9f5] border border-[#e6dfd8] rounded-2xl shadow-xl p-4 text-left z-50 animate-fadeIn border-t border-[#e6dfd8]'>
                            {recentSearches.length > 0 && (
                                <div className='mb-4'>
                                    <h4 className='text-[10px] uppercase tracking-widest text-[#6c6a64] font-bold mb-2 flex items-center gap-1'>
                                        <span>🕒</span> Recent Searches
                                    </h4>
                                    <div className='flex flex-col gap-1'>
                                        {recentSearches.map((item, idx) => (
                                            <div 
                                                key={idx} 
                                                onClick={() => { setSearch(item); setSearchFocused(false); navigate('/collection'); addRecentSearch(item); }}
                                                className='flex items-center justify-between py-2 px-2.5 hover:bg-[#efe9de]/70 rounded-lg cursor-pointer transition-colors group'
                                            >
                                                <span className='text-xs sm:text-sm text-[#3d3d3a] font-medium'>{item}</span>
                                                <button 
                                                    onClick={(e) => removeRecentSearch(e, item)}
                                                    className='text-gray-400 hover:text-[#c64545] p-1 rounded-full opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity'
                                                    title="Delete history item"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3 h-3">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            <div>
                                <h4 className='text-[10px] uppercase tracking-widest text-[#6c6a64] font-bold mb-2.5 flex items-center gap-1'>
                                    <span>🔥</span> Trending Searches
                                </h4>
                                <div className='flex flex-wrap gap-2'>
                                    {trendingSearches.map((item, idx) => (
                                        <span 
                                            key={idx}
                                            onClick={() => { setSearch(item); setSearchFocused(false); navigate('/collection'); addRecentSearch(item); }}
                                            className='px-3 py-1.5 bg-[#efe9de] hover:bg-[#cc785c] hover:text-white text-[#3d3d3a] font-sans font-medium text-xs rounded-full cursor-pointer transition-all duration-250 shadow-sm active:scale-95'
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right-Hand Premium Navigation Controls */}
                <div className='hidden md:flex items-center gap-5 text-xs font-semibold text-[#3d3d3a] relative z-50'>

                    {/* Account Flyout Dropdown */}
                    <div className='relative group py-2 cursor-pointer transition-colors'>
                        <div onClick={() => token ? null : navigate('/login')} className='flex flex-col text-left group-hover:text-[#cc785c]'>
                            <span className='text-[10px] text-[#6c6a64] font-normal leading-3'>Hello, {userName}</span>
                            <span className='font-bold flex items-center gap-0.5 leading-4 text-[#141413] group-hover:text-[#cc785c]'>
                                Account & Lists
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-[#6c6a64] group-hover:text-[#cc785c]">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </div>

                        {/* Interactive Flyout Menu Card */}
                        <div className='absolute right-0 top-full pt-1.5 hidden group-hover:block z-50 dropdown-menu animate-fadeIn'>
                            <div className='flex flex-col gap-2.5 px-5 py-4 text-[#3d3d3a] rounded-xl shadow-lg w-44 bg-[#faf9f5] border border-[#e6dfd8]'>
                                <h4 className='text-xs font-bold text-[#141413] border-b border-[#e6dfd8] pb-1.5'>Your Profile</h4>
                                <p onClick={() => navigate('/orders')} className='cursor-pointer text-xs hover:text-[#cc785c] font-medium transition-colors'>Your Orders</p>
                                <p onClick={() => navigate('/wishlist')} className='cursor-pointer text-xs hover:text-[#cc785c] font-medium transition-colors flex items-center justify-between'>
                                    My Wishlist
                                    {wishlist.length > 0 && (
                                        <span className='bg-[#cc785c] text-white rounded-full px-1.5 py-0.2 text-[9px]'>{wishlist.length}</span>
                                    )}
                                </p>
                                {token ? (
                                    <button onClick={logout} className='w-full py-2 mt-2 bg-[#cc785c] hover:bg-[#a9583e] text-white font-bold rounded-lg text-xs text-center shadow-sm transition-all'>
                                        Sign Out
                                    </button>
                                ) : (
                                    <button onClick={() => navigate('/login')} className='w-full py-2 mt-2 bg-[#cc785c] hover:bg-[#a9583e] text-white font-bold rounded-lg text-xs text-center shadow-sm transition-all'>
                                        Sign In
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Wishlist Header Indicator Link */}
                    <div 
                        onClick={() => navigate('/wishlist')}
                        className='flex flex-col text-left py-2 hover:text-[#cc785c] cursor-pointer transition-colors relative'
                        title="View Wishlist"
                    >
                        <div className='flex items-center gap-1 group'>
                            <div className='relative transition-transform group-hover:scale-110 duration-200'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill={wishlist.length > 0 ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={`w-5.5 h-5.5 ${wishlist.length > 0 ? 'text-[#cc785c]' : 'text-[#3d3d3a]'}`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                                {wishlist.length > 0 && (
                                    <span className='absolute top-[-5px] right-[-6px] bg-[#cc785c] text-white font-bold text-[9px] rounded-full px-1 min-w-[14px] text-center leading-3 shadow-sm'>
                                        {wishlist.length}
                                    </span>
                                )}
                            </div>
                            <span className='font-bold text-[#141413] hover:text-[#cc785c]'>Wishlist</span>
                        </div>
                    </div>

                    {/* Shopping Cart Header Link */}
                    <Link 
                        to='/cart' 
                        className='flex items-center gap-1.5 py-1.5 hover:text-[#cc785c] cursor-pointer transition-all relative group'
                    >
                        <div className='relative flex items-end h-7 transition-transform group-hover:scale-105 duration-200'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6.5 h-6.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.116 60.116 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                            <span className='absolute top-[-4px] left-[11px] bg-[#cc785c] text-white font-bold text-[10px] rounded-full px-1.5 min-w-[16px] text-center leading-3.5 shadow-sm'>
                                {getCartCount()}
                            </span>
                        </div>
                        <span className='font-bold text-[#141413] hover:text-[#cc785c]'>Cart</span>
                    </Link>
                </div>
            </div>

            {/* Click backdrop for active Search Suggestion Dropdown closure */}
            {searchFocused && (
                <div 
                    onClick={() => setSearchFocused(false)} 
                    className='fixed inset-0 bg-transparent z-40' 
                />
            )}

            {/* Sub-Header Horizontal Navigation Strip with Translucent Glassmorphism */}
            <div className='bg-[#f5f0e8]/90 backdrop-blur-md border-t border-[#e6dfd8] text-xs font-semibold px-4 py-2 flex items-center justify-between sm:justify-start gap-5 shadow-inner relative z-40'>
                {/* Category Drawer Icon tag */}
                <div 
                    onClick={() => navigate('/collection')}
                    className='flex items-center gap-1 hover:text-[#cc785c] p-1 rounded cursor-pointer transition-colors group'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 text-[#cc785c] transition-transform group-hover:-rotate-90 duration-200">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <span className='font-bold text-[#141413]'>Explore All</span>
                </div>
                {/* Horizontal Active Link List */}
                <nav className='flex items-center gap-5 overflow-x-auto whitespace-nowrap text-[#3d3d3a] font-medium'>
                    <NavLink to='/' className={({isActive}) => `p-1 hover:text-[#cc785c] transition-all relative ${isActive ? 'text-[#cc785c] font-bold border-b-2 border-[#cc785c]' : ''}`}>Home</NavLink>
                    <NavLink to='/collection' className={({isActive}) => `p-1 hover:text-[#cc785c] transition-all relative ${isActive ? 'text-[#cc785c] font-bold border-b-2 border-[#cc785c]' : ''}`}>Shop Collections</NavLink>
                    <NavLink to='/about' className={({isActive}) => `p-1 hover:text-[#cc785c] transition-all relative ${isActive ? 'text-[#cc785c] font-bold border-b-2 border-[#cc785c]' : ''}`}>About</NavLink>
                    <NavLink to='/contact' className={({isActive}) => `p-1 hover:text-[#cc785c] transition-all relative ${isActive ? 'text-[#cc785c] font-bold border-b-2 border-[#cc785c]' : ''}`}>Contact Us</NavLink>
                </nav>
            </div>

            {/* Sidebar Menu Drawer for Mobile */}
            <div className={`fixed top-0 left-0 bottom-0 w-72 bg-[#faf9f5] text-[#141413] transition-transform duration-350 z-50 shadow-2xl border-r border-[#e6dfd8] ${visible ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Mobile Drawer Header */}
                <div className='bg-[#efe9de] border-b border-[#e6dfd8] p-4 flex items-center justify-between shadow-sm'>
                    <div className='flex items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5.5 h-5.5 text-[#cc785c]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className='font-bold text-sm text-[#141413]'>Hello, {userName}</span>
                    </div>
                    <button 
                        onClick={() => setVisible(false)}
                        className='p-1 hover:bg-[#e6dfd8] rounded-full transition-colors'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5 text-[#6c6a64]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {/* Mobile Drawer List */}
                <div className='flex flex-col text-sm py-4'>
                    <span className='px-6 py-2.5 font-bold text-[#6c6a64] text-xs tracking-wider uppercase border-b border-[#e6dfd8]'>Main Sections</span>
                    <NavLink onClick={() => setVisible(false)} className='px-6 py-3 hover:bg-[#efe9de] border-b border-[#e6dfd8]/35 transition-colors' to='/'>Home Catalogue</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='px-6 py-3 hover:bg-[#efe9de] border-b border-[#e6dfd8]/35 transition-colors' to='/collection'>Collections Directory</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='px-6 py-3 hover:bg-[#efe9de] border-b border-[#e6dfd8]/35 transition-colors' to='/wishlist'>My Wishlist ({wishlist.length})</NavLink>
                    
                    <span className='px-6 py-2.5 mt-4 font-bold text-[#6c6a64] text-xs tracking-wider uppercase border-b border-[#e6dfd8]'>Company</span>
                    <NavLink onClick={() => setVisible(false)} className='px-6 py-3 hover:bg-[#efe9de] border-b border-[#e6dfd8]/35 transition-colors' to='/about'>About Our Brand</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='px-6 py-3 hover:bg-[#efe9de] border-b border-[#e6dfd8]/35 transition-colors' to='/contact'>Contact Customer Support</NavLink>
                    {token ? (
                        <p onClick={() => { setVisible(false); logout(); }} className='px-6 py-3 hover:bg-[#efe9de] cursor-pointer font-semibold text-[#c64545] transition-colors'>Sign Out</p>
                    ) : (
                        <NavLink onClick={() => setVisible(false)} className='px-6 py-3 hover:bg-[#efe9de] font-semibold text-[#cc785c] transition-colors' to='/login'>Sign In</NavLink>
                    )}
                </div>
            </div>

            {/* Click backdrop for Sidebar Drawer */}
            {visible && (
                <div 
                    onClick={() => setVisible(false)} 
                    className='fixed inset-0 bg-[#181715]/40 backdrop-blur-sm z-40 transition-opacity duration-300'
                />
            )}

            {/* Interactive Location Update Modal Overlay */}
            {showLocationModal && (
                <div className='fixed inset-0 bg-[#181715]/65 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300 animate-fadeIn'>
                    <div className='bg-[#faf9f5] text-[#141413] rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-[#e6dfd8] relative'>
                        <button 
                            onClick={() => setShowLocationModal(false)}
                            className='absolute top-4 right-4 text-[#6c6a64] hover:text-[#141413] p-1 hover:bg-[#efe9de] rounded-full transition-all'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h3 className='text-lg font-bold text-[#141413] mb-1.5 flex items-center gap-1.5'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5 text-[#cc785c]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            Choose your delivery address
                        </h3>
                        <p className='text-xs text-[#6c6a64] mb-5 leading-normal font-sans font-light'>
                            Delivery options, product availability, and shipping speeds may vary based on your local delivery address.
                        </p>

                        <form onSubmit={handleLocationSubmit} className='space-y-4'>
                            <div>
                                <label className='block text-xs font-semibold text-[#3d3d3a] mb-1'>City Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={cityInput}
                                    onChange={(e) => setCityInput(e.target.value)}
                                    placeholder="e.g. Kanpur"
                                    className='w-full px-3 py-2 bg-[#efe9de]/50 border border-[#e6dfd8] rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#cc785c] text-[#141413]'
                                />
                            </div>
                            <div>
                                <label className='block text-xs font-semibold text-[#3d3d3a] mb-1'>Zip Code / Pin Code (Optional)</label>
                                <input 
                                    type="text" 
                                    value={zipInput}
                                    onChange={(e) => setZipInput(e.target.value)}
                                    placeholder="e.g. 200024"
                                    className='w-full px-3 py-2 bg-[#efe9de]/50 border border-[#e6dfd8] rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#cc785c] text-[#141413]'
                                />
                            </div>
                            <button 
                                type="submit" 
                                className='w-full py-2 bg-[#cc785c] hover:bg-[#a9583e] text-white font-semibold rounded-lg text-sm text-center shadow-md active:scale-98 transition-all uppercase tracking-wider'
                            >
                                Apply Address
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </header>
    )
}

export default NavBar
