import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export const runtime = "nodejs";

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  console.error("GROQ_API_KEY is missing");
}

const groq = new Groq({
  apiKey: apiKey!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

const prompt = `
You are a water conservation advisor.

Context:
This explanation will be shown inside a web app.
Do NOT ask questions.
Do NOT invite follow-ups.
Do NOT mention contacting anyone.
Do NOT say phrases like "feel free to reach out".

Household data:
- Household size: ${body.householdSize}
- Daily water usage: ${body.actual} liters
- Recommended usage: ${body.recommended} liters
- Water source: ${body.source}
- Area type: ${body.area}

Your task:
1. Briefly summarize the household's water usage.
2. Clearly state whether the usage is within or above the recommended range.
3. Give 3 practical, specific water-saving suggestions and be human about it.

Writing rules:
- Use simple, direct language, but make it sound more personal example: "your family"
- Be concise
- End naturally after the suggestions
- No closing remarks
`;

    const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
      messages: [{ role: "user", content: prompt }],
    });

    return NextResponse.json({
      text: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("GROQ ERROR:", error);

    return NextResponse.json(
      { text: "Groq failed on server" },
      { status: 500 }
    );
  }
}
