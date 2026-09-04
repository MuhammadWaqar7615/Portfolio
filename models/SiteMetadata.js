import mongoose from "mongoose";

const SiteMetadataSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Site title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Site description is required"],
      trim: true,
    },
    ogImage: {
      type: String,
      default: null,
      trim: true,
    },
    canonicalUrl: {
      type: String,
      default: "https://muhammad-waqar.me",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.SiteMetadata || mongoose.model("SiteMetadata", SiteMetadataSchema);
