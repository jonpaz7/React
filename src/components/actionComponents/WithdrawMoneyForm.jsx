import { useState, useContext } from "react";
import { BankActionsContext } from "../../context/BankContext";

function WithrawMoneyForm({ closeForm }) {
  const { withdrawMoney } = useContext(BankActionsContext);

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
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          withdrawMoney(formData);
        }}
      >
        <h1>Withraw</h1>
        <button
          onClick={() => {
            closeForm();
          }}
        >
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
    </>
  );
}

export default WithrawMoneyForm;
