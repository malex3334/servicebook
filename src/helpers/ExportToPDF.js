import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const exportToPdf = async () => {
  // Get the HTML table element
  const table = document.getElementById("myTable");
  const tableContainer = document.querySelector(".table_container");
  const site = document.documentElement;
  // Create a canvas from the table

  tableContainer.scrollTop = 0;
  const canvasSite = await html2canvas(site);
  const canvasTable = await html2canvas(table);

  // Convert the canvas to a data URL
  const dataURLSite = canvasSite.toDataURL();
  const dataURLTable = canvasTable.toDataURL();

  // Create a new PDF document
  const pdf = new jsPDF();

  pdf.addImage(dataURLSite, "JPEG", 10, 10, 190, 0);
  pdf.addPage();
  pdf.addImage(dataURLTable, "JPEG", 10, 10, 190, 0);

  // Save or open the PDF
  pdf.save("table.pdf");
};

export default exportToPdf;

// // ###### TODO - ADJUST PAGES NUMBER TO TABLE HEIGHT
