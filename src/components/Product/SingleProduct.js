import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useProductsContext } from "../../context/products_context";
import { single_product_url as url } from "../../utils/constants";
import { formatPrice } from "../../utils/helpers";
import { PageHero, Loading, Error } from "../../layouts";
import { ProductImages, Stars, AddToCart } from "../../components";

const SingleProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const {
    fetchSingleProduct,
    singleProduct,
    singleProductLoading: loading,
    singleProductError: error,
  } = useProductsContext();
  const {
    name,
    images,
    stars,
    reviews,
    price,
    description,
    stock,
    id,
    company,
  } = singleProduct;

  useEffect(() => {
    fetchSingleProduct(`${url}${productId}`);
  }, [productId, fetchSingleProduct]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [error, navigate]);

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (singleProduct) {
    return (
      <Wrapper>
        <PageHero title={`${name}`} products />
        <div className="section section-center page">
          <Link to="/products" className="btn">
            Back to Products
          </Link>
          <div className="product-center">
            <ProductImages images={images} />
            <section className="content">
              <h2>{name}</h2>
              <Stars stars={stars} reviews={reviews} />
              <h5 className="price">{formatPrice(price)}</h5>
              <p className="desc">{description}</p>
              <p className="info">
                <span>Available : </span>
                {stock > 0 ? `In Stock (${stock})` : "Out of Stock"}
              </p>
              <p className="info">
                <span>SKU : </span>
                {id}
              </p>
              <p className="info">
                <span>Brand : </span>
                {company}
              </p>
              <hr />
              {stock > 0 && <AddToCart product={singleProduct} />}
            </section>
          </div>
        </div>
      </Wrapper>
    );
  }
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProduct;
