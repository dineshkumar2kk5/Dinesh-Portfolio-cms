import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables.
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini API.
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });
    console.log("✔ Gemini AI initialized with server-side SDK.");
  } catch (error) {
    console.error("❌ Failed to initialize Gemini client:", error);
  }
} else {
  console.log("ℹ No custom GEMINI_API_KEY found. Operating in offline/heuristic mode.");
}

// ------------------- API ROUTES -------------------

// Chat endpoint proxies requests to Gemini's 3.5-flash model.
app.post("/api/chat", async (req: Request, res: Response): Promise<void> => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    res.status(400).json({ error: "Missing or invalid 'messages' array in request body." });
    return;
  }

  const systemPrompt = `You are a helpful and polite AI Assistant representing Dinesh Kumar (Java Backend Developer).
You speak in a professional, composed, and objective voice. Do not invent details beyond this context.

Dinesh Kumar's details:
- Role: Java Backend Developer, performance specialist, Spring Boot, database query logic.
- Stats: 110+ advanced algorithmic problems solved, 8+ standalone Java systems built, graduating in 2027.
- Technical Skills: Core Java (8-21), Multi-threading, JVM Memory Tuning, Spring Boot, Spring Data JPA, Spring Security, Hibernate ORM, SQL, PostgreSQL, MySQL, Redis Cache, Docker, Maven, Gradle, JUnit 5, Mockito, C++, Python, Git.
- Education: Siddartha Institute of Science and Technology, Puttur (SISTK), B.Tech CSE (Full Stack AI focus), CGPA: 8.06/10.0, Class of 2027.
- Certifications: Java Backend Developer Certification (Oracle Academy / SISTK), AWS Certified Developer - Associate.
- Projects: MedSync Enterprise Backend (Spring Boot & PostgreSQL), JVM Metric Dispatcher, J-VCS Version Engine, SmartTelemetry Monitor (Spring & React).

Guidelines for answers:
- Act direct and humble.
- Suggest checking out Dinesh's portfolio details, downloading his software developer resume CV, or asking specific questions about his respective backend engineering or systems projects.
- Do not make up facts outside his profile elements. Keep it concise (1-3 lines).`;

  const query = (messages[messages.length - 1]?.content || "").toLowerCase();

  const getHeuristicResponse = (text: string): string => {
    if (text.includes("dinesh") || text.includes("java") || text.includes("spring") || text.includes("hibernate") || text.includes("backend")) {
      return "Dinesh Kumar is an aspiring Java Backend Developer graduating in 2027 from SISTK. He specializes in building robust APIs and multi-tier systems with Spring Boot, Hibernate, and PostgreSQL, focusing on concurrency and memory performance.";
    }
    if (text.includes("medsync") || text.includes("hospital") || text.includes("telemetry") || text.includes("vcs")) {
      return "Dinesh's key Java projects include MedSync (a secure Spring Boot & PostgreSQL API suite), JVM Metric Dispatcher (tracking thread and heap safety), and J-VCS (a standalone version-control simulator built on Java NIO).";
    }
    if (text.includes("dsa") || text.includes("problems") || text.includes("algorithms") || text.includes("leetcode")) {
      return "Dinesh Kumar has solved over 110 advanced data structure and algorithm challenges across LeetCode and GeeksForGeeks, analyzing computational complexities in Java.";
    }
    if (text.includes("graduation") || text.includes("2027") || text.includes("fresher")) {
      return "Dinesh Kumar is a motivated fresher graduating in 2027 (B.Tech Computer Science & Engineering) from Siddartha Institute of Science and Technology, Puttur (SISTK), carrying a CGPA of 8.06/10.0.";
    }
    if (text.includes("contact") || text.includes("hire") || text.includes("email") || text.includes("linkedin")) {
      return "Dinesh Kumar can be reached at dineshkumar2kk5@gmail.com, or via LinkedIn. Connect with him for developer roles or Spring Boot backend collaborations!";
    }
    if (text.includes("resume") || text.includes("cv") || text.includes("download")) {
      return "You can download Dinesh's developer resume CV using the interactive buttons on this page!";
    }
    if (text.includes("certification") || text.includes("oracle") || text.includes("aws")) {
      return "Dinesh Kumar holds the Java Backend Developer Certification from Oracle Academy / SISTK (2025) and is an AWS Certified Developer - Associate (2025).";
    }
    return "I am the interactive portfolio AI assistant for Dinesh Kumar (Java Backend Dev, expected '27). Ask me anything about his backend systems, Spring Boot microservices, or academic profile at SISTK!";
  };

  if (!ai) {
    const reply = getHeuristicResponse(query);
    res.json({ reply });
    return;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: {
        parts: [{ text: `System context: ${systemPrompt}\n\nUser conversation history so far. Reply following the instructions.\nUser Query: ${query}` }]
      },
      config: {
        temperature: 0.7,
        maxOutputTokens: 250,
      }
    });

    const reply = response.text || getHeuristicResponse(query);
    res.json({ reply });
  } catch (error) {
    console.error("Gemini production error, switching to backup engine:", error);
    const reply = getHeuristicResponse(query);
    res.json({ reply });
  }
});

app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "healthy", apiMode: ai ? "gemini-cloud" : "heuristic-offline" });
});

// ----------------- VITE MIDDLEWARE & STATIC SERVING -----------------

async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("✔ Vite development middleware mounted close to Express.");
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log(`✔ Production static files routed from: ${distPath}`);
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 React Portfolio server launched and listening on http://localhost:${PORT}`);
  });

  server.on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      const FALLBACK_PORT = 3001;
      console.log(`Port ${PORT} is busy, switching to http://localhost:${FALLBACK_PORT}...`);
      app.listen(FALLBACK_PORT, "0.0.0.0", () => {
        console.log(`🚀 React Portfolio server launched and listening on http://localhost:${FALLBACK_PORT}`);
      });
    } else {
      console.error("Server error:", err);
    }
  });
}

if (process.env.VERCEL !== "1") {
  bootstrap().catch((err) => {
    console.error("Fatal server boot failure:", err);
  });
}

export default app;
