import { createContext, useEffect, useState } from "react";
import { getRandomAccountNumber } from "../utils/numericUtils.js";

function BankProvider({ children }) {
  //================================ Data =====================================//

  const [accounts, setAccounts] = useState(() => loadAccounts());

  let [loggedInAccountNumber, setLoggedInAccountNumber] = useState(null);
  //================================ Functions =====================================//

  function loadAccounts() {
    const savedAccounts = localStorage.getItem("bankAccounts");

    return savedAccounts ? JSON.parse(savedAccounts) : [];
  }

  useEffect(() => {
    localStorage.setItem("bankAccounts", JSON.stringify(accounts));
  }, [accounts]);

  const logout = () => {
    setLoggedInAccountNumber(null);
  };

  const getLoggedInAccount = () => {
    const found = accounts.find(
      (acc) => acc.accountNumber == loggedInAccountNumber,
    );
    return found;
  };

  const createAccount = (formData) => {
    const { ownerName, ownerID, ownerPassword } = formData;

    //check for missing details
    if (!ownerName || !ownerID || !ownerPassword) {
      alert("missing details");
      return;
    }

    const selectedAccount = accounts.find((x) => x.ownerID === ownerID);

    if (selectedAccount) {
      alert("there is already account with this ID");
      return;
    }

    const newAccount = {
      accountNumber: getRandomAccountNumber(accounts),
      ownerName: ownerName,
      ownerID: ownerID,
      ownerPassword: ownerPassword,
      balance: 0,
      history: ["Account Created"],
    };

    setAccounts([...accounts, newAccount]);

    saveAccountsToLocalStorage();
  };

  const loginAccount = (formData) => {
    const { ownerID, ownerPassword } = formData;

    if (!ownerID || !ownerPassword) {
      alert("Missing details");
      return;
    }

    const selectedAccount = accounts.find((x) => x.ownerID == ownerID);

    if (!selectedAccount) {
      alert("No such Account");
      return;
    }

    if (selectedAccount.ownerPassword === ownerPassword) {
      setLoggedInAccountNumber(selectedAccount.accountNumber);

      alert("Successfully Login");
    } else {
      alert("Check your Password");
    }
  };

  const loggedInCheck = () => {
    if (!loggedInAccountNumber) {
      alert("You are not logged in");
      return false;
    }
    return true;
  };

  const depositMoney = (formData) => {
    let { amountToDeposit } = formData;
    amountToDeposit = Number(amountToDeposit);
    if (isNaN(amountToDeposit) || amountToDeposit <= 0) return;

    setAccounts((prevAccounts) => {
      return prevAccounts.map((acc) => {
        if (acc.accountNumber === loggedInAccountNumber) {
          return {
            ...acc,
            balance: acc.balance + amountToDeposit,
            history: [...acc.history, `Deposited ${amountToDeposit} NIS`],
          };
        }
        return acc;
      });
    });
  };

  const withdrawMoney = (formData) => {
    let { amountToWithdraw } = formData;
    amountToWithdraw = Number(amountToWithdraw);

    if (isNaN(amountToWithdraw) || amountToWithdraw <= 0) return;

    setAccounts((prevAccounts) => {
      return prevAccounts.map((acc) => {
        if (acc.accountNumber === loggedInAccountNumber) {
          if (acc.balance < amountToWithdraw) {
            alert("You dont have enough money in your account");
            return acc;
          } else {
            acc = {
              ...acc,
              balance: acc.balance - amountToWithdraw,
              history: [...acc.history, `Withdrawn ${amountToWithdraw} NIS`],
            };
          }
        }
        return acc;
      });
    });
  };

  //================================ Configuration =====================================//

  const BankActions = {
    loadAccounts,
    logout,
    createAccount,
    loginAccount,
    loggedInCheck,
    depositMoney,
    withdrawMoney,
    getLoggedInAccount,
  };

  return (
    <BankActionsContext.Provider value={BankActions}>
      <BankDataContext.Provider value={{ accounts, loggedInAccountNumber }}>
        {children}
      </BankDataContext.Provider>
    </BankActionsContext.Provider>
  );
}
export const BankActionsContext = createContext(null);
export const BankDataContext = createContext(null);

export default BankProvider;
