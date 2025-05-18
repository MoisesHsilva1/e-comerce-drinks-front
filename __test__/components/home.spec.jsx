import { describe, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../../src/components/templates/Home";
import useListProducts from "../../src/hooks/useListProducts";

import {
  mockUseListProductsDefault,
  mockUseListProductsError,
  mockUseListProductsLoading,
} from "../__mocks__/useListProducts.mock";

vi.mock("react-router", () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock("../../src/hooks/useListProducts", () => ({
  default: vi.fn(() => mockUseListProductsDefault),
}));


describe("Home component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders products correctly", () => {
    render(<Home />);
    expect(screen.getByText("Coca-Cola")).toBeInTheDocument();
    expect(screen.getByText("Guaraná")).toBeInTheDocument();
  });

  it("displays loading when isLoading is true", () => {
    vi.mocked(useListProducts).mockReturnValueOnce(mockUseListProductsLoading);
    render(<Home />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays error message when error is true", () => {
    vi.mocked(useListProducts).mockReturnValueOnce(mockUseListProductsError);
    render(<Home />);
    expect(screen.getByText("Produtos com erro")).toBeInTheDocument();
  });
});
