import { useState, useContext } from "react";
import DepositMoneyForm from "./actionComponents/DepositMoneyForm";
import WithdrawMoneyForm from "./actionComponents/WithdrawMoneyForm";
import TransferMoneyForm from "./actionComponents/TransferMoneyForm";
import { BankActionsContext } from "../context/BankContext";

function ActionsArea() {
  const { loggedInCheck } = useContext(BankActionsContext);

  let [activeForm, setActiveForm] = useState(null);

  const closeForm = () => {
    setActiveForm(null);
  };

  return (
    <div>
      <h1>Actions</h1>

      <button onClick={() => loggedInCheck() && setActiveForm("depositMoney")}>
        Deposit Money
      </button>
      <button onClick={() => loggedInCheck() && setActiveForm("withrawMoney")}>
        Withdraw Money
      </button>
      <button onClick={() => loggedInCheck() && setActiveForm("transferMoney")}>
        Transfer Money
      </button>

      {activeForm === "depositMoney" && (
        <DepositMoneyForm closeForm={closeForm} />
      )}
      {activeForm === "withrawMoney" && (
        <WithdrawMoneyForm closeForm={closeForm} />
      )}
      {activeForm === "transferMoney" && (
        <TransferMoneyForm closeForm={closeForm} />
      )}
    </div>
  );
}

export default ActionsArea;
