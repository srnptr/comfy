import React from "react";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";
import { PageHero } from "../layouts";
import { StripeCheckout } from "../layouts";

const CheckoutPage = () => {
  const { cart } = useCartContext();

  return (
    <main>
      <PageHero title="checkout" />
      <Wrapper className="page-100">
        {cart.length < 1 ? (
          <div className="empty">
            <h2>Your cart is empty.</h2>
            <Link to="/products" className="btn">
              Fill It
            </Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  .empty {
    text-align: center;
    h2 {
      margin-top: 3rem;
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;

export default CheckoutPage;
