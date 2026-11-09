import { useState } from "react";
import { useBankActions } from "../context/BankContext";
import { UserPlus, User, IdCard, Lock, ShieldCheck } from "lucide-react";

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
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 mb-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <UserPlus className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">פתיחת חשבון בנק חדש</h3>
          <p className="text-xs text-slate-400">הצטרף לבנק הדיגיטלי תוך מספר שניות</p>
        </div>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          createAccount(formData);
        }}
        className="space-y-4 max-w-lg"
      >
        <div>
          <label htmlFor="ownerName" className="block text-xs font-semibold text-slate-600 mb-1.5">
            שם מלא באנגלית או עברית
          </label>
          <div className="relative">
            <input
              type="text"
              id="ownerName"
              name="ownerName"
              placeholder="ישראל ישראלי"
              required
              value={formData.ownerName}
              onChange={handleChange}
              className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800 placeholder-slate-400 text-sm"
            />
            <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
          </div>
        </div>

        <div>
          <label htmlFor="ownerID" className="block text-xs font-semibold text-slate-600 mb-1.5">
            מספר תעודת זהות
          </label>
          <div className="relative">
            <input
              type="number"
              id="ownerID"
              name="ownerID"
              placeholder="9 ספרות"
              required
              value={formData.ownerID}
              onChange={handleChange}
              className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800 placeholder-slate-400 font-mono text-sm"
            />
            <IdCard className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
          </div>
        </div>

        <div>
          <label htmlFor="ownerPassword" className="block text-xs font-semibold text-slate-600 mb-1.5">
            סיסמה ראשונית
          </label>
          <div className="relative">
            <input
              type="password"
              id="ownerPassword"
              name="ownerPassword"
              placeholder="בחר סיסמה מאובטחת"
              required
              value={formData.ownerPassword}
              onChange={handleChange}
              className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800 placeholder-slate-400 text-sm"
            />
            <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
          </div>
        </div>

        <div className="pt-1">
          <label
            htmlFor="createAdmin"
            className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <input
              type="checkbox"
              id="createAdmin"
              name="isAdmin"
              checked={formData.isAdmin}
              onChange={handleChange}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
            />
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>הגדר חשבון זה כמנהל מערכת (Admin)</span>
            </div>
          </label>
        </div>

        <button
          type="submit"
          className="cursor-pointer inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-md shadow-emerald-600/20"
        >
          <UserPlus className="w-4 h-4" />
          פתח חשבון עכשיו
        </button>
      </form>
    </div>
  );
}

export default CreatingAccount;
