const multer = require('multer');
const path = require('path');
const fs = require('fs');

const folder = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, folder),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1000000);
    cb(null, 'record-' + unique + path.extname(file.originalname));
  },
});

const allowed = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

const fileFilter = (req, file, cb) => {
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Sirf photo ya PDF upload kar sakte ho'));
  }
};

const recordUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports = recordUpload;