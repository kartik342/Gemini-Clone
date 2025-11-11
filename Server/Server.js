import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Initialize Gemini client with your API key
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ✅ Define a GET route (for quick testing)
// app.get("/api/gemini", async (req, res) => {
//   try {
//     // You can hardcode or later take prompt from query/body
//     console.log("Request body:", req.body); 
//     const { prompt } = req.body;
//     if (!prompt) return res.status(400).json({ error: "Prompt is required" });

//     const response = await ai.models.generateContent({
//       model: "gemini-2.5-flash",
//       contents: prompt,
//     });

//     console.log("Gemini says:", response.text); // Log output in terminal
//     res.json({ text: response.text });
//   } catch (err) {
//     console.error("Gemini Error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

app.get("/", (req, res) => {
  res.send("✅ Gemini backend is running fine!");
});



// ✅ Optional: Add POST route (to send custom prompts)
app.post("/api/gemini", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    // console.log("Gemini Response ->", response.text);
    res.json({ text: response.text });
  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Start the server
app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
