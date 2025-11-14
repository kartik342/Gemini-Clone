import { GoogleGenerativeAI } from "@google/generative-ai";

async function runChat(prompt) {
    try {
        const res = await fetch("https://gemini-clone-xgj6.onrender.com/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
        });

        const data = await res.json();

        console.log("Gemini Response ->", data.text);
        return data.text;
    } 
    catch (err) {
        console.error("Error calling backend:", err);
        return "Something went wrong.";
    }
}

export default runChat;
