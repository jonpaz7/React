import { useState } from "react";
import DepositMoneyForm from "./actionComponents/DepositMoneyForm";
import WithdrawMoneyForm from "./actionComponents/WithdrawMoneyForm";
import TransferMoneyForm from "./actionComponents/TransferMoneyForm";
import { ArrowDownLeft, ArrowUpRight, ArrowLeftRight, Sparkles } from "lucide-react";

function ActionsArea() {
  const [activeForm, setActiveForm] = useState(null);

  const closeForm = () => {
    setActiveForm(null);
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">פעולות מהירות בחשבון</h2>
          <p className="text-xs text-slate-400">הפקדות, משיכות והעברות כספים בזמן אמת</p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          פעולות מיידיות ללא עמלה
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Deposit Button */}
        <button
          onClick={() => setActiveForm("depositMoney")}
          className="cursor-pointer group flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 hover:shadow-sm transition-all text-right"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <ArrowDownLeft className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
              הפקדת מזומן
            </h3>
            <p className="text-xs text-slate-400">הוספת כסף לחשבון</p>
          </div>
        </button>

        {/* Withdraw Button */}
        <button
          onClick={() => setActiveForm("withdrawMoney")}
          className="cursor-pointer group flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-rose-500 hover:bg-rose-50/40 hover:shadow-sm transition-all text-right"
        >
          <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <ArrowUpRight className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 group-hover:text-rose-700 transition-colors">
              משיכת מזומן
            </h3>
            <p className="text-xs text-slate-400">משיכה מיידית מהיתרה</p>
          </div>
        </button>

        {/* Transfer Button */}
        <button
          onClick={() => setActiveForm("transferMoney")}
          className="cursor-pointer group flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/40 hover:shadow-sm transition-all text-right"
        >
          <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <ArrowLeftRight className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
              העברת כספים
            </h3>
            <p className="text-xs text-slate-400">העברה בין חשבונות בנק</p>
          </div>
        </button>
      </div>

      {/* Pop-up Modals for each action */}
      {activeForm === "depositMoney" && (
        <DepositMoneyForm closeForm={closeForm} />
      )}
      {activeForm === "withdrawMoney" && (
        <WithdrawMoneyForm closeForm={closeForm} />
      )}
      {activeForm === "transferMoney" && (
        <TransferMoneyForm closeForm={closeForm} />
      )}
    </div>
  );
}

export default ActionsArea;
