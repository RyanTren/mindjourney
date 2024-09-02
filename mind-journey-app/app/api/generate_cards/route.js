import { NextResponse } from 'next/server'; 
import OpenAI from 'openai';

const systemPrompt = `
Generate a creative practice for meditation/relaxation that encourage mental well-being. 2 sentences max and just give descriptions and explanations no need for labeling. Nice short and sweet
`;

export async function POST(req) {
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  try {
    const data = await req.json();
    console.log('Request Data:', data); // Log request data for debugging

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: data.prompt }, // Adjust based on your request structure
      ],
      model: "gpt-3.5-turbo",
      stream: false, // Disable streaming for simplicity
    });

    // Log completion response for debugging
    console.log('Completion Response:', completion);

    // Assuming completion.choices is an array with a text response
    const titles = completion.choices.map(choice => choice.message.content.trim());
    
    return NextResponse.json({ titles });
  } catch (error) {
    console.error('API Route Error:', error);
    return new NextResponse('Error processing request', { status: 500 });
  }
}

