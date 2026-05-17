import { createContext, useEffect, useState, useCallback } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [wishlist, setWishlist] = useState([]);
  const [searchCategory, setSearchCategory] = useState('All');
  const navigate = useNavigate();

  const currency = "₹";
  const delivery_fee = 99;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    // INFO: Load cart items from localStorage when the component mounts
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  useEffect(() => {
    // INFO: Save cart items to localStorage whenever cartItems changes
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please Select a Size");
      return;
    } else {
      toast.success("Item Added To The Cart");
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
    if(token){
      try{
        await axios.post(backendUrl + '/api/cart/add', {itemId,size},{headers:{token}})
      }catch(error){
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const toggleWishlist = async (productId) => {
    if (!token) {
      toast.error("Please Login First to Add to Wishlist");
      return;
    }
    try {
      const response = await axios.post(backendUrl + '/api/wishlist/toggle', { productId }, { headers: { token } });
      if (response.data.success) {
        setWishlist(response.data.wishlist);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          // INFO: Error Handling
          console.error(error);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    if (quantity === 0) {
      // const productData = products.find((product) => product._id === itemId);
      toast.success("Item Removed From The Cart");
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId] && cartData[itemId][size] !== undefined) {
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);

    if(token){
      try {
        await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.error(error);
          // toast.error("Error calculating cart amount");
        }
      }
    }
    return totalAmount;
  };

  
  const getProductsData = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        // Dynamic pricing multiplier for realistic premium Indian Rupee catalog pricing
        const scaledProducts = response.data.products.map(p => ({
          ...p,
          price: Math.round(p.price * 12.5)
        }));
        setProducts(scaledProducts);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }, [backendUrl]);

  const getUserCart = async (token)=>{
    try {
      const response = await axios.post(backendUrl+'/api/cart/get',{}, { headers: { token } });
      if (response.data.success) {
        setCartItems(response.data.cartItems);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  const getUserWishlist = async (token)=>{
    try {
      const response = await axios.post(backendUrl+'/api/wishlist/get',{}, { headers: { token } });
      if (response.data.success) {
        setWishlist(response.data.wishlist);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) setCartItems(storedCartItems);
    getProductsData();
  }, [getProductsData]);

  useEffect(() => {
    if(token) {
      getUserCart(token);
      getUserWishlist(token);
    } else {
      setWishlist([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[token]);

  const value = {
  
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    setCartItems,
    wishlist,
    toggleWishlist,
    searchCategory,
    setSearchCategory
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
