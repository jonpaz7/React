function PrintAsPDF({ PDFData }) {
  const printPDF = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    doc.text(PDFData, 10, 10);
    doc.save("AccountHistory");
  };

  return (
    <>
      <button onClick={() => printPDF()}>Print history as PDF</button>
    </>
  );
}
export default PrintAsPDF;
