import Job from '../models/Job';
import Image from '../models/Image';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import fs from 'fs';
import multer from 'multer';

/**
 * Create a job
 * @param req
 * @param res
 * @returns void
 */
export function createUpload(req, res) {
  var newItem = new Item();
  newItem.img.data = fs.readFileSync(req.files.userPhoto.path);
  newItem.img.contentType = 'image/png';
  newItem.save();
}

/**
 * Create a job
 * @param req
 * @param res
 * @returns void
 */
export function getUploads(req, res) {
  var newItem = new Item();
  newItem.img.data = fs.readFileSync(req.files.userPhoto.path);
  newItem.img.contentType = 'image/png';
  newItem.save();
}

/**
 * Create a job
 * @param req
 * @param res
 * @returns void
 */
export function getUpload(req, res) {
  var newItem = new Item();
  newItem.img.data = fs.readFileSync(req.files.userPhoto.path);
  newItem.img.contentType = 'image/png';
  newItem.save();
}

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({
  storage: storage,
});

router.post('/', upload.any(), function(req, res, next) {
  res.send(req.files);

  /*req.files has the information regarding the file you are uploading...
  from the total information, i am just using the path and the imageName to store in the mongo collection(table)
  */
  var path = req.files[0].path;
  var imageName = req.files[0].originalname;

  var imagepath = {};
  imagepath['path'] = path;
  imagepath['originalname'] = imageName;

  //imagepath contains two objects, path and the imageName

  //we are passing two objects in the addImage method.. which is defined above..
  router.addImage(imagepath, function(err) {});
});
