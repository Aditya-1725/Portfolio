const Project = require("../models/Project");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const uploadToCloudinary = (buffer, folder = "portfolio/projects") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
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

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createProject = async (req, res) => {
  try {
    let image = "";
    let screenshots = [];

    // Upload Cover Image
    if (req.files && req.files.image) {
      const uploadedImage = await uploadToCloudinary(
        req.files.image[0].buffer
      );

      image = uploadedImage.secure_url;
    }

    // Upload Multiple Screenshots
    if (req.files && req.files.screenshots) {
      for (const file of req.files.screenshots) {
        const uploadedScreenshot =
          await uploadToCloudinary(file.buffer);

        screenshots.push(
          uploadedScreenshot.secure_url
        );
      }
    }

    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      tech: req.body.tech,
      github: req.body.github,
      demo: req.body.demo,
      category: req.body.category,
      featured: req.body.featured === "true",
      image,
      screenshots,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    let image = project.image;
    let screenshots = project.screenshots;

    // Replace cover image if new one uploaded
    if (req.files && req.files.image) {
      const uploadedImage = await uploadToCloudinary(
        req.files.image[0].buffer
      );

      image = uploadedImage.secure_url;
    }

    // Replace screenshots if new ones uploaded
    if (
      req.files &&
      req.files.screenshots &&
      req.files.screenshots.length > 0
    ) {
      screenshots = [];

      for (const file of req.files.screenshots) {
        const uploadedScreenshot =
          await uploadToCloudinary(file.buffer);

        screenshots.push(
          uploadedScreenshot.secure_url
        );
      }
    }

    const updatedProject =
      await Project.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          description: req.body.description,
          tech: req.body.tech,
          github: req.body.github,
          demo: req.body.demo,
          category: req.body.category,
          featured: req.body.featured === "true",
          image,
          screenshots,
        },
        {
          new: true,
        }
      );

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};