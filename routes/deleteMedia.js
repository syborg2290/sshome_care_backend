const express = require("express");
const router = express.Router();
const { Storage } = require("@google-cloud/storage");

const CLOUD_BUCKET = process.env.CLOUD_BUCKET;
const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.KEYFILE_PATH,
});
const bucket = storage.bucket(CLOUD_BUCKET);

router.post("/deleteImage",  (req, res) => {
    try {
      new Promise((resolve, reject) => {
    var imageurl = req.body["imageUrl"].split("/");
    imageurl = imageurl.slice(4, imageurl.length + 1).join("/");

    storage
        .bucket(GCLOUD_BUCKET)
        .file(imageurl)
        .delete()
        .then((image) => {
            res.status(200).send("Success");
        })
        .catch((e) => {
            reject(e)
        });

});
    
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Error");
  }
});

module.exports = router;