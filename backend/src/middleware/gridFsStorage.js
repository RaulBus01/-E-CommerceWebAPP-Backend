const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
const mongoose = require('mongoose');
const database = require('../config/database.js');

let gfs;

database.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(database.db, { bucketName: 'images' });
  console.log("GFS initialized");
})

const storage = new GridFsStorage({
  db: database,
  file: (req, file) => {
    return {
      bucketName: 'images',
      filename: `${Date.now()}_${file.originalname}`,
      metadata: {
        productId: req.productId,
      }
    };
  },
});

const upload = multer({ storage });

module.exports = { upload, gfs };
