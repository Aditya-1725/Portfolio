const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
  getProjects,
  createProject,
  deleteProject,
  getProjectById,
  updateProject,
} = require("../controllers/projectController");

router.get("/", getProjects);

router.get("/:id", getProjectById);

router.post(
  "/",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "screenshots",
      maxCount: 10,
    },
  ]),
  createProject
);

router.put(
  "/:id",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "screenshots",
      maxCount: 10,
    },
  ]),
  updateProject
);

router.delete("/:id", deleteProject);

module.exports = router;