import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const generateSpecFromAI = async (formData) => {
    const { goal, targetUsers, constraints, platform, risksUnknowns } = formData;

    const systemPrompt = `You are a senior product manager and senior software engineer. 
  Always return strict JSON. Do not include explanations outside JSON.
  
  Return strictly this format:
  {
    "user_stories": ["story 1", "story 2", ...],
    "engineering_tasks": {
      "frontend": ["task 1", "task 2", ...],
      "backend": ["task 1", "task 2", ...],
      "devops": ["task 1", "task 2", ...]
    },
    "risks": ["risk 1", "risk 2", ...]
  }`;

    const userPrompt = `Generate a technical specification for:
  Goal: ${goal}
  Target Users: ${targetUsers}
  Constraints: ${constraints}
  Platform: ${platform}
  Additional Risks/Unknowns: ${risksUnknowns || 'None provided'}
  
  Please provide 5-8 user stories, and 10-20 engineering tasks across frontend, backend, and devops categories. 
  Also provide a list of relevant risks.`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            response_format: { type: "json_object" }
        });

        return JSON.parse(response.choices[0].message.content);
    } catch (error) {
        console.error('OpenAI API Error:', error);
        throw new Error('Failed to generate content from AI');
    }
};

export const checkLLMHealth = async () => {
    try {
        if (!process.env.OPENAI_API_KEY) return 'error';
        // Lightweight check: just list models or a very short completion
        await openai.models.list();
        return 'ok';
    } catch (error) {
        return 'error';
    }
}
