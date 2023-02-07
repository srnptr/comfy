import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import { useProductsContext } from "./products_context";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../reducers/actions";

const initialState = {
  products: [],
  filteredProducts: [],
  gridView: true,
  sort: "name-a",
  filters: {
    search: "",
    category: "all",
    company: "all",
    color: "all",
    minPrice: 0,
    maxPrice: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products } = useProductsContext();

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const updateSort = (event) => {
    dispatch({ type: UPDATE_SORT, payload: event.target.value });
  };

  const updateFilter = (event) => {
    let value = event.target.value;
    const name = event.target.name;
    if (name === "category") {
      value = event.target.textContent;
    }
    if (name === "colors") {
      value = event.target.dataset.color;
    }
    if (name === "price") {
      value = +event.target.value;
    }
    if (name === "shipping") {
      value = event.target.checked;
    }
    dispatch({
      type: UPDATE_FILTERS,
      payload: { name, value },
    });
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS});
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilter,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
