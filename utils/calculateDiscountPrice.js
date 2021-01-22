export const calculateDiscountPrice = (price, salePrice) => {
  return `${Math.round(((price - salePrice) / price) * 100)} %`;
};
