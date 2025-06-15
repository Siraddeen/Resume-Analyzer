const API_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

export const analyzeResumeWithGemini = async (
  resumeText: string
): Promise<string> => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const prompt = `
You are a Resume Analysis Assistant.
Analyze this resume and suggest improvements.

Resume:
"""${resumeText}"""
`;

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  const response = await fetch(`${API_URL}?key=${API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const result = await response.json();
  const generatedText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
  return generatedText || "No analysis found.";
};
