import { useBankData } from "./context/BankContext.jsx";

import Header from "./components/Header.jsx";
import AccountStatus from "./components/AccountStatus.jsx";
import CreatingAccount from "./components/CreatingAccount.jsx";
import LoginAccountScreen from "./components/LoginAccountScreen.jsx";
import ActionsArea from "./components/ActionsArea.jsx";
import AccountsList from "./components/AccountsList.jsx";
import Chat from "./components/Chat.jsx";

function App() {
  const { isAdminLoggedIn, loggedInAccountNumber } = useBankData();

  return (
    <>
      <Header />
      <AccountStatus />
      {loggedInAccountNumber && <Chat />}
      <CreatingAccount />
      <LoginAccountScreen />
      {loggedInAccountNumber && <ActionsArea />}
      {isAdminLoggedIn && <AccountsList />}
    </>
  );
}

export default App;
