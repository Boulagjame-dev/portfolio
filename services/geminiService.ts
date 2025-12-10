import { GoogleGenAI } from "@google/genai";
import { ContentGeneratorParams, Project } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found. AI features will be limited.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateContent = async (params: ContentGeneratorParams): Promise<string | Project[]> => {
  const ai = getClient();
  if (!ai) return "AI Service Unavailable";

  const modelId = "gemini-2.5-flash";

  try {
    if (params.type === 'linkedin_scrape_sim') {
      // Simulate scraping based on the profile description provided in the prompt
      const response = await ai.models.generateContent({
        model: modelId,
        contents: `
          You are acting as a specialized scraper and parser.
          Based on this professional profile context: "${params.prompt}"
          
          Generate 3 hypothetical, highly detailed, and impressive portfolio projects that this person (an AI Workflow & Automation Specialist) would likely have completed.
          Focus on tools like n8n, Make.com, Zapier, Python, and LLMs.
          
          Return ONLY a valid JSON array of objects. No markdown code blocks.
          Format:
          [
            {
              "id": "generate-uuid",
              "title": "Project Title",
              "description": "Short punchy description",
              "tags": ["tag1", "tag2"],
              "caseStudy": "A longer paragraph describing the problem and solution."
            }
          ]
        `,
        config: {
          responseMimeType: "application/json"
        }
      });
      
      const text = response.text || "[]";
      try {
         return JSON.parse(text);
      } catch (e) {
         console.error("Failed to parse JSON", e);
         return [];
      }
    } 
    
    if (params.type === 'project') {
      const response = await ai.models.generateContent({
        model: modelId,
        contents: `Enhance this project description for a high-end tech portfolio. Make it sound professional, innovative, and results-oriented: ${params.prompt}`,
      });
      return response.text || "";
    }

    return "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};