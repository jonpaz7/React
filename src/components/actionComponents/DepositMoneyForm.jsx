import { useState, useContext } from "react";
import { BankActionsContext } from "../../context/BankContext";

function DepositMoneyForm({ closeForm }) {
  const { depositMoney } = useContext(BankActionsContext);

  const [formData, setFormData] = useState({
    amountToDeposit: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((p) => ({
      ...p,
      [name]: value,
    }));
  };

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          depositMoney(formData);
        }}
      >
        <h1>deposit</h1>
        <button
          onClick={() => {
            closeForm();
          }}
        >
          &times;
        </button>
        <input
          type="number"
          name="amountToDeposit"
          placeholder="600 NIS"
          value={formData.amountToDeposit}
          onChange={(event) => handleChange(event)}
        />

        <button type="submit">Deposit</button>
      </form>
    </>
  );
}

export default DepositMoneyForm;
