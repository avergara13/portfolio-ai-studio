import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Modality } from "@google/genai";
import { WebSocketServer } from "ws";
import { createServer } from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server, path: "/live" });
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let ai = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// Chat API Endpoint
app.post('/api/chat', async (req, res) => {
  if (!ai) return res.status(500).json({ error: "Gemini API key is not configured." });
  
  try {
    const { message, history, modelType } = req.body;
    
    let model = "gemini-3.5-flash"; // Default
    if (modelType === "complex") model = "gemini-3.1-pro-preview";
    if (modelType === "fast") model = "gemini-3.1-flash-lite";

    const contents = history.map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }]
    }));
    
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: model,
      contents: contents,
      config: {
        systemInstruction: "You are a helpful assistant for Angel Vergara's portfolio. You have three roles based on modelType: pro-preview (complex tasks), flash (general tasks), flash-lite (fast tasks).",
      }
    });

    res.json({ text: response.text });
  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

// Live API WebSocket Endpoint
wss.on("connection", async (clientWs) => {
  if (!ai) {
    clientWs.send(JSON.stringify({ error: "Gemini API key is not configured." }));
    return clientWs.close();
  }

  let session = null;
  try {
    session = await ai.live.connect({
      model: "gemini-3.1-flash-live-preview",
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
        },
        systemInstruction: "You are a helpful AI assistant for Angel Vergara's portfolio site. Be friendly, concise, and conversational.",
      },
      callbacks: {
        onmessage: (message) => {
          const audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
          if (audio) {
            clientWs.send(JSON.stringify({ audio }));
          }
          if (message.serverContent?.interrupted) {
            clientWs.send(JSON.stringify({ interrupted: true }));
          }
        },
      },
    });

    clientWs.on("message", (data) => {
      try {
        const parsed = JSON.parse(data.toString());
        if (parsed.audio) {
          session.sendRealtimeInput({
            audio: { data: parsed.audio, mimeType: "audio/pcm;rate=16000" },
          });
        }
      } catch (err) {
        console.error("Error parsing WS message:", err);
      }
    });
    
    clientWs.on("close", () => {
      if (session) session.close();
    });
  } catch (error) {
    console.error("Live API connection error:", error);
    clientWs.close();
  }
});

app.use(express.static(__dirname, { extensions: ['html'] }));

app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
