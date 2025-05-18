import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "../../../src/components/templates/user/Register";
import userRegisterUser from "../../../src/hooks/useRegisterUser";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

vi.mock("react-router", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("../../../src/hooks/useRegisterUser", () => ({
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

describe("Register component", () => {
  const mockNavigate = vi.fn();
  const mockRegisterUser = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);

    userRegisterUser.mockImplementation(({ onSuccess, onError }) => ({
      registerUser: (data) => mockRegisterUser(data, { onSuccess, onError }),
      isLoading: false,
      isError: false,
    }));
  });

  it("renders inputs and button", () => {
    render(<Register />);
    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Senha/i)).toHaveLength(2);
    expect(
      screen.getByRole("button", { name: /Cadastrar/i })
    ).toBeInTheDocument();
  });

  it("submit button is disabled with empty inputs", () => {
    render(<Register />);
    expect(screen.getByRole("button", { name: /Cadastrar/i })).toBeDisabled();
  });

  it("shows error toast if passwords do not match", () => {
    render(<Register />);
    fireEvent.change(screen.getByLabelText(/Nome/i), {
      target: { value: "João" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "joao@email.com" },
    });
    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "Abc123!@" },
    });
    fireEvent.change(screen.getByLabelText("Confirmar senha"), {
      target: { value: "Abc123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    expect(toast.error).toHaveBeenCalledWith("As senhas não coincidem.");
  });

  it("shows error toast if password is weak", () => {
    render(<Register />);
    fireEvent.change(screen.getByLabelText(/Nome/i), {
      target: { value: "João" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "joao@email.com" },
    });
    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "12345678" },
    });
    fireEvent.change(screen.getByLabelText("Confirmar senha"), {
      target: { value: "12345678" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    expect(toast.error).toHaveBeenCalledWith(
      "A senha precisa ter pelo menos 8 caracteres, incluir uma letra maiúscula, uma minúscula, um número e um caractere especial."
    );
  });

  it("calls registerUser with correct data on valid submit", async () => {
    render(<Register />);
    fireEvent.change(screen.getByLabelText(/Nome/i), {
      target: { value: "João" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "joao@email.com" },
    });
    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "Abc123!@" },
    });
    fireEvent.change(screen.getByLabelText("Confirmar senha"), {
      target: { value: "Abc123!@" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(mockRegisterUser).toHaveBeenCalledWith(
        {
          displayName: "João",
          email: "joao@email.com",
          password: "Abc123!@",
        },
        expect.objectContaining({
          onSuccess: expect.any(Function),
          onError: expect.any(Function),
        })
      );
    });
  });

  it("shows success toast and navigates to /login", async () => {
    userRegisterUser.mockImplementation(({ onSuccess }) => ({
      registerUser: () => onSuccess(),
      isLoading: false,
      isError: false,
    }));

    render(<Register />);
    fireEvent.change(screen.getByLabelText(/Nome/i), {
      target: { value: "João" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "joao@email.com" },
    });
    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "Abc123!@" },
    });
    fireEvent.change(screen.getByLabelText("Confirmar senha"), {
      target: { value: "Abc123!@" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Cadastro realizado!");
    });

    await new Promise((r) => setTimeout(r, 1300));

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("shows error toast if registration fails", async () => {
    userRegisterUser.mockImplementation(({ onError }) => ({
      registerUser: () => onError(),
      isLoading: false,
      isError: true,
    }));

    render(<Register />);
    fireEvent.change(screen.getByLabelText(/Nome/i), {
      target: { value: "João" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "joao@email.com" },
    });
    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "Abc123!@" },
    });
    fireEvent.change(screen.getByLabelText("Confirmar senha"), {
      target: { value: "Abc123!@" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Erro ao cadastrar");
    });
  });

  it("navigates to login when clicking on 'Faça login'", () => {
    render(<Register />);
    const link = screen.getByText(/Faça login/i);
    fireEvent.click(link);
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
