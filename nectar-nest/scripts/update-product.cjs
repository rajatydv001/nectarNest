const https = require('https');

const SHEET_DB_URL = 'https://sheetdb.io/api/v1/0psnnuem25zf5';

const productData = {
  id: 'ginger-lollipop',
  price_500g: 15,
  price_5units: 50,
  price_1kg: 110,
  image: '/photo2.png'
};

const data = JSON.stringify(productData);

const options = {
  hostname: 'sheetdb.io',
  path: '/api/v1/0psnnuem25zf5/name/ginger-lollipop',
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  let chunks = '';
  res.on('data', (chunk) => chunks += chunk);
  res.on('end', () => {
    console.log('Response:', chunks);
    if (res.statusCode === 200) {
      console.log('Product updated successfully!');
    } else {
      console.log('Update failed. Status:', res.statusCode);
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error.message);
});

req.write(data);
req.end();