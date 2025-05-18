import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import ProductDetailsCard from "../../../src/components/UI/molecules/ProductDetailsCard";

describe("ProductDetailsCard Component", () => {
  const mockOnChange = vi.fn();
  const mockOnClick = vi.fn();

  const props = {
    nameProduct: "Test Product",
    description: "This is a test product",
    size: { s: 100, m: 200, l: 300 },
    price: "59.99",
    onChange: mockOnChange,
    checked: "m",
    name: "product-size",
    src: "https://via.placeholder.com/300",
    onClick: mockOnClick,
    disabled: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("should render product name, description and image", () => {
    render(<ProductDetailsCard {...props} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      props.nameProduct
    );
    expect(screen.getByText(props.description)).toBeInTheDocument();
    const img = screen.getByRole("img", { name: /imagem do produto/i });
    expect(img).toHaveAttribute("src", props.src);
  });

  it("should render all size options with correct labels and check the selected one", () => {
    render(<ProductDetailsCard {...props} />);
    Object.entries(props.size).forEach(([key, val]) => {
      const optionLabel = `${key.toUpperCase()}: ${val}ml`;
      expect(screen.getByText(optionLabel)).toBeInTheDocument();
    });
    const checkedOption = screen.getByText(
      `${props.checked.toUpperCase()}: ${props.size[props.checked]}ml`
    );
    expect(checkedOption).toBeInTheDocument();
  });

  it("should call onChange handler when a size option is clicked", () => {
    render(<ProductDetailsCard {...props} />);
    const sizeKeys = Object.keys(props.size).filter(
      (key) => key !== props.checked
    );
    const optionLabel = `${sizeKeys[0].toUpperCase()}: ${
      props.size[sizeKeys[0]]
    }ml`;
    const option = screen.getByText(optionLabel);
    fireEvent.click(option);
    expect(mockOnChange).toHaveBeenCalledWith(sizeKeys[0]);
  });

  it("should render the price and the Add to Cart button", () => {
    render(<ProductDetailsCard {...props} />);
    expect(screen.getByText(`R$ ${props.price}`)).toBeInTheDocument();
    const button = screen.getByRole("button", {
      name: /adicionar ao carrinho/i,
    });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it("should disable the Add to Cart button if disabled prop is true", () => {
    render(<ProductDetailsCard {...props} disabled={true} />);
    const button = screen.getByRole("button", {
      name: /adicionar ao carrinho/i,
    });
    expect(button).toBeDisabled();
  });

  it("should call onClick handler when Add to Cart button is clicked", () => {
    render(<ProductDetailsCard {...props} />);
    const button = screen.getByRole("button", {
      name: /adicionar ao carrinho/i,
    });
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
