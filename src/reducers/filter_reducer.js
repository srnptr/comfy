import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "./actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    const maxPrice = Math.max(...action.payload.map((p) => p.price));
    return {
      ...state,
      products: [...action.payload],
      filteredProducts: [...action.payload],
      filters: {
        ...state.filters,
        maxPrice,
        price: maxPrice,
      },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, gridView: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, gridView: false };
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filteredProducts } = state;
    let sortedProducts = [...filteredProducts];
    if (sort === "price-lowest") {
      sortedProducts.sort((a, b) => a.price - b.price);
      return { ...state, filteredProducts: sortedProducts };
    }
    if (sort === "price-highest") {
      sortedProducts.sort((a, b) => b.price - a.price);
      return { ...state, filteredProducts: sortedProducts };
    }
    if (sort === "name-a") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      return { ...state, filteredProducts: sortedProducts };
    }
    if (sort === "name-z") {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      return { ...state, filteredProducts: sortedProducts };
    }
    return { ...state, filteredProducts: sortedProducts };
  }
  if (action.type === UPDATE_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        [action.payload.name]: action.payload.value,
      },
    };
  }
  if (action.type === FILTER_PRODUCTS) {
    let filteredProducts = [...state.products];
    const { search, category, company, color, price, shipping } = state.filters;

    if (search) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }
    if (company !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.company.toLowerCase() === company.toLowerCase()
      );
    }
    if (color !== "all") {
      filteredProducts = filteredProducts.filter((product) =>
        product.colors.find((c) => c === color)
      );
    }
    if (shipping) {
      filteredProducts = filteredProducts.filter(
        (product) => product.shipping === true
      );
    }
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= price
    );
    return { ...state, filteredProducts };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        search: "",
        category: "all",
        company: "all",
        color: "all",
        price: state.filters.maxPrice,
        shipping: false,
      },
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
