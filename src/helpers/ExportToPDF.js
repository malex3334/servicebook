import pdfmake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
// Register fonts
pdfmake.vfs = pdfFonts.pdfMake.vfs;

const exportToPdf = async (car, sum) => {
  //
  const tableCarData = car;

  // Get the HTML table element
  const table = document.getElementById("myTable");

  // Extract data from the HTML table
  const tableData = [];
  const rows = table.querySelectorAll("tr");
  rows.forEach((row) => {
    const rowData = [];
    const cells = row.querySelectorAll("td, th");
    cells.forEach((cell, index) => {
      // Exclude columns 6, 7, 8, and 9 (index 5, 6, 7, and 8 in a zero-based index)
      if (index !== 5 && index !== 8 && index !== 9) {
        rowData.push(cell.innerText.trim());
      }
    });
    tableData.push(rowData);
  });

  // Fetch the image and convert it to dataURL
  const response = await fetch(car.img);
  const blob = await response.blob();
  const dataURL = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });

  // Check if widths match the number of columns in the table
  const numColumns = tableData.length > 0 ? tableData[0].length : 0;
  const widths = Array(numColumns).fill("*");
  console.log(widths);

  // Define document content with a title
  const docDefinition = {
    content: [
      // check if dataURL is correct - if not skip image
      dataURL.length > 100
        ? {
            image: dataURL, // Use the image property to include an image
            width: 500, // Adjust the width as needed
            alignment: "center",
            // height: 400, // Adjust the height as needed
            // absolutePosition: { x: 10, y: 10 }, // Adjust the position as needed
          }
        : null,

      {
        text: "Książka serwisowa", // Add your title here
        fontSize: 36,
        bold: true,
        margin: [0, 10, 0, 10], // Adjust margin as needed
        alignment: "center",
      },
      {
        text: `${car.brand} ${car.model}, ${car.year}`, // Add your title here
        fontSize: 26,
        bold: true,
        margin: [0, 10, 0, 20], // Adjust margin as needed
        alignment: "center",
      },
      {
        text: "mycarservice.netlify.app", // Add your title here
        link: "https://mycarservice.netlify.app",
        fontSize: 14,
        italics: true,
        // margin: [0, 20, 0, 10], // Adjust margin as needed
        margin: [0, 0, 0, 10], // Adjust margin as needed
        alignment: "center",
      },
      { text: " ", pageBreak: "after" }, // Add an empty text element to force a new page

      {
        layout: "lightHorizontalLines", // optional

        table: {
          headerRows: 1,
          // widths: widths, // Ensure widths match the number of columns
          widths: [25, 175, 75, 200, 60, 55, 60],
          body: tableData,
          alignment: "center",
        },
      },
      {
        text: sum + " zł", // Add your title here
        fontSize: 18,
        bold: true,
        // margin: [0, 20, 0, 10], // Adjust margin as needed
        margin: [0, 0, 10, 10], // Adjust margin as needed
        alignment: "right",
      },
      {
        text: "mycarservice.netlify.app", // Add your title here
        link: "https://mycarservice.netlify.app",
        fontSize: 14,
        italics: true,
        // margin: [0, 20, 0, 10], // Adjust margin as needed
        margin: [0, 20, 0, 10], // Adjust margin as needed
        alignment: "center",
      },
    ],

    pageOrientation: "landscape",
  };

  // Create PDF and download
  pdfmake
    .createPdf(docDefinition)
    .download(`${car.brand} ${car.model}, ${car.year}`);
};

export default exportToPdf;
