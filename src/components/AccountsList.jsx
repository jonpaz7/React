import { useContext, useState } from "react";
import { BankDataContext, BankActionsContext } from "../context/BankContext";

function AccountsList() {
  const { accounts } = useContext(BankDataContext);
  const { deleteAccount, showDetails } = useContext(BankActionsContext);

  const [showList, setShowList] = useState(true);
  const [ownerNameSearchTerm, setOwnerNameSearchTerm] = useState("");
  const [balanceSearchTerm, setBalanceSearchTerm] = useState(null);

  return (
    <>
      <h2>Accounts List</h2>
      <div>
        <button
          onClick={() => {
            setShowList(false);
            setShowList(true);
          }}
        >
          Refresh
        </button>
        <button onClick={() => setShowList(false)}>Clear List</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Israel Israeli"
          value={ownerNameSearchTerm}
          onChange={(e) => setOwnerNameSearchTerm(e.target.value)}
        />
        <input
          type="number"
          placeholder="balance more than"
          value={balanceSearchTerm}
          onChange={(e) => setBalanceSearchTerm(e.target.value)}
        />
      </div>

      {showList &&
        accounts
          .filter((acc) => {
            if (ownerNameSearchTerm === "" && balanceSearchTerm === null)
              return true;

            return (
              acc.ownerName
                .toLowerCase()
                .includes(ownerNameSearchTerm.toLowerCase()) &&
              acc.balance > balanceSearchTerm
            );
          })

          .map((acc) => {
            return (
              <div key={acc.accountNumber}>
                account number: {acc.accountNumber} | Owner name:{" "}
                {acc.ownerName} | Balance: {acc.balance}
                <button onClick={() => deleteAccount(acc.accountNumber)}>
                  Delete Account
                </button>
                <button onClick={() => showDetails(acc.accountNumber)}>
                  Details
                </button>
                <button>Print details as PDF</button>
              </div>
            );
          })}
    </>
  );
}
export default AccountsList;
