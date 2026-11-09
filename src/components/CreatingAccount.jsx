import { useState } from "react";
import { useBankActions } from "../context/BankContext";

function CreatingAccount() {
  const { createAccount } = useBankActions();

  const [formData, setFormData] = useState({
    ownerName: "",
    ownerID: "",
    ownerPassword: "",
    isAdmin: false,
  });

  const handleChange = (event) => {
    const { type, name, value, checked } = event.target;

    setFormData((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
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
          onChange={(event) => handleChange(event)}
        />
        <input
          type="number"
          id="ownerID"
          name="ownerID"
          placeholder="123456789"
          value={formData.ownerID}
          onChange={(event) => handleChange(event)}
        />
        <input
          type="password"
          id="ownerPassword"
          name="ownerPassword"
          placeholder="Up123456"
          value={formData.ownerPassword}
          onChange={(event) => handleChange(event)}
        />
        <br />
        <label htmlFor="createAdmin">Admin</label>
        <input
          type="checkbox"
          id="createAdmin"
          name="isAdmin"
          checked={formData.isAdmin}
          onChange={(event) => handleChange(event)}
        />
        <button type="submit">Create account</button>
      </form>
    </>
  );
}

export default CreatingAccount;
