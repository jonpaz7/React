import { useContext, useEffect, useState } from "react";
import { BankActionsContext, BankDataContext } from "../context/BankContext";

function AccountStatus() {
  const { getLoggedInAccount, logout } = useContext(BankActionsContext);
  const { loggedInAccountNumber, accounts } = useContext(BankDataContext);
  let [loggedInAccount, setLoggedInAccount] = useState(null);

  useEffect(() => {
    if (loggedInAccountNumber || accounts) {
      setLoggedInAccount(getLoggedInAccount());
    }
  }, [loggedInAccountNumber, accounts]);

  if (!loggedInAccount) {
    return;
  }

  return (
    <>
      <div>
        <h2>
          hello {loggedInAccount.isAdmin === true && <strong>Manager</strong>}{" "}
          {loggedInAccount.ownerName}{" "}
        </h2>

        <p>Account Number: {loggedInAccount.accountNumber}</p>
        <p>Owner Name: {loggedInAccount.ownerName}</p>
        <p>Owner ID: {loggedInAccount.ownerID}</p>
        <p>Balance: {loggedInAccount.balance}</p>

        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
}

export default AccountStatus;
