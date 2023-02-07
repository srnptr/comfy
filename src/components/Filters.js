import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";

const Filters = () => {
  const {
    products,
    filters: {
      search,
      category,
      company,
      color,
      minPrice,
      maxPrice,
      price,
      shipping,
    },
    updateFilter,
    clearFilters,
  } = useFilterContext();

  const categories = getUniqueValues(products, "category").map(
    (unique, index) => (
      <button
        key={index}
        className={category === unique.toLowerCase() ? "active" : null}
        type="button"
        name="category"
        value={unique}
        onClick={updateFilter}
      >
        {unique}
      </button>
    )
  );

  const companies = getUniqueValues(products, "company").map(
    (unique, index) => (
      <option key={index} name="company" value={unique}>
        {unique}
      </option>
    )
  );

  const colors = getUniqueValues(products, "colors").map((unique, index) => {
    if (unique === "all") {
      return (
        <button
          key={index}
          className={color === unique ? "all-btn active" : "all-btn"}
          name="color"
          data-color={unique}
          value={unique}
          onClick={updateFilter}
        >
          All
        </button>
      );
    }
    return (
      <button
        key={index}
        className={color === unique ? "color-btn active" : "color-btn"}
        name="color"
        data-color={unique}
        style={{ background: unique }}
        value={unique}
        onClick={updateFilter}
      >
        {color === unique && <FaCheck />}
      </button>
    );
  });

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search */}
          <div className="form-control">
            <input
              className="search-input"
              type="text"
              name="search"
              placeholder="search"
              value={search}
              onChange={updateFilter}
            />
          </div>
          {/* category */}
          <div className="form-control">
            <h5>Category</h5>
            <div>{categories}</div>
          </div>
          {/* company */}
          <div className="form-control">
            <h5>Company</h5>
            <select
              className="company"
              name="company"
              value={company}
              onChange={updateFilter}
            >
              {companies}
            </select>
          </div>
          {/* colors */}
          <div className="form-control">
            <h5>Colors</h5>
            <div className="colors">{colors}</div>
          </div>
          {/* price */}
          <div className="form-control">
            <h5>Price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              min={minPrice}
              max={maxPrice}
              value={price}
              onChange={updateFilter}
            />
          </div>
          {/* shipping */}
          <div className="form-control shipping">
            <label htmlFor="shipping">Free Shipping</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              checked={shipping}
              onChange={updateFilter}
            />
          </div>
        </form>
        <button type="button" className="clear-btn" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
    outline: transparent;
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.3;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.7;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
