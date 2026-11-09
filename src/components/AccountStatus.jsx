import { useBankData, useBankActions } from "../context/BankContext";
import { LogOut, ShieldAlert, CreditCard, ArrowUpRight, User, Hash, Wallet } from "lucide-react";

function AccountStatus() {
  const { logout } = useBankActions();
  const { currentUser } = useBankData();

  if (!currentUser) {
    return null;
  }

  const formattedBalance = new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 2,
  }).format(currentUser.balance);

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 mb-6 transition-all hover:shadow-md">
      {/* Top Bar: Greetings & Role & Logout */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-lg">
            {currentUser.ownerName?.charAt(0) || <User className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">
                שלום, {currentUser.ownerName}
              </h2>
              {currentUser.isAdmin && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                  מנהל מערכת
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">ברוך הבא לאזור האישי שלך</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors border border-rose-100"
        >
          <LogOut className="w-4 h-4" />
          התנתק
        </button>
      </div>

      {/* Grid: Virtual Card & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
        {/* Modern Bank Card */}
        <div className="lg:col-span-1 relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 text-white shadow-xl shadow-emerald-900/20 flex flex-col justify-between min-h-[190px]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-emerald-200 text-xs font-medium tracking-wider">DISCOUNT PLATINUM</p>
              <p className="text-lg font-semibold tracking-wide">כרטיס דיגיטלי</p>
            </div>
            <CreditCard className="w-8 h-8 text-emerald-300 opacity-80" />
          </div>

          <div className="my-4">
            <span className="text-xs text-emerald-200 block mb-0.5">יתרה זמינה</span>
            <span className="text-2xl font-black tracking-tight">{formattedBalance}</span>
          </div>

          <div className="flex justify-between items-end text-xs text-emerald-100">
            <div>
              <span className="block opacity-70 text-[10px]">בעל החשבון</span>
              <span className="font-medium tracking-wide uppercase">{currentUser.ownerName}</span>
            </div>
            <div className="text-right">
              <span className="block opacity-70 text-[10px]">חשבון</span>
              <span className="font-mono tracking-widest">•••• {String(currentUser.accountNumber).slice(-4)}</span>
            </div>
          </div>

          {/* Decorative bubble */}
          <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/5 pointer-events-none blur-sm" />
        </div>

        {/* Quick Stats Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">מספר חשבון</span>
              <Hash className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xl font-bold font-mono text-slate-800">{currentUser.accountNumber}</p>
            <span className="text-[11px] text-slate-400 mt-2">סניף דיגיטלי ראשי</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">תעודת זהות</span>
              <User className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xl font-bold font-mono text-slate-800">{currentUser.ownerID}</p>
            <span className="text-[11px] text-emerald-600 font-medium mt-2">זהות מאומתת</span>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 flex flex-col justify-between">
            <div className="flex items-center justify-between text-emerald-700 mb-2">
              <span className="text-xs font-medium">סטטוס חשבון</span>
              <Wallet className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-xl font-bold text-emerald-800">פעיל ותקין</p>
            <span className="text-[11px] text-emerald-600 font-medium mt-2 flex items-center gap-1">
              ללא חריגות <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountStatus;
