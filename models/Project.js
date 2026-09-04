import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
    },
    problem: {
      type: String,
      required: [true, "Problem description is required"],
    },
    roleDecisions: {
      type: String,
      required: [true, "Role and decisions are required"],
    },
    techTags: {
      type: [String],
      required: [true, "At least one technology tag is required"],
      default: [],
    },
    codeLink: {
      type: String,
      default: null,
      trim: true,
    },
    liveLink: {
      type: String,
      default: null,
      trim: true,
    },
    coverImage: {
      type: String,
      default: null,
      trim: true,
    },
    status: {
      type: String,
      enum: ["live", "in-progress", "archived"],
      default: "live",
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
