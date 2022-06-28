const multer = require('multer');
const { typeFile } = require('../constants');

const storage = multer.diskStorage({
  destination: (_req, file, callBack) => {
    callBack(null, 'public/');
  },
  filename: (_req, file, callBack) => {
    const uniqueSuffix = `${Date.now() + file.originalname}`;
    callBack(null, uniqueSuffix);
  },
});

const upload = multer({
  storage,
  fileFilter: (_req, file, callBack) => {
    if (file.mimetype === typeFile.PNG || file.mimetype === typeFile.JPG || file.mimetype === typeFile.JPEG)
      callBack(null, true);
    else {
      callBack(null, false);
      return callBack(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

module.exports = upload;
