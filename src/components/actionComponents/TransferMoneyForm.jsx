import { useState } from "react";
import { useBankActions } from "../../context/BankContext";

function TransferMoneyForm({ closeForm }) {
  const { transferMoney } = useBankActions();

  const [formData, setFormData] = useState({
    amountToTransfer: "",
    targetAccountNumber: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((p) => ({
      ...p,
      [name]: value,
    }));
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        transferMoney(formData);
        closeForm();
      }}
    >
      <h1>Transfer</h1>
      <button type="button" onClick={closeForm}>
        &times;
      </button>

      <input
        type="number"
        name="targetAccountNumber"
        placeholder="Account number: 9876"
        value={formData.targetAccountNumber}
        onChange={(event) => handleChange(event)}
      />
      <input
        type="number"
        name="amountToTransfer"
        placeholder="600 NIS"
        value={formData.amountToTransfer}
        onChange={(event) => handleChange(event)}
      />
      <button type="submit">Transfer</button>
    </form>
  );
}

export default TransferMoneyForm;
