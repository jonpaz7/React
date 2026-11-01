function AccountStatus({ loggedInAccount, onLogout }) {
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

        <button onClick={onLogout}>Logout</button>
      </div>
    </>
  );
}

export default AccountStatus;
