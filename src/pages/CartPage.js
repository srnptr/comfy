import React from "react";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";
import { CartContent } from "../components";
import { PageHero } from "../layouts";

const CartPage = () => {
  const { cart } = useCartContext();
  if (cart.length < 1) {
    return (
      <Wrapper>
          <PageHero title="cart" />
        <div className="page-100">
          <div className="empty">
            <h2>Your cart is empty.</h2>
            <Link to="/products" className="btn">
              Fill It
            </Link>
          </div>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper className="page">
      <PageHero title="cart" />
      <CartContent />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-top: 3rem;
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;
export default CartPage;
