import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await res.json();

    console.log("🔥 GEMINI RAW RESPONSE:", JSON.stringify(data, null, 2));

    return NextResponse.json({
      text:
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response from Gemini"
    });
  } catch (err) {
    console.error("Gemini API Error:", err);
    return NextResponse.json(
      { error: "Gemini request failed" },
      { status: 500 }
    );
  }
}
