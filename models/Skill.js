import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Skill name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Skill category is required"],
      enum: ["Frontend", "Backend", "Languages & Tools", "AI & Data"],
      default: "Frontend",
    },
    icon: {
      type: String,
      required: [true, "Icon identifier is required"],
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

export default mongoose.models.Skill || mongoose.model("Skill", SkillSchema);
