import { createContext, useEffect, useState } from "react";
import { getRandomAccountNumber } from "../utils/numericUtils.js";

function BankProvider({ children }) {
  //================================ Data =====================================//

  const [accounts, setAccounts] = useState(() => loadAccounts());

  const [loggedInAccountNumber, setLoggedInAccountNumber] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  //================================ Functions =====================================//

  function loadAccounts() {
    const savedAccounts = localStorage.getItem("bankAccounts");

    return savedAccounts && savedAccounts !== "undefined"
      ? JSON.parse(savedAccounts)
      : [];
  }

  useEffect(() => {
    localStorage.setItem("bankAccounts", JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    if (
      loggedInAccountNumber &&
      accounts.find((acc) => acc.accountNumber === loggedInAccountNumber)
        .isAdmin === true
    ) {
      setIsAdminLoggedIn(true);
    } else {
      setIsAdminLoggedIn(false);
    }
  }, [loggedInAccountNumber]);

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
    const { ownerName, ownerID, ownerPassword, isAdmin } = formData;

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
      isAdmin: isAdmin,
      chatHistory: [],
    };

    setAccounts([...accounts, newAccount]);
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

  const transferMoney = (formData) => {
    let { amountToTransfer, targetAccountNumber } = formData;

    amountToTransfer = Number(amountToTransfer);
    targetAccountNumber = Number(targetAccountNumber);
    if (isNaN(amountToTransfer) || isNaN(targetAccountNumber)) return;

    if (!accounts.find((acc) => acc.accountNumber === targetAccountNumber)) {
      alert("couldnt find the target account");
      return;
    } else if (targetAccountNumber === loggedInAccountNumber) {
      alert("hey man u cant transfer money to ur self");
      return;
    } else if (
      accounts.find((acc) => acc.accountNumber === loggedInAccountNumber)
        .balance < amountToTransfer
    ) {
      alert("not enough money sir!");
      return;
    }

    setAccounts((prevAccounts) => {
      return prevAccounts.map((acc) => {
        if (acc.accountNumber === loggedInAccountNumber) {
          return {
            ...acc,
            balance: acc.balance - amountToTransfer,
            history: [
              ...acc.history,
              `${amountToTransfer} NIS tranferred to account number: ${targetAccountNumber}`,
            ],
          };
        }

        if (acc.accountNumber === targetAccountNumber) {
          return {
            ...acc,
            balance: acc.balance + amountToTransfer,
            history: [
              ...acc.history,
              `${amountToTransfer} NIS recivied from account number: ${loggedInAccountNumber}`,
            ],
          };
        }

        return acc;
      });
    });
  };

  const deleteAccount = (accountNumberToDelete) => {
    setAccounts((prevAccounts) => {
      return prevAccounts.filter(
        (acc) => acc.accountNumber != accountNumberToDelete,
      );
    });
  };

  const showDetails = (accountNumberToBeShown) => {
    const accountToBeShown = accounts.find(
      (acc) => acc.accountNumber === accountNumberToBeShown,
    );

    let historyTextList = "";
    accountToBeShown.history.forEach((element) => {
      historyTextList += `${element} \n`;
    });

    alert(`
    Account: ${accountToBeShown.accountNumber}
    Owner: ${accountToBeShown.ownerName} 
    Balance: ${accountToBeShown.balance}
    
    History: ${historyTextList}

      `);
  };

  const sendMessage = (text) => {
    setAccounts((prevAccounts) => {
      return prevAccounts.map((acc) => {
        if (acc.accountNumber === loggedInAccountNumber) {
          return (acc = {
            ...acc,

            chatHistory: [
              ...acc.chatHistory,
              {
                senderAccount: isAdminLoggedIn ? "admin" : acc.accountNumber,
                text: text,
              },
            ],
          });
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
    transferMoney,
    deleteAccount,
    showDetails,
    sendMessage,
  };

  return (
    <BankActionsContext.Provider value={BankActions}>
      <BankDataContext.Provider
        value={{ accounts, loggedInAccountNumber, isAdminLoggedIn }}
      >
        {children}
      </BankDataContext.Provider>
    </BankActionsContext.Provider>
  );
}
export const BankActionsContext = createContext(null);
export const BankDataContext = createContext(null);

export default BankProvider;
