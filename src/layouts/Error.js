import React, { useEffect } from "react";
const Error = ({
  message = "There was a problem while loading the products.",
}) => {
  useEffect(() => {
    setTimeout(() => {
      window.location.replace("/");
    }, 3000);
  }, []);

  return (
    <div className="section section-center text-center">
      <h2 style={{ textTransform: "none" }}>{message}</h2>
    </div>
  );
};

export default Error;
