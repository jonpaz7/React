import { createContext, useState } from "react";
import { getRandomAccountNumber } from "../utils/numericUtils.js";

function BankProvider({ children }) {
  //================================ Data =====================================//

  const [accounts, setAccounts] = useState(() => loadAccounts());

  const [loggedInAccount, setLoggedInAccount] = useState(null);

  //================================ Functions =====================================//

  function loadAccounts() {
    const savedAccounts = localStorage.getItem("bankAccounts");

    return savedAccounts ? JSON.parse(savedAccounts) : [];
  }

  const saveAccountsToLocalStorage = () => {
    localStorage.setItem("bankAccounts", JSON.stringify(accounts));
  };
  const logout = () => {
    setLoggedInAccount(null);
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

  const loginAccount = (ownerID, ownerPassword) => {
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
      setLoggedInAccount(selectedAccount);

      alert("Successfully Login");
    } else {
      alert("Check your Password");
    }
  };

  //================================ Configuration =====================================//

  const BankActions = {
    loadAccounts,
    saveAccountsToLocalStorage,
    logout,
    createAccount,
    loginAccount,
  };

  return (
    <BankActionsContext.Provider value={BankActions}>
      <BankDataContext.Provider value={{ accounts, loggedInAccount }}>
        {children}
      </BankDataContext.Provider>
    </BankActionsContext.Provider>
  );
}
export const BankActionsContext = createContext(null);
export const BankDataContext = createContext(null);

export default BankProvider;
