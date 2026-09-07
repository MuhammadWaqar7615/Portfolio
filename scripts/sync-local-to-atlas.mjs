import mongoose from "mongoose";

const LOCAL_URI = process.env.LOCAL_MONGODB_URI || "mongodb://127.0.0.1:27017/portfolio";
const ATLAS_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://mwaqar7615_db_user:rAiR5YowQAAJi1Cv@cluster0.50vmgqk.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0";

const COLLECTIONS = [
  "projects",
  "experiences",
  "educations",
  "skills",
  "sitethemes",
  "sitemetadatas",
];

async function sync() {
  console.log("Connecting to Local MongoDB:", LOCAL_URI);
  const localConn = await mongoose.createConnection(LOCAL_URI).asPromise();
  console.log("✓ Connected to Local MongoDB");

  console.log("Connecting to Atlas MongoDB:", ATLAS_URI.replace(/:([^:@]+)@/, ":****@"));
  const atlasConn = await mongoose.createConnection(ATLAS_URI).asPromise();
  console.log("✓ Connected to Atlas MongoDB");

  for (const colName of COLLECTIONS) {
    try {
      const localCol = localConn.collection(colName);
      const docs = await localCol.find({}).toArray();
      console.log(`Found ${docs.length} documents in local '${colName}'`);

      if (docs.length > 0) {
        const atlasCol = atlasConn.collection(colName);
        // Clean out existing and insert current local docs
        await atlasCol.deleteMany({});
        await atlasCol.insertMany(docs);
        console.log(`✓ Synced ${docs.length} documents to Atlas '${colName}'`);
      }
    } catch (err) {
      console.error(`Error syncing collection ${colName}:`, err.message);
    }
  }

  await localConn.close();
  await atlasConn.close();
  console.log("\nAll data successfully synced from local MongoDB to MongoDB Atlas!");
}

sync().catch((err) => {
  console.error("Sync failed:", err);
  process.exit(1);
});
