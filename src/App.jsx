import { useState, useContext } from "react";
import { BankActionsContext } from "./context/BankContext.jsx";

import Header from "./components/Header.jsx";
import AccountStatus from "./components/AccountStatus.jsx";
import CreatingAccount from "./components/CreatingAccount.jsx";
import LoginAccountScreen from "./components/LoginAccountScreen.jsx";
import ActionsArea from "./components/actionsArea.jsx";
import AccountsList from "./components/AccountsList.jsx";

function App() {
  const { loggedInCheck } = useContext(BankActionsContext);
  return (
    <>
      <Header />
      <AccountStatus />
      <CreatingAccount />
      <LoginAccountScreen />
      {loggedInCheck() && <ActionsArea />}
      <AccountsList />
    </>
  );
}

export default App;
