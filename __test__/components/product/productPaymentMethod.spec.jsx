import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router";
import ProductPaymentMethod from "../../../src/components/templates/product/ProductPaymentMethod";
import useSaveProductPurchase from "../../../src/hooks/useSaveProductPurchase";
import toast from "react-hot-toast";

vi.mock("../../../src/hooks/useSaveProductPurchase");

let locationState = {
  cartItems: [{ id: "1", name: "Coca-Cola", price: 10 }],
  quantities: { 1: 2 },
  total: 20,
  address: "Some address",
  user: { displayName: "John Doe", email: "john@example.com" },
};

vi.mock("react-router-dom", () => ({
  useLocation: () => ({ state: locationState }),
  useNavigate: () => vi.fn(),
}));

vi.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
  Toaster: () => null,
}));

describe("ProductPaymentMethod", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    locationState = {
      cartItems: [{ id: "1", name: "Coca-Cola", price: 10 }],
      quantities: { 1: 2 },
      total: 20,
      address: "Some address",
      user: { displayName: "John Doe", email: "john@example.com" },
    };
  });

  it("shows error if user or address data is missing", async () => {
    locationState.address = null;
    locationState.user = null;

    const saveProductPurchaseMock = vi.fn(() => {
      if (!locationState.user || !locationState.address) {
        toast.error("Dados do usuário ou endereço incompletos.");
        return;
      }
    });

    useSaveProductPurchase.mockReturnValue({
      saveProductPurchase: saveProductPurchaseMock,
      error: null,
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <ProductPaymentMethod />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Finalizar Compra/i }));
  });
});
