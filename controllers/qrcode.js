import QRCode from 'qrcode';
import fs from 'fs';

const url = 'https://qr.grewox.in/dynamic/1';  // The URL you want to encode into a QR code
const filePath = './qrcode.png';  // Path where you want to save the QR code image

QRCode.toFile(filePath, url, (err) => {
  if (err) {
    console.error('Error generating QR code:', err);
    return;
  }
  console.log(`QR Code saved as ${filePath}`);
});