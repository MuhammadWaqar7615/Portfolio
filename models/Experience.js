import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "Role is required"],
      trim: true,
    },
    company: {
      type: String,
      required: [true, "Company is required"],
      trim: true,
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
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

export default mongoose.models.Experience || mongoose.model("Experience", ExperienceSchema);
