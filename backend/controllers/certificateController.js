const Certificate = require("../models/Certificate");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const uploadToCloudinary = (
  buffer,
  folder = "portfolio/certificates"
) => {
  return new Promise((resolve, reject) => {
    const stream =
      cloudinary.uploader.upload_stream(
        {
          folder,
        },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

    streamifier
      .createReadStream(buffer)
      .pipe(stream);
  });
};

const getCertificates = async (
  req,
  res
) => {
  try {
    const certificates =
      await Certificate.find();

    res.json(certificates);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createCertificate = async (
  req,
  res
) => {
  try {
    let image = "";

    if (
      req.file
    ) {
      const uploadedImage =
        await uploadToCloudinary(
          req.file.buffer
        );

      image =
        uploadedImage.secure_url;
    }

    const certificate =
      await Certificate.create({
        title: req.body.title,
        issuer: req.body.issuer,
        issueDate:
          req.body.issueDate,
        image,
      });

    res.status(201).json(
      certificate
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateCertificate = async (
  req,
  res
) => {
  try {
    const certificate =
      await Certificate.findById(
        req.params.id
      );

    if (!certificate) {
      return res
        .status(404)
        .json({
          message:
            "Certificate not found",
        });
    }

    let image =
      certificate.image;

    if (
      req.file
    ) {
      const uploadedImage =
        await uploadToCloudinary(
          req.file.buffer
        );

      image =
        uploadedImage.secure_url;
    }

    const updatedCertificate =
      await Certificate.findByIdAndUpdate(
        req.params.id,
        {
          title:
            req.body.title,
          issuer:
            req.body.issuer,
          issueDate:
            req.body.issueDate,
          image,
        },
        {
          new: true,
        }
      );

    res.json(
      updatedCertificate
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteCertificate = async (
  req,
  res
) => {
  try {
    await Certificate.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Certificate deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
};