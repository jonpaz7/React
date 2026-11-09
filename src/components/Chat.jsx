import { useState } from "react";
import { useBankData, useBankActions } from "../context/BankContext";

function Chat() {
  const { sendMessage } = useBankActions();
  const { accounts, currentUser, isAdminLoggedIn } = useBankData();

  const [message, setMessage] = useState("");
  const [selectedAccountNumber, setSelectedAccountNumber] = useState(null);

  const activeChatAccount = isAdminLoggedIn
    ? accounts.find((acc) => acc.accountNumber === selectedAccountNumber) || null
    : currentUser;

  const handleSend = () => {
    if (!message.trim() || !activeChatAccount) return;
    sendMessage(message, activeChatAccount.accountNumber);
    setMessage("");
  };

  if (!currentUser) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        width: "320px",
        height: "200px",
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
              <button onClick={() => setSelectedAccountNumber(acc.accountNumber)}>
                Chat
              </button>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div
            style={{
              height: "130px",
              overflowY: "auto",
              border: "1px solid black",
              padding: "10px",
            }}
          >
            {activeChatAccount?.chatHistory?.map((row) => {
              const isAdminMsg = row.senderAccount === "admin";
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
                  {isAdminMsg ? "Admin" : activeChatAccount.ownerName}: "{row.text}"
                </p>
              );
            })}
          </div>

          <div style={{ position: "absolute", bottom: "0px", width: "100%" }}>
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
