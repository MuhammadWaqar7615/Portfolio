import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      required: [true, "Degree is required"],
      trim: true,
    },
    institution: {
      type: String,
      required: [true, "Institution is required"],
      trim: true,
    },
    year: {
      type: String,
      required: [true, "Year is required"],
      trim: true,
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

export default mongoose.models.Education || mongoose.model("Education", EducationSchema);
