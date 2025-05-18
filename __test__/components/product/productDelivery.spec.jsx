import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import ProductDelivery from "../../../src/components/templates/product/ProductDelivery";
import * as useListProductsPurchasesModule from "../../../src/hooks/useListProductsPurchases";

vi.mock("../../../src/hooks/useListProductsPurchases");

describe("ProductDelivery Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading message when loading", () => {
    vi.spyOn(useListProductsPurchasesModule, "default").mockReturnValue({
      productsPurchases: [],
      error: null,
      isLoading: true,
    });

    render(<ProductDelivery />);
    expect(screen.getByText(/carregando entregas.../i)).toBeInTheDocument();
  });

  it("shows error message when error occurs", () => {
    vi.spyOn(useListProductsPurchasesModule, "default").mockReturnValue({
      productsPurchases: [],
      error: true,
      isLoading: false,
    });

    render(<ProductDelivery />);
    expect(screen.getByText(/erro ao carregar entregas/i)).toBeInTheDocument();
  });

  it("renders product delivery cards when data is loaded", () => {
    vi.spyOn(useListProductsPurchasesModule, "default").mockReturnValue({
      productsPurchases: [
        {
          _id: "1",
          user: { name: "John Doe", email: "john@example.com" },
          delivery: "123 Main St",
          drink: [
            { name: "Coke", quantity: 2 },
            { name: "Pepsi", quantity: 1 },
          ],
        },
        {
          _id: "2",
          user: { name: "Jane Smith", email: "jane@example.com" },
          delivery: "456 Elm St",
          drink: [{ name: "Fanta", quantity: 3 }],
        },
      ],
      error: null,
      isLoading: false,
    });

    render(<ProductDelivery />);

    expect(screen.getByText(/entregas de produtos/i)).toBeInTheDocument();
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/jane smith/i)).toBeInTheDocument();
  });
});
