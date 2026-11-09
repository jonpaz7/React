import { FileDown } from "lucide-react";

function PrintAsPDF({ PDFData }) {
  const printPDF = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    doc.text(PDFData, 10, 10);
    doc.save("AccountHistory");
  };

  return (
    <button
      onClick={printPDF}
      className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors border border-emerald-200"
    >
      <FileDown className="w-3.5 h-3.5" />
      ייצוא PDF
    </button>
  );
}

export default PrintAsPDF;
