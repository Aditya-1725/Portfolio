const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    tech: {
      type: String,
      required: true,
    },

    github: {
      type: String,
      default: "",
    },

    demo: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },
    screenshots: {
      type: [String],
      default: [],
    },

    category: {
      type: String,
      default: "MERN",
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Project", projectSchema);
