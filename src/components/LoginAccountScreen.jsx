import { useState } from "react";
import { useBankActions } from "../context/BankContext";

function LoginAccountScreen() {
  const { loginAccount } = useBankActions();

  const [formData, setFormData] = useState({
    ownerID: "",
    ownerPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((p) => ({
      ...p,
      [name]: value,
    }));
  };

  return (
    <>
      <h3>Login to Existing Account</h3>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          loginAccount(formData);
        }}
      >
        <input
          type="number"
          name="ownerID"
          placeholder="325893014"
          value={formData.ownerID}
          onChange={(event) => handleChange(event)}
        />
        <input
          type="password"
          name="ownerPassword"
          placeholder="Owner Password"
          value={formData.ownerPassword}
          onChange={(event) => handleChange(event)}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default LoginAccountScreen;
