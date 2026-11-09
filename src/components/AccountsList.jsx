import { useState } from "react";
import { useBankData, useBankActions } from "../context/BankContext";
import PrintAsPDF from "./buttonComponents/PrintAsPDF";
import { Users, Search, RefreshCw, EyeOff, Trash2, Info, ArrowDownUp } from "lucide-react";

function AccountsList() {
  const { accounts } = useBankData();
  const { deleteAccount, showDetails } = useBankActions();

  const [showList, setShowList] = useState(true);
  const [ownerNameSearchTerm, setOwnerNameSearchTerm] = useState("");
  const [balanceSearchTerm, setBalanceSearchTerm] = useState("");

  const handleRefresh = () => {
    setOwnerNameSearchTerm("");
    setBalanceSearchTerm("");
    setShowList(true);
  };

  const filteredAccounts = accounts.filter((acc) => {
    if (ownerNameSearchTerm === "" && balanceSearchTerm === "") return true;

    return (
      acc.ownerName
        .toLowerCase()
        .includes(ownerNameSearchTerm.toLowerCase()) &&
      acc.balance >= Number(balanceSearchTerm || 0)
    );
  });

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">ניהול חשבונות בנק (פאנל מנהל)</h2>
            <p className="text-xs text-slate-400">צפייה בכלל הלקוחות, חיפוש, יתרה וייצוא דוחות</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            רענן רשימה
          </button>
          <button
            onClick={() => setShowList(!showList)}
            className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200"
          >
            <EyeOff className="w-3.5 h-3.5" />
            {showList ? "הסתר רשימה" : "הצג רשימה"}
          </button>
        </div>
      </div>

      {/* Filter / Search Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
        <div className="relative">
          <input
            type="text"
            placeholder="חיפוש לפי שם לקוח..."
            value={ownerNameSearchTerm}
            onChange={(e) => setOwnerNameSearchTerm(e.target.value)}
            className="w-full pl-4 pr-10 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-800 placeholder-slate-400 text-sm"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-2.5" />
        </div>

        <div className="relative">
          <input
            type="number"
            placeholder="סינון לפי יתרה מעל (בש״ח)..."
            value={balanceSearchTerm}
            onChange={(e) => setBalanceSearchTerm(e.target.value)}
            className="w-full pl-4 pr-10 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-800 placeholder-slate-400 text-sm"
          />
          <ArrowDownUp className="w-4 h-4 text-slate-400 absolute right-3.5 top-2.5" />
        </div>
      </div>

      {/* Table / List */}
      {showList && (
        <div className="overflow-x-auto">
          {filteredAccounts.length === 0 ? (
            <p className="text-center py-8 text-sm text-slate-400">לא נמצאו חשבונות התואמים את החיפוש.</p>
          ) : (
            <table className="w-full text-right text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-xs font-medium uppercase tracking-wider">
                  <th className="py-3 px-4">חשבון</th>
                  <th className="py-3 px-4">שם לקוח</th>
                  <th className="py-3 px-4">יתרה עדכנית</th>
                  <th className="py-3 px-4 text-left">פעולות</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAccounts.map((acc) => (
                  <tr key={acc.accountNumber} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-900">
                      {acc.accountNumber}
                    </td>
                    <td className="py-3.5 px-4 text-slate-800 font-medium">
                      {acc.ownerName}
                      {acc.isAdmin && (
                        <span className="mr-2 text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded-sm font-semibold">
                          מנהל
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-emerald-700">
                      ₪{acc.balance.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-left">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => showDetails(acc.accountNumber)}
                          className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200"
                        >
                          <Info className="w-3.5 h-3.5 text-slate-500" />
                          פרטים
                        </button>
                        <PrintAsPDF PDFData={acc.history} />
                        <button
                          onClick={() => deleteAccount(acc.accountNumber)}
                          className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors border border-rose-100"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          מחיקה
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default AccountsList;
