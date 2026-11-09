import { useBankData, useBankActions } from "../context/BankContext";

function AccountStatus() {
  const { logout } = useBankActions();
  const { currentUser } = useBankData();

  if (!currentUser) {
    return null;
  }

  return (
    <div>
      <h2>
        hello {currentUser.isAdmin && <strong>Manager</strong>}{" "}
        {currentUser.ownerName}
      </h2>

      <p>Account Number: {currentUser.accountNumber}</p>
      <p>Owner Name: {currentUser.ownerName}</p>
      <p>Owner ID: {currentUser.ownerID}</p>
      <p>Balance: {currentUser.balance}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default AccountStatus;
