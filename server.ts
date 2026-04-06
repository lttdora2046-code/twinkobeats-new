import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET || "tinkobeats_secret_key_123";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(cors());
  app.use(express.json());

  // MongoDB Connection
  const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/tinkobeats";
  let dbClient: MongoClient | null = null;
  let db: Db | null = null;

  async function getDb() {
    if (!dbClient) {
      try {
        dbClient = new MongoClient(MONGODB_URI);
        await dbClient.connect();
        db = dbClient.db();
        console.log("Connected to MongoDB");
        await bootstrap(db);
      } catch (error) {
        console.error("MongoDB connection error:", error);
      }
    }
    return db;
  }

  async function bootstrap(database: Db) {
    // Bootstrap Admin
    const admins = database.collection("admins");
    const adminExists = await admins.findOne({ username: "admin" });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("123456", 10);
      await admins.insertOne({ username: "admin", password: hashedPassword });
      console.log("Admin user bootstrapped");
    }

    // Bootstrap Content
    const content = database.collection("content");
    const contentExists = await content.findOne({ id: "homepage" });
    if (!contentExists) {
      await content.insertOne({
        id: "homepage",
        hero: {
          title: "Craft Your Sparkle One Bead at a Time",
          subtitle: "Discover a world of colorful beads, unique finished products, and unforgettable creative events.",
          image: "https://picsum.photos/seed/beads/800/800"
        },
        about: {
          title: "Our Story: tinkobeats",
          text1: "tinkobeats was born out of a passion for small things that make a big difference. We believe that beads are more than just accessories; they are tiny vessels of creativity and joy.",
          text2: "Our mission is to provide high-quality materials and a welcoming space for everyone to explore their artistic side. From our retail shop to our lively events, we're here to help you craft your own sparkle.",
          image: "https://picsum.photos/seed/about/800/600"
        }
      });
      console.log("Initial content bootstrapped");
    }
  }

  // Middleware for Admin Auth
  const authenticateAdmin = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.admin = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  };

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "tinkobeats API is running" });
  });

  // Admin Login
  app.post("/api/admin/login", async (req, res) => {
    const { username, password } = req.body;
    try {
      const database = await getDb();
      if (!database) return res.status(500).json({ error: "Database not connected" });
      const admin = await database.collection("admins").findOne({ username });
      if (!admin || !(await bcrypt.compare(password, admin.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const token = jwt.sign({ id: admin._id, username: admin.username }, JWT_SECRET, { expiresIn: "1d" });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  // Content Management
  app.get("/api/content", async (req, res) => {
    try {
      const database = await getDb();
      if (!database) return res.status(500).json({ error: "Database not connected" });
      const content = await database.collection("content").findOne({ id: "homepage" });
      res.json(content);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch content" });
    }
  });

  app.post("/api/content", authenticateAdmin, async (req, res) => {
    try {
      const database = await getDb();
      if (!database) return res.status(500).json({ error: "Database not connected" });
      await database.collection("content").updateOne({ id: "homepage" }, { $set: req.body }, { upsert: true });
      res.json({ message: "Content updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update content" });
    }
  });

  app.get("/api/products", async (req, res) => {
    try {
      const database = await getDb();
      if (!database) return res.status(500).json({ error: "Database not connected" });
      const products = await database.collection("products").find({}).toArray();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
