import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductDeliveryCard from "../../../src/components/UI/molecules/ProductDeliveryCard";

describe("ProductDeliveryCard Component", () => {
  const props = {
    nameUser: "John Doe",
    telphoneUser: "john@example.com",
    addressUser: "123 Main St, City",
    order: "12345",
    nameProduct: "Awesome Product",
    productSize: "Large",
  };

  it("should render the order number correctly", () => {
    render(<ProductDeliveryCard {...props} />);
    expect(screen.getByText(/Pedido:/)).toBeDefined();
    expect(screen.getByText(props.order)).toBeDefined();
  });

  it("should display buyer information", () => {
    render(<ProductDeliveryCard {...props} />);
    expect(screen.getByText(/Informações do comprador/)).toBeDefined();
    expect(screen.getByText(new RegExp(props.nameUser))).toBeDefined();
    expect(screen.getByText(new RegExp(props.telphoneUser))).toBeDefined();
  });

  it("should display product details", () => {
    render(<ProductDeliveryCard {...props} />);
    expect(screen.getByText(/Produto/)).toBeDefined();
    expect(screen.getByText(new RegExp(props.nameProduct))).toBeDefined();
    expect(screen.getByText(new RegExp(props.productSize))).toBeDefined();
  });

  it("should show delivery information", () => {
    render(<ProductDeliveryCard {...props} />);
    expect(screen.getByText(/Informações sobre entrega/)).toBeDefined();
    expect(screen.getByText(new RegExp(props.addressUser))).toBeDefined();
  });
});
