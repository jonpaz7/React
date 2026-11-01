import { useContext, useState } from "react";
import { BankActionsContext } from "../context/BankContext";

function CreatingAccount() {
  const { createAccount } = useContext(BankActionsContext);

  const [formData, setFormData] = useState({
    ownerName: "",
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
      <h3>Creating New Account</h3>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          createAccount(formData);
        }}
      >
        <input
          type="text"
          id="ownerName"
          name="ownerName"
          placeholder="Israel Israeli"
          value={formData.ownerName}
          onChange={() => handleChange(event)}
        />
        <input
          type="number"
          id="ownerID"
          name="ownerID"
          placeholder="123456789"
          value={formData.ownerID}
          onChange={() => handleChange(event)}
        />
        <input
          type="password"
          id="ownerPassword"
          name="ownerPassword"
          placeholder="Up123456"
          value={formData.ownerPassword}
          onChange={() => handleChange(event)}
        />
        <button type="submit">Create account</button>
      </form>
    </>
  );
}

export default CreatingAccount;
