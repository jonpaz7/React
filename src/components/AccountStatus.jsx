import { useContext } from "react";
import { BankActionsContext, BankDataContext } from "../context/BankContext";

function AccountStatus() {
  const { loggedInAccountNumber } = useContext(BankDataContext);
  const { logout } = useContext(BankActionsContext);

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
