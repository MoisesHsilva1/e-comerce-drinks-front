import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import ProductCartCard from "../../../src/components/UI/molecules/ProductCartCard";
import React from "react";

describe("ProductCartCard Component", () => {
  const mockOnClick = vi.fn();
  const mockQtdDown = vi.fn();
  const mockQtdUp = vi.fn();

  const props = {
    image: "https://via.placeholder.com/150",
    nameProduct: "Test Product",
    qtdProducts: "M",
    price: "49.99",
    qtd: 2,
    qtdDown: mockQtdDown,
    qtdUp: mockQtdUp,
    onClick: mockOnClick,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("should render product image with correct src and alt", () => {
    render(<ProductCartCard {...props} />);
    const img = screen.getByRole("img", { name: /imagem do produto/i });
    expect(img).toHaveAttribute("src", props.image);
    expect(img).toHaveAttribute("alt", "Imagem do Produto");
  });

  it("should display product name, price, and size", () => {
    render(<ProductCartCard {...props} />);
    expect(screen.getByText(props.nameProduct)).toBeInTheDocument();
    expect(screen.getByText(`R$ ${props.price}`)).toBeInTheDocument();
    expect(screen.getByText(`Tamanho: ${props.qtdProducts}`)).toBeInTheDocument();
  });

  it("should render ButtonAmount component with correct count", () => {
    render(<ProductCartCard {...props} />);
    expect(screen.getByText(String(props.qtd))).toBeInTheDocument();
  });

  it("should call onClick handler when 'Remover' button is clicked", () => {
    render(<ProductCartCard {...props} />);
    const removeBtn = screen.getByRole("button", { name: /remover/i });
    fireEvent.click(removeBtn);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
