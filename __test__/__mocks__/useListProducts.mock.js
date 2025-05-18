export const mockUseListProductsDefault = {
  products: [
    { _id: "1", name: "Coca-Cola", image: "coca.jpg", price: 5 },
    { _id: "2", name: "Guaraná", image: "guarana.jpg", price: 4 },
  ],
  error: false,
  isLoading: false,
};

export const mockUseListProductsLoading = {
  products: [],
  error: false,
  isLoading: true,
};

export const mockUseListProductsError = {
  products: [],
  error: true,
  isLoading: false,
};
