import React from "react";
import { useFilterContext } from "../../context/filter_context";
import { GridView, ListView } from "../../layouts";

const ProductList = () => {
  const { filteredProducts, gridView } = useFilterContext();

  if (filteredProducts.length < 1)
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry, no products matched your search...
      </h5>
    );
  if (!gridView) return <ListView products={filteredProducts} />;
  return <GridView products={filteredProducts} />;
};

export default ProductList;
