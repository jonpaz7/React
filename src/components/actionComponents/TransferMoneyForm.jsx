import { useState } from "react";
import { useBankActions } from "../../context/BankContext";
import { ArrowLeftRight, X } from "lucide-react";

function TransferMoneyForm({ closeForm }) {
  const { transferMoney } = useBankActions();

  const [formData, setFormData] = useState({
    amountToTransfer: "",
    targetAccountNumber: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((p) => ({
      ...p,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={closeForm}
          className="cursor-pointer absolute top-5 left-5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center">
            <ArrowLeftRight className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">העברת כספים</h2>
            <p className="text-xs text-slate-400">העברה מיידית לחשבון יעד</p>
          </div>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            transferMoney(formData);
            closeForm();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              מספר חשבון יעד
            </label>
            <input
              type="number"
              name="targetAccountNumber"
              placeholder="למשל: 4892"
              required
              value={formData.targetAccountNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-800 placeholder-slate-400 font-medium font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              סכום להעברה (בש״ח)
            </label>
            <div className="relative">
              <input
                type="number"
                name="amountToTransfer"
                placeholder="למשל: 350"
                min="1"
                required
                value={formData.amountToTransfer}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-800 placeholder-slate-400 font-medium text-lg"
              />
              <span className="absolute left-4 top-3.5 text-slate-400 font-bold">₪</span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={closeForm}
              className="cursor-pointer flex-1 py-3 px-4 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200"
            >
              ביטול
            </button>
            <button
              type="submit"
              className="cursor-pointer flex-1 py-3 px-4 rounded-xl text-sm font-semibold bg-teal-600 hover:bg-teal-700 text-white transition-colors shadow-md shadow-teal-600/20"
            >
              בצע העברה
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TransferMoneyForm;
