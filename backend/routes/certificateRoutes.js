const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
} = require("../controllers/certificateController");

router.get("/", getCertificates);

router.post("/", upload.single("image"), createCertificate);

router.put("/:id", upload.single("image"), updateCertificate);

router.delete("/:id", deleteCertificate);

module.exports = router;
