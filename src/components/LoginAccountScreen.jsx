import { useContext, useState } from "react";
import { BankActionsContext } from "../context/BankContext";

function LoginAccountScreen() {
  const { loginAccount } = useContext(BankActionsContext);

  const [ownerIDLogin, setOwnerIDLogin] = useState("");
  const [ownerPasswordLogin, setOwnerPasswordLogin] = useState("");
  return (
    <>
      <h3>Login to Existing Account</h3>
      <input
        type="number"
        placeholder="Owner ID Number"
        value={ownerIDLogin}
        onChange={(e) => setOwnerIDLogin(e.target.value)}
      />
      <input
        type="password"
        placeholder="Owner Password"
        value={ownerPasswordLogin}
        onChange={(e) => setOwnerPasswordLogin(e.target.value)}
      />
      <button
        onClick={() => {
          loginAccount(ownerIDLogin, ownerPasswordLogin);
        }}
      >
        Login
      </button>
    </>
  );
}

export default LoginAccountScreen;
