import { useState } from "react";
import DepositMoneyForm from "./actionComponents/DepositMoneyForm";
import WithdrawMoneyForm from "./actionComponents/WithdrawMoneyForm";
import TransferMoneyForm from "./actionComponents/TransferMoneyForm";

function ActionsArea() {
  const [activeForm, setActiveForm] = useState(null);

  const closeForm = () => {
    setActiveForm(null);
  };

  return (
    <div>
      <h1>Actions</h1>

      <button onClick={() => setActiveForm("depositMoney")}>
        Deposit Money
      </button>
      <button onClick={() => setActiveForm("withdrawMoney")}>
        Withdraw Money
      </button>
      <button onClick={() => setActiveForm("transferMoney")}>
        Transfer Money
      </button>

      {activeForm === "depositMoney" && (
        <DepositMoneyForm closeForm={closeForm} />
      )}
      {activeForm === "withdrawMoney" && (
        <WithdrawMoneyForm closeForm={closeForm} />
      )}
      {activeForm === "transferMoney" && (
        <TransferMoneyForm closeForm={closeForm} />
      )}
    </div>
  );
}

export default ActionsArea;
