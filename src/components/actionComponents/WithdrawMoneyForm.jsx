import { useState } from "react";
import { useBankActions } from "../../context/BankContext";

function WithdrawMoneyForm({ closeForm }) {
  const { withdrawMoney } = useBankActions();

  const [formData, setFormData] = useState({
    amountToWithdraw: "",
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
        withdrawMoney(formData);
        closeForm();
      }}
    >
      <h1>Withdraw</h1>
      <button type="button" onClick={closeForm}>
        &times;
      </button>
      <input
        type="number"
        name="amountToWithdraw"
        placeholder="600 NIS"
        value={formData.amountToWithdraw}
        onChange={(event) => handleChange(event)}
      />

      <button type="submit">Withdraw</button>
    </form>
  );
}

export default WithdrawMoneyForm;
