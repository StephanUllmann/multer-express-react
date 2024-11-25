import multer, { diskStorage } from 'multer';

const FILE_CAP = 1_048_576 * 2; // 2mb
const ALLOWED_EXT = ['jpeg', 'jpg', 'webp', 'avif', 'png'];

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/upload');
  },
  filename: (req, file, cb) => {
    // console.log(file);
    const uniqueSuffix = Math.round(Math.random() * 1e9) + '-' + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const limits = {
  fileSize: FILE_CAP,
};

const fileFilter = (req, file, cb) => {
  console.log(file);
  const [type, ext] = file.mimetype.split('/');

  if (type !== 'image') {
    const err = new Error('Only images allowed');
    err.statusCode = 400;
    cb(err);
  } else if (!ALLOWED_EXT.includes(ext)) {
    const err = new Error(`Only images allowed: ${ALLOWED_EXT.join(', ')}`);
    err.statusCode = 400;
    cb(err);
  } else {
    cb(null, true);
  }
};

const upload = multer({ storage, limits, fileFilter });
// const upload = multer({ dest: './public/upload' });

export default upload;
