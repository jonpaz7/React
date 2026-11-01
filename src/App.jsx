import { useState } from "react";

import Header from "./components/Header.jsx";
import AccountStatus from "./components/AccountStatus.jsx";

function App() {
  const [loggedInAccount, setLoggedInAccount] = useState({
    ownerName: "Eliav",
    ownerID: "325893014",
    balance: 300,
  });

  const handleLogout = () => {
    setLoggedInAccount(null);
  };

  return (
    <>
      <Header />
      <AccountStatus
        loggedInAccount={loggedInAccount}
        onLogout={handleLogout}
      />
    </>
  );
}

export default App;
