import { useContext, useState, useEffect } from "react";
import { BankDataContext, BankActionsContext } from "../context/BankContext";

function Chat() {
  const { getAccountObject, sendMessage } = useContext(BankActionsContext);
  const { loggedInAccountNumber, accounts, isAdminLoggedIn } =
    useContext(BankDataContext);

  const [loggedInAccount, setLoggedInAccount] = useState(null);
  const [message, setMessage] = useState("");
  const [chosedAcc, setChosedAcc] = useState(null);
  const [chosedAccNumber, setChosedAccNumber] = useState(null);

  useEffect(() => {
    if (loggedInAccountNumber || accounts) {
      setLoggedInAccount(getAccountObject(loggedInAccountNumber));
    }
  }, [loggedInAccountNumber, accounts]);

  useEffect(() => {
    if (chosedAccNumber) {
      setChosedAcc(getAccountObject(chosedAccNumber));
    } else {
      setChosedAcc(null);
    }
  }, [chosedAccNumber, accounts]);

  return (
    <>
      {/* Admin view*/}
      {isAdminLoggedIn && (
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
            zIndex: 1000, //
            border: "1px solid #e0e0e0",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <p>Chat</p>
          {/*Main screen*/}
          {!chosedAcc && (
            <div
              style={{
                height: "100%",
                overflowY: "auto",
                border: "1px solid black",
                padding: "10px",
              }}
            >
              {/*Display the accs list with button to chat with them*/}
              {accounts.map((acc) => {
                return (
                  <div key={acc.accountNumber}>
                    <p>
                      {acc.accountNumber} {acc.ownerName}
                    </p>
                    <button
                      onClick={() => setChosedAccNumber(acc.accountNumber)}
                    >
                      Chat
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/*Chat screen*/}
          {chosedAcc && (
            <>
              <div
                style={{
                  height: "130px",
                  overflowY: "auto",
                  border: "1px solid black",
                  padding: "10px",
                }}
              >
                {chosedAcc.chatHistory?.map((row) => {
                  if (row.senderAccount !== "admin") {
                    return (
                      <p
                        key={row.msgID}
                        style={{
                          textAlign: "left",
                          backgroundColor: "#E7F3FF",
                          width: "fit-content",
                          padding: "2px",
                          margin: "2px",
                          borderRadius: "5px",
                        }}
                      >
                        {chosedAcc.ownerName}: "{row.text}"
                      </p>
                    );
                  } else {
                    return (
                      <p
                        key={row.msgID}
                        style={{
                          textAlign: "right",
                          backgroundColor: "#DCF8C6",
                          width: "fit-content",
                          padding: "2px",
                          margin: "2px 2px 2px auto",
                          borderRadius: "5px",
                        }}
                      >
                        Admin: "{row.text}"
                      </p>
                    );
                  }
                })}
              </div>

              <div
                style={{ position: "absolute", bottom: "0px", width: "100%" }}
              >
                <input
                  type="text"
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  onClick={() => {
                    console.log(message, chosedAcc.accountNumber);
                    sendMessage(message, chosedAcc.accountNumber);
                  }}
                >
                  Send
                </button>

                <button
                  onClick={() => {
                    setChosedAccNumber(null);
                  }}
                >
                  X
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/*User view */}
      {!isAdminLoggedIn && (
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
            zIndex: 1000, //
            border: "1px solid #e0e0e0",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <p>Chat</p>

          <div
            style={{
              height: "130px",
              overflowY: "auto",
              border: "1px solid black",
              padding: "10px",
            }}
          >
            {loggedInAccount &&
              loggedInAccount.chatHistory.map((row) => {
                if (row.senderAccount !== "admin") {
                  return (
                    <p
                      key={row.msgID}
                      style={{
                        textAlign: "left",
                        backgroundColor: "#E7F3FF",
                        width: "fit-content",
                        padding: "2px",
                        margin: "2px",
                        borderRadius: "5px",
                      }}
                    >
                      {loggedInAccount.ownerName}: "{row.text}"
                    </p>
                  );
                } else {
                  return (
                    <p
                      key={row.msgID}
                      style={{
                        textAlign: "right",
                        backgroundColor: "#DCF8C6",
                        width: "fit-content",
                        padding: "2px",
                        margin: "2px 2px 2px auto",
                        borderRadius: "5px",
                      }}
                    >
                      Admin: "{row.text}"
                    </p>
                  );
                }
              })}
          </div>

          <div style={{ position: "absolute", bottom: "0px", width: "100%" }}>
            <input
              type="text"
              placeholder="i need help"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={() =>
                sendMessage(message, loggedInAccount.accountNumber)
              }
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chat;
