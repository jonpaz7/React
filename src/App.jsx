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
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans" dir="rtl">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {loggedInAccountNumber ? (
          <>
            <AccountStatus />
            <ActionsArea />
            {isAdminLoggedIn && <AccountsList />}
            <Chat />
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto py-6">
            <LoginAccountScreen />
            <CreatingAccount />
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200/80 bg-white py-6 text-center text-xs text-slate-400">
        <p>
          © {new Date().getFullYear()} Discount Direct Bank Ltd. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
