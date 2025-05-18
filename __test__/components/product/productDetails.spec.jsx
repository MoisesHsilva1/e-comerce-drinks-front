import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router";
import ProductDetails from "../../../src/components/templates/product/ProductDetails";
import { CartContext } from "../../../src/context/ProductCartContext";
import useFindProductsByID from "../../../src/hooks/useFindProductsByID";
import toast from "react-hot-toast";

vi.mock("../../../src/hooks/useFindProductsByID", () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    error: vi.fn(),
  },
  Toaster: () => null,
}));

const mockNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: "123" }),
  };
});

const addItemMock = vi.fn();

const productsMock = [
  {
    _id: "1",
    name: "Product 1",
    description: "Desc 1",
    qtd: 3,
    image: "img1.png",
    price: 10,
  },
  {
    _id: "2",
    name: "Product 2",
    description: "Desc 2",
    qtd: 2,
    image: "img2.png",
    price: 20,
  },
];

describe("ProductDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function setup(useFindReturn) {
    useFindProductsByID.mockReturnValue(useFindReturn);

    return render(
      <CartContext.Provider value={{ addItem: addItemMock }}>
        <MemoryRouter initialEntries={["/product/123"]}>
          <Routes>
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </MemoryRouter>
      </CartContext.Provider>
    );
  }

  it("shows loading state", () => {
    setup({ products: null, isLoading: true, error: null });
    expect(screen.getByText(/Carregando.../i)).toBeDefined();
  });

  it("shows error state", () => {
    setup({ products: null, isLoading: false, error: true });
    expect(screen.getByText(/Erro ao carregar o produto./i)).toBeDefined();
  });

  it("renders product cards", () => {
    setup({ products: productsMock, isLoading: false, error: null });
    productsMock.forEach((product) => {
      expect(screen.getByText(product.name)).toBeDefined();
      expect(screen.getByText(product.description)).toBeDefined();
    });
  });

  it("disables add to cart button initially", () => {
    setup({ products: productsMock, isLoading: false, error: null });
    const buttons = screen.getAllByRole("button", {
      name: /adicionar ao carrinho/i,
    });
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });

  it("navigates back when back button clicked", () => {
    setup({ products: productsMock, isLoading: false, error: null });
    const backButton = screen.getByText(/Voltar/i);
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
