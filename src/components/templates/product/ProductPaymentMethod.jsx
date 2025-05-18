import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useSaveProductPurchase from "../../../hooks/useSaveProductPurchase";

import IconCreditCard from "../../UI/atoms/icons/IconCreditCard";
import Input from "../../UI/atoms/inputs/Input";
import Button from "../../UI/atoms/buttons/Button";
import IconQrCode from "../../UI/atoms/icons/IconQrCode";
import IconPix from "../../UI/atoms/icons/iconPix";
import toast, { Toaster } from "react-hot-toast";

function ProductPaymentMethod() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    cartItems = [],
    quantities = {},
    total = 0,
    address,
    user,
  } = location.state || {};

  const { saveProductPurchase, error, isLoading } = useSaveProductPurchase({
    onSuccess: () => {
      toast.success("Compra realizada com sucesso!");
      setTimeout(() => navigate("/"), 1100);
    },
    onError: () => {
      toast.error("Erro ao processar a compra");
    },
  });

  const [selectedMethod, setSelectedMethod] = useState("creditCard");
  const [disabledButton, setDisabledButton] = useState(true);
  const [creditCardValues, setCreditCardValues] = useState({
    cardNumber: "",
    expiration: "",
    CVC: "",
    nameCard: "",
  });

  useEffect(() => {
    setDisabledButton(cartItems.length === 0);
  }, [cartItems]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = ["cardNumber", "CVC"].includes(name)
      ? value.replace(/\D/g, "")
      : value;
    setCreditCardValues((prev) => ({ ...prev, [name]: sanitizedValue }));
  };

  const sendProductPurchase = () => {
    if (!user?.displayName || !user?.email || !address) {
      toast.error("Dados do usuário ou endereço incompletos.");
      return;
    }

    if (selectedMethod === "creditCard") {
      const { cardNumber, expiration, CVC, nameCard } = creditCardValues;
      if (!cardNumber || !expiration || !CVC || !nameCard) {
        toast.error("Preencha todos os dados do cartão.");
        return;
      }
    }

    const purchaseData = {
      paymentMethod: selectedMethod,
      delivery: address,
      user: {
        name: user.displayName,
        email: user.email,
      },
      drink: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: quantities[item.id] || 1,
        total,
      })),
    };

    saveProductPurchase(purchaseData);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 sm:p-6">
      <Toaster />
      {error && <p className="text-red-600 mb-2">Erro com pagamento</p>}
      {isLoading && <p className="mb-2">Carregando pagamento...</p>}
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-3xl">
        Escolha o Método de Pagamento
      </h1>

      <section className="w-full max-w-2xl bg-white p-4 rounded-lg shadow mb-6 overflow-x-auto sm:p-6">
        <h2 className="text-lg font-semibold mb-4 sm:text-xl">
          Resumo do Pedido
        </h2>
        <ul className="divide-y">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="py-2 flex flex-col sm:flex-row sm:justify-between sm:items-center"
            >
              <span className="text-base">
                {item.name} x {quantities[item.id] || 1}
              </span>
              <span className="text-base font-medium mt-1 sm:mt-0">
                R$ {(item.price * (quantities[item.id] || 1)).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-right font-semibold text-lg sm:text-xl">
          Total: R$ {total.toFixed(2)}
        </div>
      </section>

      <section className="flex flex-wrap justify-center gap-3 w-full max-w-lg bg-white p-4 rounded-lg shadow mb-8 sm:p-6">
        {[
          {
            method: "creditCard",
            label: "Cartão de Crédito",
            Icon: IconCreditCard,
          },
          { method: "pix", label: "Pix", Icon: IconPix },
          { method: "cash", label: "Pagamento na Entrega" },
        ].map(({ method, label, Icon }) => (
          <button
            key={method}
            type="button"
            onClick={() => setSelectedMethod(method)}
            className={`flex items-center justify-center p-3 rounded-lg shadow transition flex-grow min-w-[100px] max-w-[140px] sm:min-w-[120px] sm:max-w-[160px] ${
              selectedMethod === method
                ? "bg-green-700 text-white"
                : "bg-gray-100 hover:bg-green-600 hover:text-white"
            }`}
            aria-label={label}
          >
            {Icon ? (
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <span className="text-sm sm:text-base">{label}</span>
            )}
          </button>
        ))}
      </section>

      {selectedMethod === "creditCard" && (
        <section className="w-full max-w-md bg-white p-4 rounded-lg shadow sm:p-6">
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              sendProductPurchase();
            }}
          >
            <Input
              name="cardNumber"
              type="text"
              label="Número do Cartão"
              placeholder="0000 0000 0000 0000"
              value={creditCardValues.cardNumber}
              onChange={handleInputChange}
              maxLength={16}
              required
            />
            <Input
              name="CVC"
              type="text"
              label="Código de Segurança (CVC)"
              placeholder="000"
              value={creditCardValues.CVC}
              onChange={handleInputChange}
              maxLength={4}
              required
            />
            <Input
              name="expiration"
              type="month"
              label="Data de Expiração"
              value={creditCardValues.expiration}
              onChange={handleInputChange}
              required
            />
            <Input
              name="nameCard"
              type="text"
              label="Nome no Cartão"
              placeholder="Como está no cartão"
              value={creditCardValues.nameCard}
              onChange={handleInputChange}
              required
            />
            <Button type="submit" disabled={disabledButton} className="w-full mb-12">
              Finalizar Compra
            </Button>
          </form>
        </section>
      )}

      {selectedMethod === "pix" && (
        <section className="flex flex-col items-center gap-4 bg-white p-4 rounded-lg shadow w-full max-w-md text-center sm:p-6">
          <div className="flex items-center justify-center border p-4 rounded-lg w-full max-w-[200px] mx-auto">
            <IconQrCode className="w-24 h-24" />
          </div>

          <div className="border border-blue-400 p-2 rounded text-sm break-words max-w-full">
            <p>654984984848.651.894.891.564894.BB.Gov.8hayyYYdua.BCentral</p>
          </div>
          <div className="text-left text-sm w-full">
            <p className="font-semibold mb-1">⚠️ Instruções Importantes:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>O pagamento deve ser feito com uma conta no seu CPF/CNPJ.</li>
              <li>Não aceitamos depósitos de terceiros.</li>
              <li>O valor não pode exceder o limite disponível.</li>
            </ul>
          </div>
          <Button
            onClick={sendProductPurchase}
            disabled={disabledButton}
            className="w-full mt-4 mb-12"
          >
            Confirmar Pagamento
          </Button>
        </section>
      )}

      {selectedMethod === "cash" && (
        <section className="w-full max-w-md bg-white p-4 rounded-lg shadow text-center sm:p-6">
          <p className="text-base font-medium mb-4 sm:text-lg">
            Pagamento será feito na entrega.
          </p>
          <Button
            onClick={sendProductPurchase}
            disabled={disabledButton}
            className="w-full"
          >
            Finalizar Compra
          </Button>
        </section>
      )}
    </main>
  );
}

export default ProductPaymentMethod;
