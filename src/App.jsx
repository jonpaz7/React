import { useState } from "react";
import BankProvider from "./context/BankContext.jsx";

import Header from "./components/Header.jsx";
import AccountStatus from "./components/AccountStatus.jsx";
import CreatingAccount from "./components/CreatingAccount.jsx";
import LoginAccountScreen from "./components/LoginAccountScreen.jsx";

function App() {
  return (
    <>
      <BankProvider>
        <Header />
        <AccountStatus />
        <CreatingAccount />
        <LoginAccountScreen />
      </BankProvider>
    </>
  );
}

export default App;
