import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../../../src/components/templates/user/Login";
import useLoginUser from "../../../src/hooks/useLoginUser";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

vi.mock("react-router", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("../../../src/hooks/useLoginUser", () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
  Toaster: () => null,
}));

describe("Login component", () => {
  const mockNavigate = vi.fn();
  const mockLoginUser = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);

    useLoginUser.mockImplementation(({ onSuccess, onError }) => ({
      loginUser: (data) => mockLoginUser(data, { onSuccess, onError }),
      isLoading: false,
    }));
  });

  it("renders inputs and submit button", () => {
    render(<Login />);

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  it("submit button is disabled when inputs are empty", () => {
    render(<Login />);
    const button = screen.getByRole("button", { name: /Login/i });
    expect(button).toBeDisabled();
  });

  it("calls loginUser with correct data on valid submit", async () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Senha/i), {
      target: { value: "Password123" },
    });

    const button = screen.getByRole("button", { name: /Login/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalledWith(
        {
          email: "test@example.com",
          password: "Password123",
        },
        expect.objectContaining({
          onSuccess: expect.any(Function),
          onError: expect.any(Function),
        })
      );
    });
  });

  it("shows success toast and navigates to '/' on successful login", async () => {
    useLoginUser.mockImplementation(({ onSuccess }) => ({
      loginUser: () => onSuccess(),
      isLoading: false,
    }));

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Senha/i), {
      target: { value: "Password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "Login realizado com sucesso!"
      );
    });

    await new Promise((r) => setTimeout(r, 1200));

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("shows error toast on login error", async () => {
    useLoginUser.mockImplementation(({ onError }) => ({
      loginUser: () => onError(),
      isLoading: false,
    }));

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Senha/i), {
      target: { value: "Password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Erro ao fazer login, Tente novamente."
      );
    });
  });

  it("navigates to '/cadastro' when clicking on Inscrever-se", () => {
    render(<Login />);
    const link = screen.getByText(/Inscrever-se/i);
    fireEvent.click(link);
    expect(mockNavigate).toHaveBeenCalledWith("/cadastro");
  });
});
