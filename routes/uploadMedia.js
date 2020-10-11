const express = require("express");
const router = express.Router();
const { sendUploadToGCS } = require("../uploadGCS.js");
// npm multer
var multer = require("multer");

const Multer = multer({
  // storage: multer.memoryStorage,
  limits: 5 * 1024 * 1024,
});

router.post(
  "/uploadImage",
  Multer.array("image", 1),
  sendUploadToGCS,
  (req, res, next) => {
    try {
      res
        .status(200)
        .json({ publicUrl: req.files[0]["cloudStoragePublicUrl"] });
    } catch (e) {
      console.log(e);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
