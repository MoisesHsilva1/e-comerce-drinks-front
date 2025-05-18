import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import EditAccount from "../../../src/components/templates/user/EditAccount";
import useLogOutUser from "../../../src/hooks/useLogOutUser";
import useLoggedUser from "../../../src/hooks/useLoggedUser";

vi.mock("../../../src/hooks/useLoggedUser");
vi.mock("../../../src/hooks/useLogOutUser");

const mockedUseLoggedUser = vi.mocked(useLoggedUser);
const mockedUseLogOutUser = vi.mocked(useLogOutUser);

describe("EditAccount Component", () => {
  it("renders user data and logout button", () => {
    const mockLogout = vi.fn();
    const mockUser = {
      displayName: "Jane Doe",
      name: "Jane",
      email: "jane@example.com",
    };

    mockedUseLoggedUser.mockReturnValue({
      user: mockUser,
      isLoading: false,
      error: null,
    });
    mockedUseLogOutUser.mockReturnValue({ logout: mockLogout });

    render(<EditAccount />);

    expect(screen.getByText(/Conta/i)).toBeInTheDocument();
    expect(screen.getByText(/Nome:/i)).toHaveTextContent("Nome:");
    expect(screen.getByText(/Jane\sDoe/i)).toHaveTextContent("Jane Doe");
    expect(screen.getByText(/email:/i)).toHaveTextContent("Email");

    const button = screen.getByRole("button", { name: /sair/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockLogout).toHaveBeenCalled();
  });
});
