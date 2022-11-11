import multer from 'multer';
import path from 'path';

// Where files are stored and how they are named
const storageEngine = multer.diskStorage({
  destination: './images',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

//initializing multer
export const upload = multer({
  storage: storageEngine,
  limits: { fileSize: 3000000 }, // 3MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

const checkFileType = (file: Express.Multer.File, cb: any) => {
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png|gif|svg/;
  //check extension names
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);
  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb('Error: You can only upload Images');
  }
};
