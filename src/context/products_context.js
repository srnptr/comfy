import React, { useCallback, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducers/products_reducer";
import { products_url as url } from "../utils/constants";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../reducers/actions";

const initialState = {
  showSidebar: false,
  products: [],
  productsLoading: false,
  productsError: false,
  featuredProducts: [],
  singleProduct: {},
  singleProductLoading: false,
  singleProductError: false,
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  useEffect(() => {
    const fetchProducts = async (url) => {
      dispatch({ type: GET_PRODUCTS_BEGIN });
      try {
        const response = await axios(url);
        const products = response.data;
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
      } catch (error) {
        dispatch({ type: GET_PRODUCTS_ERROR });
      }
    };
    fetchProducts(url);
  }, []);

  const fetchSingleProduct = useCallback(async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await axios(url);
      const singleProduct = response.data;
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  }, []);

  return (
    <ProductsContext.Provider
      value={{ ...state, openSidebar, closeSidebar, fetchSingleProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
