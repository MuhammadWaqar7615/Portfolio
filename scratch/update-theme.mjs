import mongoose from "mongoose";
import fs from "fs";

const envFile = fs.readFileSync(".env.local", "utf8");
let uri = "mongodb://127.0.0.1:27017/portfolio";
for (const line of envFile.split("\n")) {
  if (line.startsWith("MONGODB_URI=")) {
    uri = line.replace("MONGODB_URI=", "").trim().replace(/^['"]|['"]$/g, "");
  }
}

const conn = await mongoose.createConnection(uri).asPromise();
const res = await conn.collection("sitethemes").updateOne(
  {},
  {
    $set: {
      presetId: "preset-1",
      colors: {
        primary: "#06090e",
        accent: "#1fc3ff",
        background: "#06090e",
        text: "#d1d5db",
        headingColor: "#ffffff",
        cardBg: "#0a0f19",
      },
      lightColors: {
        primary: "#06090e",
        accent: "#1fc3ff",
        background: "#06090e",
        text: "#d1d5db",
        headingColor: "#ffffff",
        cardBg: "#0a0f19",
      },
      typography: {
        headingFont: "Fugaz One",
        bodyFont: "Open Sans",
      },
      radius: "rounded",
      spacing: "cozy",
    },
  }
);
console.log("Updated sitethemes successfully:", res.modifiedCount);
process.exit(0);
