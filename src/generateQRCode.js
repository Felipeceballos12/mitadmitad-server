const qr = require('qrcode');

// Function to generate QR code with endpoint URL
async function generateQRCode(id) {
  try {
    const qrImage = await qr.toDataURL(id);

    return {
      hasError: false,
      data: qrImage,
    };
  } catch (error) {
    console.error('Error generating QR code:', error);
    return {
      hasError: true,
      message: `Error generating QR code:', ${error}`,
    };
  }
}

module.exports = generateQRCode;
