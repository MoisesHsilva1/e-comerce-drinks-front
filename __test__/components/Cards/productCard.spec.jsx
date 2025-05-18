import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../../../src/components/UI/molecules/ProductCard";

describe("ProductCard Component", () => {
  const mockOnClick = vi.fn();

  const defaultProps = {
    nameProduct: "Test Product",
    price: "99.99",
    onClick: mockOnClick,
    src: "https://via.placeholder.com/150",
    alt: "Product image",
  };

  it("should render product name and price correctly", () => {
    render(<ProductCard {...defaultProps} />);
    
    expect(screen.getByText(defaultProps.nameProduct)).toBeDefined();
    expect(screen.getByText(`R$ ${defaultProps.price}`)).toBeDefined();
  });

  it("should display product image with correct src and alt attributes", () => {
    render(<ProductCard {...defaultProps} />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", defaultProps.src);
    expect(img).toHaveAttribute("alt", defaultProps.alt);
  });

  it("should call onClick handler when main element is clicked", () => {
    render(<ProductCard {...defaultProps} />);

    const mainElement = screen.getByRole("main");
    fireEvent.click(mainElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should render a Button with '+' text", () => {
    render(<ProductCard {...defaultProps} />);

    const button = screen.getByText("+");
    expect(button).toBeDefined();
  });
});
