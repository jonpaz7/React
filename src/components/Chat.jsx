import { useState } from "react";
import { useBankData, useBankActions } from "../context/BankContext";
import { MessageSquare, Send, X, User, ChevronDown, ChevronUp, Bot } from "lucide-react";

function Chat() {
  const { sendMessage } = useBankActions();
  const { accounts, currentUser, isAdminLoggedIn } = useBankData();

  const [message, setMessage] = useState("");
  const [selectedAccountNumber, setSelectedAccountNumber] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const activeChatAccount = isAdminLoggedIn
    ? accounts.find((acc) => acc.accountNumber === selectedAccountNumber) || null
    : currentUser;

  const handleSend = () => {
    if (!message.trim() || !activeChatAccount) return;
    sendMessage(message, activeChatAccount.accountNumber);
    setMessage("");
  };

  if (!currentUser) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start font-sans">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="cursor-pointer group flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
          </div>
          <span className="font-semibold text-sm">
            {isAdminLoggedIn ? "תמיכה וצ'אט לקוחות" : "צ'אט עם בנקאי"}
          </span>
        </button>
      )}

      {/* Expanded Chat Box */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[460px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in zoom-in-95 fade-in duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                {isAdminLoggedIn ? <MessageSquare className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight">
                  {isAdminLoggedIn
                    ? activeChatAccount
                      ? `שיחה עם ${activeChatAccount.ownerName}`
                      : "רשימת פניות לקוחות"
                    : "תמיכה בנקאית מקוונת"}
                </h3>
                <span className="text-[10px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 inline-block" /> נציג זמין
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="cursor-pointer p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/90"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Admin selection screen vs Conversation */}
          {isAdminLoggedIn && !activeChatAccount ? (
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-slate-50">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                בחר חשבון לשיחה:
              </p>
              {accounts.map((acc) => (
                <div
                  key={acc.accountNumber}
                  className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-2xs hover:border-emerald-500 hover:shadow-xs transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-600">
                      {acc.ownerName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{acc.ownerName}</p>
                      <p className="text-[11px] font-mono text-slate-400">#{acc.accountNumber}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedAccountNumber(acc.accountNumber)}
                    className="cursor-pointer px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 text-xs font-semibold transition-all border border-emerald-200"
                  >
                    שוחח
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Message History */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
                {activeChatAccount?.chatHistory?.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4 text-slate-400">
                    <MessageSquare className="w-8 h-8 mb-2 opacity-30 text-emerald-600" />
                    <p className="text-xs">אין עדיין הודעות בשיחה זו.</p>
                    <p className="text-[11px] mt-1">כתוב הודעה ראשונה מטה!</p>
                  </div>
                ) : (
                  activeChatAccount?.chatHistory?.map((row) => {
                    const isAdminMsg = row.senderAccount === "admin";
                    return (
                      <div
                        key={row.msgID}
                        className={`flex flex-col ${isAdminMsg ? "items-end" : "items-start"}`}
                      >
                        <span className="text-[10px] text-slate-400 mb-0.5 px-1 font-medium">
                          {isAdminMsg ? "מנהל בנק" : activeChatAccount.ownerName}
                        </span>
                        <div
                          className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed shadow-2xs ${
                            isAdminMsg
                              ? "bg-emerald-600 text-white rounded-br-xs"
                              : "bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs"
                          }`}
                        >
                          {row.text}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Message Input Bottom Bar */}
              <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
                {isAdminLoggedIn && (
                  <button
                    onClick={() => setSelectedAccountNumber(null)}
                    title="חזרה לרשימת הלקוחות"
                    className="cursor-pointer p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200 shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                <input
                  type="text"
                  placeholder={isAdminLoggedIn ? "כתוב הודעה ללקוח..." : "במה נוכל לעזור היום?..."}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 placeholder-slate-400"
                />

                <button
                  onClick={handleSend}
                  className="cursor-pointer p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/30 transition-all shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Chat;
