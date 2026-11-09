import { useContext, useState, useEffect } from "react";
import { BankDataContext, BankActionsContext } from "../context/BankContext";

function Chat() {
  const { getLoggedInAccount, sendMessage } = useContext(BankActionsContext);
  const { loggedInAccountNumber, accounts, isAdminLoggedIn } =
    useContext(BankDataContext);

  const [loggedInAccount, setLoggedInAccount] = useState(null);
  const [message, setMessage] = useState("");
  const [chosedAcc, setChosedAcc] = useState(false);

  useEffect(() => {
    if (loggedInAccountNumber || accounts) {
      setLoggedInAccount(getLoggedInAccount());
    }
  }, [loggedInAccountNumber, accounts]);

  return (
    <>
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
          {!chosedAcc && (
            <div
              style={{
                height: "100%",
                overflowY: "auto",
                border: "1px solid black",
                padding: "10px",
              }}
            ></div>
          )}

          {chosedAcc && (
              <div
                style={{
                  height: "130px",
                  overflowY: "auto",
                  border: "1px solid black",
                  padding: "10px",
                }}
              >
                {loggedInAccount.chatHistory?.map((row) => {
                  if (row.senderAccount !== "admin") {
                    return (
                      <p
                        key={row.msgID}
                        style={{
                          textAlign: "left",
                          backgroundColor: "lightGreen",
                          width: "fit-content",
                          padding: "2px",
                          margin: "2px",
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
                          backgroundColor: "lightRed",
                          width: "fit-content",
                          padding: "2px",
                          margin: "2px",
                        }}
                      >
                        Admin: "{row.text}"
                      </p>
                    );
                  }
                })}
              </div>
            ) && (
              <div
                style={{ position: "absolute", bottom: "0px", width: "100%" }}
              >
                <input
                  type="text"
                  placeholder="i need help"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={() => sendMessage(message)}>Send</button>
              </div>
            )}
        </div>
      )}

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
              loggedInAccount.chatHistory?.map((row) => {
                if (row.senderAccount !== "admin") {
                  return (
                    <p
                      key={row.msgID}
                      style={{
                        textAlign: "left",
                        backgroundColor: "lightGreen",
                        width: "fit-content",
                        padding: "2px",
                        margin: "2px",
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
                        backgroundColor: "lightRed",
                        width: "fit-content",
                        padding: "2px",
                        margin: "2px",
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
            <button onClick={() => sendMessage(message)}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chat;
