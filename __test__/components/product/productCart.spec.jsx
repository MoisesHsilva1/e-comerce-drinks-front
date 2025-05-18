import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ProductCart from "../../../src/components/templates/product/ProductCart";
import { CartContext } from "../../../src/context/ProductCartContext";
import useLoggedUser from "../../../src/hooks/useLoggedUser";
import { MemoryRouter, Route, Routes } from "react-router";

vi.mock("../../../src/hooks/useLoggedUser", () => ({
  default: vi.fn(),
}));

const mockNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

beforeAll(() => {
  global.matchMedia =
    global.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      };
    };
});

const cartItemsMock = [
  { id: "1", name: "Product 1", price: 10, size: 5, image: "img1" },
  { id: "2", name: "Product 2", price: 20, size: 3, image: "img2" },
];

const setup = (user = null) => {
  useLoggedUser.mockReturnValue({ user });

  const removeItem = vi.fn();
  const clearCart = vi.fn();

  render(
    <CartContext.Provider
      value={{ cartItems: cartItemsMock, removeItem, clearCart }}
    >
      <MemoryRouter initialEntries={["/cart"]}>
        <Routes>
          <Route path="/cart" element={<ProductCart />} />
        </Routes>
      </MemoryRouter>
    </CartContext.Provider>
  );

  return { removeItem, clearCart };
};

describe("ProductCart Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders cart items with initial quantity 1", () => {
    setup();

    cartItemsMock.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });

    expect(screen.getByText("Comprar")).toBeDisabled();
    expect(screen.getAllByText("1").length).toBeGreaterThanOrEqual(1);
  });

  it("enables buy button when address is filled", () => {
    setup();

    const input = screen.getByPlaceholderText("Digite seu endereço");
    fireEvent.change(input, { target: { value: "123 Main St" } });

    expect(screen.getByText("Comprar")).toBeEnabled();
  });

  it("calculates total price including delivery fee", () => {
    setup();

    const input = screen.getByPlaceholderText("Digite seu endereço");
    fireEvent.change(input, { target: { value: "123 Main St" } });

    const totalText = screen.getByText(/Total:/i).nextSibling.textContent;
    expect(totalText).toContain("40.00");
  });

  it("clears cart on clicking 'Limpar Tudo'", () => {
    const { clearCart } = setup();

    fireEvent.click(screen.getByText("Limpar Tudo"));

    expect(clearCart).toHaveBeenCalled();
  });

  it("redirects to login if user not logged in on checkout", async () => {
    setup(null);

    const input = screen.getByPlaceholderText("Digite seu endereço");
    fireEvent.change(input, { target: { value: "123 Main St" } });

    fireEvent.click(screen.getByText("Comprar"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });

  it("navigates to checkout with state and clears cart when user is logged in", async () => {
    const user = { id: "user1" };
    const { clearCart } = setup(user);

    const input = screen.getByPlaceholderText("Digite seu endereço");
    fireEvent.change(input, { target: { value: "123 Main St" } });

    fireEvent.click(screen.getByText("Comprar"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        "/checkout",
        expect.objectContaining({
          state: expect.objectContaining({
            cartItems: cartItemsMock,
            address: "123 Main St",
            quantities: expect.any(Object),
            user,
            total: expect.any(Number),
          }),
        })
      );

      expect(clearCart).toHaveBeenCalled();
    });
  });
});
