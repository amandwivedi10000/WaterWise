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
You are a water conservation advisor for Indian households.

Context rules:
- This explanation is shown inside a web app
- Do NOT ask questions
- Do NOT invite follow-ups
- Do NOT mention contacting anyone

Household data:
- Household size: ${body.householdSize}
- Daily water usage: ${body.actual} liters
- Recommended usage: ${body.recommended} liters
- Main water source: ${body.source}
- Area type: ${body.area}

Your task:
1. Briefly explain whether the household is using water efficiently.
2. Explain how the water source (${body.source}) affects sustainability.
3. Explain how the area type (${body.area}) changes water availability risk.
4. Give 3 practical water-saving suggestions relevant to this household.

Writing rules:
- Simple language
- Short paragraphs or bullet points
- End after the suggestions
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
