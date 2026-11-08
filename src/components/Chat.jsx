import { useContext, useState, useEffect } from "react";
import { BankDataContext, BankActionsContext } from "../context/BankContext";

function Chat() {
  const { getLoggedInAccount, sendMessage } = useContext(BankActionsContext);
  const { loggedInAccountNumber, accounts } = useContext(BankDataContext);

  const [loggedInAccount, setLoggedInAccount] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    if (loggedInAccountNumber || accounts) {
      setLoggedInAccount(getLoggedInAccount());
    }
  }, [loggedInAccountNumber, accounts]);

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          width: "320px",
          height: "400px",
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
        {loggedInAccount?.chatHistory.map((row) => {
          return <p key={row.msgID}>{row.text}</p>;
        })}

        <input
          type="text"
          placeholder="i need help"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={() => sendMessage(text)}>Send</button>
      </div>
    </>
  );
}

export default Chat;
