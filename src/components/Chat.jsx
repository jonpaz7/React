import { useState } from "react";
import { useBankData, useBankActions } from "../context/BankContext";
import Swal from "sweetalert2";

function Chat() {
  const { sendMessage, approveLoan } = useBankActions();
  const { accounts, currentUser, isAdminLoggedIn } = useBankData();

  const [message, setMessage] = useState("");
  const [selectedAccountNumber, setSelectedAccountNumber] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const activeChatAccount = isAdminLoggedIn
    ? accounts.find((acc) => acc.accountNumber === selectedAccountNumber) ||
      null
    : currentUser;

  const handleSend = () => {
    if (!message.trim() || !activeChatAccount) return;
    sendMessage(message, activeChatAccount.accountNumber, "message", 0);
    setMessage("");
  };

  if (!currentUser) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        width: "300px",
        height: "400px",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.15)",
        zIndex: 1000,
        border: "1px solid #e0e0e0",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <p style={{ margin: "5px 10px", fontWeight: "bold" }}>Chat</p>

      {isAdminLoggedIn && !activeChatAccount ? (
        <div
          style={{
            height: "100%",
            overflowY: "auto",
            border: "1px solid black",
            padding: "10px",
          }}
        >
          {accounts.map((acc) => (
            <div key={acc.accountNumber} style={{ marginBottom: "6px" }}>
              <p style={{ margin: "2px 0" }}>
                {acc.accountNumber} {acc.ownerName}
              </p>
              <button
                onClick={() => setSelectedAccountNumber(acc.accountNumber)}
              >
                Chat
              </button>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div
            style={{
              height: "320px",
              overflowY: "auto",
              border: "1px solid black",
              padding: "10px",
            }}
          >
            {activeChatAccount?.chatHistory?.map((row) => {
              const isAdminMsg = row.senderAccount === "admin";
              const isLoanAppliance = row.messageType === "loanAppliance";
              return (
                <p
                  key={row.msgID}
                  style={{
                    textAlign: isAdminMsg ? "right" : "left",
                    backgroundColor: isAdminMsg ? "#DCF8C6" : "#E7F3FF",
                    width: "fit-content",
                    padding: "2px 6px",
                    margin: isAdminMsg ? "2px 2px 2px auto" : "2px",
                    borderRadius: "5px",
                  }}
                >
                  <strong>
                    {isAdminMsg ? "Admin" : activeChatAccount.ownerName}
                  </strong>
                  :{" "}
                  {isLoanAppliance && (
                    <>
                      <strong>Loan Appliance</strong>
                      <br></br>Amount {row.content} NIS
                      <br></br> Appliance Status:
                      <br></br>
                      <span
                        style={{
                          backgroundColor:
                            row.loanStatus === "Awaiting approval"
                              ? "red"
                              : "green",
                          color: "black",
                        }}
                      >
                        {row.loanStatus}
                      </span>
                      <br></br>
                      {isAdminLoggedIn &&
                        row.loanStatus === "Awaiting approval" && (
                          <button
                            onClick={() =>
                              approveLoan(
                                activeChatAccount.accountNumber,
                                row.msgID,
                              )
                            }
                          >
                            Approve
                          </button>
                        )}
                    </>
                  )}
                  {!isLoanAppliance && row.content}
                </p>
              );
            })}
          </div>

          {showMenu && (
            <div
              style={{
                position: "absolute",
                bottom: "30px",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "white",
                borderRadius: "5px",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.15)",
              }}
            >
              <h3>Menu</h3>
              <button
                onClick={async () => {
                  const appliance = await Swal.fire({
                    title: "Get a Loan!",
                    input: "number",
                    inputLabel: "How much money do u want",
                    confirmButtonText: "Apply",
                    showCancelButton: true,
                    inputValidator: (value) => {
                      if (!value || Number(value) < 0 || isNaN(value))
                        return "Try again";
                    },
                  });

                  console.log(appliance);
                  if (appliance.isConfirmed && appliance.value) {
                    sendMessage(
                      "null",
                      activeChatAccount.accountNumber,
                      "loanAppliance",
                      Number(appliance.value),
                    );
                  }
                }}
              >
                Get a Loan
              </button>
            </div>
          )}
          <div style={{ position: "absolute", bottom: "0px", width: "100%" }}>
            <button
              onClick={() => {
                setShowMenu(!showMenu);
              }}
            >
              +
            </button>

            <input
              type="text"
              placeholder={isAdminLoggedIn ? "Message" : "i need help"}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />
            <button onClick={handleSend}>Send</button>
            {isAdminLoggedIn && (
              <button onClick={() => setSelectedAccountNumber(null)}>X</button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Chat;
