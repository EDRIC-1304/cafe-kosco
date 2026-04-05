import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};
const fbApp = initializeApp(firebaseConfig);
const db = getFirestore(fbApp);

const genAI = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY || "" });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Mission Control is online." });
  });

  app.post("/api/chat", async (req, res) => {
    const { message } = req.body;
    
    if (!process.env.VITE_GEMINI_API_KEY) {
      return res.status(500).json({ error: "VITE_GEMINI_API_KEY is not configured." });
    }
    
    let dynamicMenu = "";
    try {
      const docSnap = await getDoc(doc(db, "systemSettings", "products"));
      if (docSnap.exists() && docSnap.data().items) {
        const items = docSnap.data().items;
        dynamicMenu = "Menu & Pricing (₹):\n";
        
        const categories = [...new Set(items.map((i: any) => i.category))];
        categories.forEach((cat) => {
          const catItems = items.filter((i: any) => i.category === cat);
          const mapped = catItems.map((i: any) => `${i.name} (${i.price})`).join(", ");
          dynamicMenu += `- ${cat}: ${mapped}.\n`;
        });
      }
    } catch (err) {
      console.error("Firestore menu fetch err:", err);
    }

    try {
      const model = "gemini-3-flash-preview";
      const response = await genAI.models.generateContent({
        model,
        contents: message,
        config: {
          systemInstruction: `You are Kosco AI, the precision brewing guide for Café Kosco. 
          Your personality is futuristic, helpful, and uses cosmic/space-themed terminology (e.g., "mission control", "galactic ascent", "docking station", "fuel source").
          
          Operational Base: Aldona, Bardez, Goa (Near Aldona Church).
          Timings: 06:00 AM to 07:00 PM daily (Open all days including holidays).
          
          ${dynamicMenu ? dynamicMenu : `Menu & Pricing (₹):
          - Coffee: Espresso (100), Cappuccino (120), Latte (140), Americano (110), Mocha (160), Cold Coffee (150).
          - Beverages: Iced Tea (90), Lemon Soda (70), Hot Chocolate (130), Fresh Lime Juice (80).
          - Snacks: Chicken Sandwich (110), Grilled Chicken Sandwich (140), Chicken Wrap (160), French Fries (100), Garlic Bread (110), Chicken Burger (150).
          - Desserts: Brownie (120), Cheesecake (180), Chocolate Muffin (90), Ice Cream Sundae (150).
          - Special Menu: Caramel Frappe (170), Peri Peri Fries (120), Chicken Tandoori Pizza (240).`}
          
          Site Coordinates (Routes):
          - Home: /
          - Menu: /menu
          - Contact: /contact
          - Auth (Login/Register): /auth
          - Profile: /profile
          
          If a user asks about their account or profile, guide them to /auth or /profile.
          If they ask about coffee or food, guide them to /menu.
          Be concise and professional. Use the provided café data only.`,
        }
      });

      res.json({ text: response.text });
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "Failed to process transmission." });
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
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Mission Control running on http://localhost:${PORT}`);
  });
}

startServer();
