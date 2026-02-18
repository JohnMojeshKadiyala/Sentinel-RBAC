
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateSecurityPolicy = async (requirement: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a professional RBAC JSON policy definition for the following requirement: "${requirement}". 
      The response should include a "roleName", "description", and an array of "permissions" (choose from: READ, WRITE, DELETE, ADMIN, EXPORT). 
      Also provide a "securityJustification" explaining why these permissions are appropriate.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            roleName: { type: Type.STRING },
            description: { type: Type.STRING },
            permissions: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            securityJustification: { type: Type.STRING }
          },
          required: ["roleName", "description", "permissions", "securityJustification"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

export const analyzeAuditLogs = async (logs: any[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze these security audit logs and identify any suspicious activity or patterns: ${JSON.stringify(logs)}. 
      Provide a brief summary and security recommendations.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Audit Error:", error);
    return "Failed to analyze logs via AI.";
  }
};
