import { useState } from "react";
import { useBankActions } from "../context/BankContext";
import { LogIn, KeyRound, UserCheck } from "lucide-react";

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
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 mb-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
          <LogIn className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">כניסה לחשבון קיים</h3>
          <p className="text-xs text-slate-400">הזדהה באמצעות תעודת זהות וסיסמה אישית</p>
        </div>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          loginAccount(formData);
        }}
        className="space-y-4 max-w-lg"
      >
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
            מספר תעודת זהות
          </label>
          <div className="relative">
            <input
              type="number"
              name="ownerID"
              placeholder="9 ספרות (למשל: 325893014)"
              required
              value={formData.ownerID}
              onChange={handleChange}
              className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-800 placeholder-slate-400 font-mono text-sm"
            />
            <UserCheck className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
            סיסמת גישה
          </label>
          <div className="relative">
            <input
              type="password"
              name="ownerPassword"
              placeholder="הזן סיסמה מאובטחת"
              required
              value={formData.ownerPassword}
              onChange={handleChange}
              className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-800 placeholder-slate-400 text-sm"
            />
            <KeyRound className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
          </div>
        </div>

        <button
          type="submit"
          className="cursor-pointer inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold bg-teal-600 hover:bg-teal-700 text-white transition-all shadow-md shadow-teal-600/20"
        >
          <LogIn className="w-4 h-4" />
          התחבר לחשבון
        </button>
      </form>
    </div>
  );
}

export default LoginAccountScreen;
