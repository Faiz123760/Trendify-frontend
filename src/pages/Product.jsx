import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import axios from 'axios';
import { toast } from 'react-toastify';

const Product = () => {

  const {productId} = useParams();
  const {products, currency, addToCart, backendUrl, wishlist, toggleWishlist, token, navigate} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [loading, setLoading] = useState(true);

  // Reviews and tab states
  const [activeTab, setActiveTab] = useState('description');
  const [ratingInput, setRatingInput] = useState(5);
  const [commentInput, setCommentInput] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      // 1. Try to find the product in local cache first for instant render
      const cachedProduct = products.find((item) => item._id === productId);
      if (cachedProduct) {
        setProductData(cachedProduct);
        setImage(cachedProduct.image[0]);
      }

      // 2. Fetch fresh/complete product details (including reviews, description, and sizes) on demand
      const response = await axios.post(`${backendUrl}/api/product/single`, { productId });
      if (response.data.success && response.data.product) {
        setProductData(response.data.product);
        // Only override image if not set yet, or keep as is to avoid resetting selected image
        if (!image || !cachedProduct) {
          setImage(response.data.product.image[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching single product details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please login to write a review");
      return;
    }
    if (!commentInput.trim()) {
      toast.error("Review comment cannot be empty");
      return;
    }
    try {
      setSubmittingReview(true);
      const response = await axios.post(
        `${backendUrl}/api/product/review`,
        { productId, rating: ratingInput, comment: commentInput },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setProductData(response.data.product); // Immediately update UI
        setCommentInput('');
        setRatingInput(5);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<img key={i} src={assets.star_icon} alt="Star" className="w-3.5 h-3.5" />);
      } else {
        stars.push(<img key={i} src={assets.star_dull_icon} alt="Star" className="w-3.5 h-3.5" />);
      }
    }
    return stars;
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className='pt-10 transition-opacity duration-500 ease-in border-t-2 opacity-100'>
      {/* Product Data */}
      <div className='flex flex-col gap-12 sm:gap-12 sm:flex-row'>
        {/* Product Images */}
        <div className='flex flex-col-reverse flex-1 gap-3 sm:flex-row'>
          <div className='flex justify-between overflow-x-auto sm:flex-col sm:overflow-y-scroll sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img 
                  src={item} 
                  key={index}
                  onClick={() => setImage(item)} 
                  className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ${
                    image === item ? 'border-2 border-gray-600 py-2 px-2' : ''
                  }`} 
                  alt="Photo" 
                />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto rounded-lg shadow-sm' alt="Photo" />
          </div>
        </div>
        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='mt-2 text-2xl font-medium'>{productData.name}</h1>
          
          {/* Dynamic Rating Stars */}
          <div className='flex items-center gap-1 mt-2'>
            {renderStars(productData.rating || 0)}
            <p className='pl-2 text-sm text-gray-500'>
              ({productData.reviews ? productData.reviews.length : 0} reviews)
            </p>
          </div>
          
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5 leading-relaxed'>{productData.description}</p>
          
          <div className='flex flex-col gap-4 my-8'>
            <p className='font-medium text-gray-800'>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button 
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 rounded-md transition-all ${item === size ? 'border-orange-500 bg-orange-50 font-medium text-orange-600 shadow-sm' : 'hover:bg-gray-200'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          
          {/* Add to Cart & Wishlist inline controls */}
          <div className='flex items-center gap-4 my-8'>
            <button 
              onClick={() => addToCart(productData._id, size)} 
              className='px-8 py-3 text-sm text-white bg-black active:bg-gray-700 hover:bg-gray-800 transition-colors shadow-sm'
            >
              ADD TO CART
            </button>
            <button
              onClick={() => toggleWishlist(productData._id)}
              className='p-3 border rounded-md hover:bg-gray-50 active:scale-95 transition-all shadow-sm'
              title={wishlist && wishlist.includes(productData._id) ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill={wishlist && wishlist.includes(productData._id) ? "currentColor" : "none"} 
                viewBox="0 0 24 24" 
                strokeWidth="1.5" 
                stroke="currentColor" 
                className={`w-5 h-5 transition-transform ${wishlist && wishlist.includes(productData._id) ? "text-red-500 fill-red-500 scale-110" : "text-gray-600"}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
          </div>
          
          <hr className='mt-8 sm:w-4/5' />
          <div className='flex flex-col gap-1.5 mt-5 text-sm text-gray-500'>
            <p>Guaranteed 100% Authentic – Shop with Confidence!</p>
            <p>Enjoy Cash on Delivery – Pay at Your Doorstep!</p>
            <p>Hassle-Free Returns & Exchanges – 10 Days, No Questions Asked!</p>
          </div>
        </div>
      </div>
      
      {/* Description and Review Section */}
      <div className='mt-20'>
        <div className='flex'>
          <button 
            onClick={() => setActiveTab('description')} 
            className={`px-5 py-3 text-sm border font-medium ${activeTab === 'description' ? 'bg-white border-b-white font-semibold text-black' : 'bg-gray-50 text-gray-500'}`}
          >
            Description
          </button>
          <button 
            onClick={() => setActiveTab('reviews')} 
            className={`px-5 py-3 text-sm border font-medium ${activeTab === 'reviews' ? 'bg-white border-b-white font-semibold text-black' : 'bg-gray-50 text-gray-500'}`}
          >
            Reviews ({productData.reviews ? productData.reviews.length : 0})
          </button>
        </div>
        
        <div className='flex flex-col gap-6 px-6 py-6 text-sm text-gray-600 border bg-white rounded-b-lg shadow-sm'>
          {activeTab === 'description' ? (
            <div className='leading-relaxed space-y-4'>
              <p>{productData.description}</p>
              <p>Elevate your style with our meticulously crafted Trendify quality products. Designed with a perfect balance of elegance and practicality, these clothing items are made from premium materials that ensure both durability and comfort.</p>
              <p>Whether you're dressing up for a special occasion or adding a touch of sophistication to your everyday look, this product offers unparalleled versatility. Its timeless design, coupled with a flawless fit, makes it a must-have addition to any wardrobe.</p>
            </div>
          ) : (
            <div className='space-y-8'>
              {/* Add Review Form */}
              <div className='p-5 border rounded-lg bg-gray-50'>
                <h3 className='text-base font-semibold text-gray-800 mb-4'>Write a Customer Review</h3>
                {token ? (
                  <form onSubmit={handleAddReview} className='space-y-4'>
                    <div className='flex items-center gap-3'>
                      <span className='font-medium text-gray-700'>Your Rating:</span>
                      <div className='flex gap-1'>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type='button'
                            onClick={() => setRatingInput(star)}
                            className='transition-transform active:scale-125'
                          >
                            <img 
                              src={star <= ratingInput ? assets.star_icon : assets.star_dull_icon} 
                              alt={`${star} Star`} 
                              className='w-5 h-5 cursor-pointer' 
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <textarea
                        rows={4}
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder='Share your thoughts about this product...'
                        className='w-full p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-black bg-white'
                        required
                      />
                    </div>
                    <button
                      type='submit'
                      disabled={submittingReview}
                      className='px-6 py-2.5 text-sm text-white bg-black hover:bg-gray-800 rounded transition-colors disabled:opacity-50'
                    >
                      {submittingReview ? "Submitting..." : "Submit Review"}
                    </button>
                  </form>
                ) : (
                  <p className='text-gray-500'>
                    Please{" "}
                    <button 
                      onClick={() => navigate('/login')} 
                      className='text-black font-semibold underline hover:text-gray-800'
                    >
                      login
                    </button>{" "}
                    to share your experience and write a review.
                  </p>
                )}
              </div>

              {/* Reviews List */}
              <div className='space-y-6'>
                <h3 className='text-base font-semibold text-gray-800 border-b pb-2'>Customer Reviews</h3>
                {productData.reviews && productData.reviews.length > 0 ? (
                  <div className='divide-y divide-gray-100'>
                    {productData.reviews.map((review, index) => (
                      <div key={index} className='py-4 space-y-2 first:pt-0'>
                        <div className='flex items-center justify-between'>
                          <span className='font-semibold text-gray-800'>{review.name}</span>
                          <span className='text-xs text-gray-400'>
                            {new Date(review.date).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className='flex gap-1'>
                          {renderStars(review.rating)}
                        </div>
                        <p className='text-gray-600 leading-relaxed'>{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className='text-gray-500 py-4 text-center'>No reviews yet. Be the first to review this product!</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Display Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
