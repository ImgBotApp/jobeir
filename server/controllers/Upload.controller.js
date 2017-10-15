import multer from 'multer';
import jimp from 'jimp';
import uuid from 'uuid';

export const createUpload = (req, res, next) => {
  res.status(200).send({
    data: {},
    errors: []
  });
};

// multer options
const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: "That filetype isn't allowed!" }, false);
    }
  }
};

// create middleware to be used before uploading
export const upload = multer(multerOptions).single('logo');

// jimp resize middleware
export const resize = async (req, res, next) => {
  if (!req.file) return next();

  const original = req.file.originalname.split('.')[0];
  const extension = req.file.mimetype.split('/')[1];

  req.body.logo = `${uuid.v4()}-${original.toLowerCase()}.${extension}`;
  const path = `./public/uploads/${req.params.id}/${req.params.section}/${req
    .body.logo}`;
  const savedPath = `/public/uploads/${req.params.id}/${req.params
    .section}/${req.body.logo}`;
  req.body.path = savedPath;

  const photo = await jimp.read(req.file.buffer);
  await photo.resize(500, jimp.AUTO);
  await photo.write(path);

  next(null, req);
};
