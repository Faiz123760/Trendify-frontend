import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { assets } from "../assets/assets";

const Wishlist = () => {
  const { products, wishlist, toggleWishlist, token, navigate } = useContext(ShopContext);
  const [wishlistData, setWishlistData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter((product) => wishlist.includes(product._id));
      setWishlistData(filtered);
    }
  }, [wishlist, products]);

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center border-t">
        <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-slate-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </div>
        <h2 className="text-2xl font-medium text-gray-800 mb-3">Login to view Wishlist</h2>
        <p className="text-gray-500 mb-8 max-w-sm">Keep track of your favorite styles and easily access them anytime by logging into your account.</p>
        <button
          onClick={() => navigate("/login")}
          className="px-8 py-3 text-sm text-white bg-black hover:bg-gray-800 active:bg-gray-700 transition-colors rounded-md"
        >
          LOGIN NOW
        </button>
      </div>
    );
  }

  if (wishlistData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center border-t">
        <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-slate-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-medium text-gray-800 mb-3">Your Wishlist is empty</h2>
        <p className="text-gray-500 mb-8 max-w-sm">Explore our catalog and save your favorite clothing items, styles, and collections for later!</p>
        <button
          onClick={() => navigate("/collection")}
          className="px-8 py-3 text-sm text-white bg-black hover:bg-gray-800 active:bg-gray-700 transition-colors rounded-md"
        >
          EXPLORE CATALOG
        </button>
      </div>
    );
  }

  return (
    <div className="border-t pt-14">
      <div className="mb-8 text-2xl flex items-center gap-2">
        <Title text1={"YOUR"} text2={"WISHLIST"} />
        <span className="text-sm font-light text-gray-500">({wishlistData.length} items)</span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-8">
        {wishlistData.map((item) => (
          <div key={item._id} className="relative group">
            {/* Remove from Wishlist button on top-right of card */}
            <button
              onClick={() => toggleWishlist(item._id)}
              className="absolute top-2 right-2 z-10 p-1.5 bg-white/80 hover:bg-white text-gray-500 hover:text-red-500 rounded-full shadow-sm transition-all duration-200"
              title="Remove from Wishlist"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </button>

            <ProductItem
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
