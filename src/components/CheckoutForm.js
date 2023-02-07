import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useCartContext } from "../context/cart_context";
import { useUserContext } from "../context/user_context";
import { formatPrice } from "../utils/helpers";

const CheckoutForm = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const { cart, totalAmount, shippingFee, clearCart } = useCartContext();
  const { myUser } = useUserContext();
  const navigate = useNavigate();

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const createPaymentIntent = async () => {
    try {
      const { data } = await axios.post(
        "/.netlify/functions/create-payment-intent",
        JSON.stringify({ cart, totalAmount, shippingFee })
      );
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    createPaymentIntent();
    //eslint-disable-next-line
  }, []);

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      setTimeout(() => {
        clearCart();
        navigate("/");
      }, 10000);
    }
  };

  return (
    <div>
      {succeeded ? (
        <Wrapper>
          <h4>Thank you, your payment was successful.</h4>
          <p className="redirect">Redirecting to home page shortly.</p>
        </Wrapper>
      ) : (
        <Wrapper>
          <h4>Hello, {myUser?.nickname}!</h4>
          <p className="total">
            Your total : {formatPrice(totalAmount + shippingFee)}
          </p>
          <p>Test Card Number: 4242 4242 4242 4242</p>
        </Wrapper>
      )}
      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          option={cardStyle}
          onChange={handleChange}
        />
        <button id="submit" disabled={processing || disabled || succeeded}>
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        {/* Show a success message upon completion */}
        <br />
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment succeeded, see the result in your
          <a href={"https://dashboard.stripe.com/test/payments"}>
            Stripe dashboard.
          </a>
          <br />
          Refresh the page to pay again.
        </p>
      </form>
    </div>
  );
};

export default CheckoutForm;

const Wrapper = styled.article`
  text-align: center;
  h4 {
    font-size: 1.9rem;
    text-transform: none;
  }
  .total {
    text-transform: uppercase;
    font-size: 1.2rem;
    letter-spacing: 2px;
    font-weight: bold;
    margin: 0.5rem;
  }
  .redirect {
    font-size: 1.3rem;
    letter-spacing: 3px;
    text-transform: uppercase;
  }
  :first-child {
    text-transform: capitalize;
  }
`;
