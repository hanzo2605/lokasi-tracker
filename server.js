const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/save-location', (req, res) => {
  const data = req.body;
  console.log('Lokasi diterima:', data);

  const log = `${new Date().toISOString()} - ${JSON.stringify(data)}\n`;
  fs.appendFile('log-lokasi.txt', log, (err) => {
    if (err) {
      console.error('Gagal menyimpan lokasi:', err);
      return res.status(500).send('Gagal menyimpan lokasi');
    }
    res.send('Lokasi disimpan');
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
