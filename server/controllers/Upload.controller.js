import Job from '../models/Job';
import Image from '../models/Image';
import fs from 'fs';
import multer from 'multer';
import jimp from 'jimp';
import uuid from 'uuid';

export const createUpload = (req, res, next) => {
  console.log('createUpload', req.body);
};

// multer options
export const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');

    console.log(file);
    console.log(isPhoto);
    if (isPhoto) {
      next(null, true);
    } else {
      next({
        message: `The filetype ${file.mimetype} is not allowed`,
      });
    }
  },
};

// create middleware to be used before uploadeing
export const upload = multer(multerOptions).single('photo');

// jimp resize middleware
export const resize = async (req, res, next) => {
  // if (!req.file) {
  //   next();
  //   return;
  // }

  // const extension = req.file.mimetype.split('/')[1];
  // req.body.photo = `${uuid.v4()}.${extension}`;

  // const photo = await jimp.read(req.file.buffer);
  // await photo.resize(250, jimp.AUTO);
  // await photo.write(`./public/uploads/${req.body.photo}`);

  next();
};
