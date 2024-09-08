const fs = require('fs');
const { PDFDocument, rgb } = require('pdf-lib');

const generatePDFAndSave = async (message) => {
  // Create a new PDFDocument
  const pdfDoc = await PDFDocument.create();

  // Add a page to the document
  const page = pdfDoc.addPage([600, 800]);
  const { width, height } = page.getSize();
  let yPos = height - 50;

  // Draw the message on the page
  page.drawText(message, {
    x: 50,
    y: yPos,
    size: 12,
    lineHeight: 15,
    maxWidth: width - 100,
  });

  const pdfBytes = await pdfDoc.save();
  const pdfName = 'cart-details.pdf';

  // Save the PDF to the specified path
  const filePath = 'C:/SynergisticIT/MERN/ShoppingCartPDF/' + pdfName;
  fs.writeFileSync(filePath, pdfBytes);

  return pdfBytes;
};

module.exports = {
  generatePDFAndSave,
};
