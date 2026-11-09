import { createContext, useContext, useEffect, useState } from "react";
import { getRandomAccountNumber } from "../utils/numericUtils.js";

function BankProvider({ children }) {
  const [accounts, setAccounts] = useState(() => loadAccounts());
  const [loggedInAccountNumber, setLoggedInAccountNumber] = useState(null);

  const currentUser =
    accounts.find((acc) => acc.accountNumber === loggedInAccountNumber) || null;
  const isAdminLoggedIn = Boolean(currentUser?.isAdmin);

  function loadAccounts() {
    const savedAccounts = localStorage.getItem("bankAccounts");
    return savedAccounts && savedAccounts !== "undefined"
      ? JSON.parse(savedAccounts)
      : [];
  }

  useEffect(() => {
    localStorage.setItem("bankAccounts", JSON.stringify(accounts));
  }, [accounts]);

  const logout = () => {
    setLoggedInAccountNumber(null);
  };

  const createAccount = (formData) => {
    const { ownerName, ownerID, ownerPassword, isAdmin } = formData;

    if (!ownerName || !ownerID || !ownerPassword) {
      alert("missing details");
      return;
    }

    const selectedAccount = accounts.find(
      (x) => String(x.ownerID) === String(ownerID),
    );

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

    const selectedAccount = accounts.find(
      (x) => String(x.ownerID) === String(ownerID),
    );

    if (!selectedAccount) {
      alert("No such Account");
      return;
    }

    if (selectedAccount.ownerPassword === ownerPassword) {
      setLoggedInAccountNumber(selectedAccount.accountNumber);
    } else {
      alert("Check your Password");
    }
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
            return {
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
    if (
      isNaN(amountToTransfer) ||
      isNaN(targetAccountNumber) ||
      amountToTransfer <= 0
    )
      return;

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
        (acc) => acc.accountNumber !== accountNumberToDelete,
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

  const sendMessage = (text, targetAccountNumber) => {
    if (!text || !text.trim()) return;

    setAccounts((prevAccounts) => {
      return prevAccounts.map((acc) => {
        if (acc.accountNumber === targetAccountNumber) {
          return {
            ...acc,
            chatHistory: [
              ...acc.chatHistory,
              {
                msgID: Date.now() + Math.random(),
                senderAccount: isAdminLoggedIn ? "admin" : acc.accountNumber,
                text: text.trim(),
              },
            ],
          };
        }
        return acc;
      });
    });
  };

  const BankActions = {
    logout,
    createAccount,
    loginAccount,
    depositMoney,
    withdrawMoney,
    transferMoney,
    deleteAccount,
    showDetails,
    sendMessage,
  };

  return (
    <BankActionsContext.Provider value={BankActions}>
      <BankDataContext.Provider
        value={{
          accounts,
          loggedInAccountNumber,
          currentUser,
          isAdminLoggedIn,
        }}
      >
        {children}
      </BankDataContext.Provider>
    </BankActionsContext.Provider>
  );
}

export const BankActionsContext = createContext(null);
export const BankDataContext = createContext(null);

export const useBankData = () => {
  const context = useContext(BankDataContext);
  if (!context) {
    throw new Error("useBankData must be used within a BankProvider");
  }
  return context;
};

export const useBankActions = () => {
  const context = useContext(BankActionsContext);
  if (!context) {
    throw new Error("useBankActions must be used within a BankProvider");
  }
  return context;
};

export default BankProvider;
