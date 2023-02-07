import placeholderImg from "../assets/hero-bcg.jpeg";

export const formatPrice = (number) => {
  return new Intl.NumberFormat("en-IT", {
    style: "currency",
    currency: "EUR",
  }).format(number / 100);
};

export const getUniqueValues = (array, key) => {
  let unique = array.map((item) => item[key]);
  if (key === "colors") unique = unique.flat();
  return ["all", ...new Set(unique)];
};

export const onImageError = (e) => {
  e.target.src = placeholderImg;
};
