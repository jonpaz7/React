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
    return (
      <div>
        <h2>Not Logged In</h2>
      </div>
    );
  }

  return (
    <>
      <div>
        <h2>Logged In</h2>

        <p>Owner Name: {loggedInAccount.ownerName}</p>
        <p>Owner ID: {loggedInAccount.ownerID}</p>
        <p>Balance: {loggedInAccount.balance}</p>

        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
}

export default AccountStatus;
