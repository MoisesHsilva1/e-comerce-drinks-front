import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router";
import ProductSearchResult from "../../../src/components/templates/product/ProductSearchResult";

vi.mock("../../../src/hooks/useFindProductByName", () => ({
  default: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useParams: () => ({ name: "cola" }),
  };
});

import useFindProductsByName from "../../../src/hooks/useFindProductByName";

describe("ProductSearchResult", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays loading state", () => {
    useFindProductsByName.mockReturnValue({
      products: [],
      isLoading: true,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={["/search/cola"]}>
        <Routes>
          <Route path="/search/:name" element={<ProductSearchResult />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Carregando/i)).toBeInTheDocument();
  });

  it("displays error state", () => {
    useFindProductsByName.mockReturnValue({
      products: [],
      isLoading: false,
      error: true,
    });

    render(
      <MemoryRouter initialEntries={["/search/cola"]}>
        <Routes>
          <Route path="/search/:name" element={<ProductSearchResult />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/erro ao buscar/i)).toBeInTheDocument();
  });

  it("displays list of products", async () => {
    useFindProductsByName.mockReturnValue({
      products: [
        {
          _id: "1",
          name: "Coca-Cola",
          image: "coca.png",
          price: 10,
        },
      ],
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={["/search/cola"]}>
        <Routes>
          <Route path="/search/:name" element={<ProductSearchResult />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Coca-Cola")).toBeInTheDocument();
    });
  });
});
