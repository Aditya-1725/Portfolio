const Experience = require("../models/Experience");

const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find();

    res.json(experiences);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createExperience = async (req, res) => {
  try {
    const experience = await Experience.create(req.body);

    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );

    res.json(experience);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteExperience = async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);

    res.json({
      message: "Experience deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
};