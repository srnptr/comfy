import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./layouts";
import {
  AboutPage,
  AuthWrapper,
  CartPage,
  CheckoutPage,
  ErrorPage,
  HomePage,
  PrivateRoute,
  ProductsPage,
  SingleProductPage,
} from "./pages";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "about", element: <AboutPage /> },
        { path: "cart", element: <CartPage /> },
        {
          path: "checkout",
          element: (
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          ),
        },
        { path: "products", element: <ProductsPage /> },
        { path: "products/:productId", element: <SingleProductPage /> },
        { path: "*", element: <ErrorPage /> },
      ],
    },
  ]);
  return (
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>
  );
}

export default App;
