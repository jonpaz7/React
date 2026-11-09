import { useState } from "react";
import { useBankData, useBankActions } from "../context/BankContext";
import PrintAsPDF from "./buttonComponents/PrintAsPDF";

function AccountsList() {
  const { accounts } = useBankData();
  const { deleteAccount, showDetails } = useBankActions();

  const [showList, setShowList] = useState(true);
  const [ownerNameSearchTerm, setOwnerNameSearchTerm] = useState("");
  const [balanceSearchTerm, setBalanceSearchTerm] = useState("");

  const handleRefresh = () => {
    setOwnerNameSearchTerm("");
    setBalanceSearchTerm("");
    setShowList(true);
  };

  return (
    <>
      <h2>Accounts List</h2>
      <div>
        <button onClick={handleRefresh}>Refresh</button>
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
            if (ownerNameSearchTerm === "" && balanceSearchTerm === "")
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
                <PrintAsPDF PDFData={acc.history} />
              </div>
            );
          })}
    </>
  );
}

export default AccountsList;
