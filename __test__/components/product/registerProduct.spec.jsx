import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import RegisterProduct from "../../../src/components/templates/product/RegisterProduct";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useCreateProduct from "../../../src/hooks/useCreateProduct";

vi.mock("react-hot-toast", () => {
  const successMock = vi.fn();
  const errorMock = vi.fn();

  return {
    __esModule: true,
    default: {
      success: successMock,
      error: errorMock,
    },
    Toaster: () => <div data-testid="toaster" />,
  };
});

vi.mock("../../../src/components/UI/atoms/inputs/Input", () => ({
  default: ({ label, name, value, onChange, ...rest }) => (
    <label>
      {label}
      <input name={name} value={value} onChange={onChange} {...rest} />
    </label>
  ),
}));

vi.mock("../../../src/components/UI/atoms/inputs/InputImage", () => ({
  default: ({ onChange }) => (
    <input
      type="file"
      onChange={(e) => onChange(e.target.files[0])}
      data-testid="input-image"
    />
  ),
}));

vi.mock("../../../src/components/UI/atoms/buttons/Button", () => ({
  default: ({ children, ...props }) => <button {...props}>{children}</button>,
}));

vi.mock("../../../src/hooks/useCreateProduct");

function renderWithClient(ui) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe("RegisterProduct", () => {
  const createProductMock = vi.fn();

  beforeEach(() => {
    createProductMock.mockClear();

    useCreateProduct.mockReturnValue({
      createProduct: createProductMock,
    });
  });

  it("should render all fields", () => {
    renderWithClient(<RegisterProduct />);
    expect(screen.getByText("Nome do produto")).toBeDefined();
    expect(screen.getByText("Descrição do produto")).toBeDefined();
    expect(screen.getByText("Quantidade (tamanho medio)")).toBeDefined();
    expect(screen.getByText("Quantidade (tamanho grande)")).toBeDefined();
    expect(screen.getByText("Quantidade (tamanho pequeno)")).toBeDefined();
    expect(screen.getByText("Preço do produto")).toBeDefined();
    expect(screen.getByTestId("input-image")).toBeDefined();
    expect(screen.getByRole("button", { name: /cadastrar/i })).toBeDefined();
  });

  it("should fill and submit form successfully", () => {
    renderWithClient(<RegisterProduct />);

    fireEvent.change(screen.getByLabelText(/nome do produto/i), {
      target: { value: "Produto Teste", name: "name" },
    });
    fireEvent.change(screen.getByLabelText(/descrição do produto/i), {
      target: { value: "Descrição", name: "description" },
    });
    fireEvent.change(screen.getByLabelText(/tamanho medio/i), {
      target: { value: "500", name: "qtd.m" },
    });
    fireEvent.change(screen.getByLabelText(/tamanho grande/i), {
      target: { value: "1000", name: "qtd.g" },
    });
    fireEvent.change(screen.getByLabelText(/tamanho pequeno/i), {
      target: { value: "1500", name: "qtd.p" },
    });
    fireEvent.change(screen.getByLabelText(/preço do produto/i), {
      target: { value: "49.99", name: "price" },
    });

    const file = new File(["image-content"], "product.jpg", {
      type: "image/jpeg",
    });
    fireEvent.change(screen.getByTestId("input-image"), {
      target: { files: [file] },
    });

    fireEvent.click(screen.getByRole("button", { name: /cadastrar/i }));

    expect(createProductMock).toHaveBeenCalledWith({
      name: "Produto Teste",
      description: "Descrição",
      price: "49.99",
      qtd: {
        m: 500,
        g: 1000,
        p: 1500,
      },
      image: file,
    });
  });
});
