import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency, wishlist, toggleWishlist } = useContext(ShopContext);
  const isWishlisted = wishlist && wishlist.includes(id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(id);
  };

  return (
    <Link className="text-[#141413] cursor-pointer relative group block select-none" to={`/product/${id}`}>
      {/* Premium Framed Container */}
      <div className="overflow-hidden relative rounded-xl bg-[#efe9de]/50 border border-[#e6dfd8] transition-all duration-300 group-hover:border-[#cc785c] group-hover:shadow-sm">
        <img
          className="transition ease-in-out duration-500 hover:scale-105 w-full object-cover aspect-[4/5] object-top"
          src={image[0]}
          alt={name}
        />
        {/* Wishlist Heart Overlay Icon */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 p-2 rounded-full bg-[#faf9f5]/90 hover:bg-[#faf9f5] border border-[#e6dfd8] text-gray-500 shadow-sm transition-all duration-200 z-10 opacity-100 sm:opacity-0 group-hover:opacity-100 active:scale-90"
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isWishlisted ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className={`w-4 h-4 transition-transform duration-200 ${
              isWishlisted ? "text-[#cc785c] fill-[#cc785c]" : "text-[#6c6a64] hover:text-[#cc785c]"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg> */}
        </button>
      </div>
      
      {/* Product Details */}
      <p className="pt-3 pb-0.5 text-xs sm:text-sm font-sans font-light tracking-tight text-[#3d3d3a] truncate group-hover:text-[#cc785c] transition-colors duration-200">
        {name}
      </p>
      <p className="text-xs sm:text-sm font-sans font-bold text-[#141413]">
        {currency}&nbsp;
        {price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
    </Link>
  );
};

export default ProductItem;
