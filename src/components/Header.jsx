import { useEffect, useState } from "react";
import getUSDRate from "../utils/getUSDRate.js";
import { Landmark, DollarSign, ShieldCheck } from "lucide-react";

function Header() {
  const [usdRate, setUsdRate] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getUSDRate()
      .then((rate) => {
        if (isMounted) setUsdRate(rate);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-slate-900">
                Discount Direct
              </span>
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded-sm bg-emerald-50 text-emerald-700 border border-emerald-200">
                Digital Bank
              </span>
            </div>
            <p className="text-xs text-slate-400">Secure Online Banking</p>
          </div>
        </div>

        {/* Status / Rates bar */}
        <div className="flex items-center gap-3">
          {usdRate && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>USD / ILS:</span>
              <span className="font-semibold text-slate-900">₪{Number(usdRate).toFixed(2)}</span>
            </div>
          )}

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>256-bit Encrypted</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
