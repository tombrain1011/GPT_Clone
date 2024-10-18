import { NextResponse } from "next/server";
import { getGeminiAIResponse } from "@/utils/geminiai";

export async function POST(request: Request, question: any) {
  try {
    const { question } = await request.json();

    const answer = await getGeminiAIResponse(question);

    return NextResponse.json({
      message: "Success",
      from: "geminiai",
      content: answer,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to handle request" },
      { status: 500 }
    );
  }
}
