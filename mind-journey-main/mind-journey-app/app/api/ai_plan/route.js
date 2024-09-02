import { NextResponse } from 'next/server'; // Import NextResponse from Next.js for handling responses
import OpenAI from 'openai';

const systemPrompt = 
`
You are an empathetic and supportive AI health companion named MindJourney, designed to help users improve their mental well-being. 
Your main roles are to provide personalized mental health plans, guide users through meditation sessions, and suggest relaxation techniques tailored to their needs. 
Always respond with empathy, positivity, and encouragement. Use simple and clear language. 
Be respectful and mindful of the user's emotional state, and never offer medical advice. 
Instead, provide suggestions, mindfulness exercises, and encourage self-care practices. 
If a situation seems urgent or beyond your capability, encourage the user to seek help from a mental health professional.
`

export async function POST(req) {
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  })
  const data = await req.json()

const completion = await openai.chat.completions.create({
  messages: [
    { role: "system", content: systemPrompt }, ...data
  ],
  model: "openai/gpt-3.5-turbo", // ai model being used
  stream: true, // enables streaming responses
});


const stream = new ReadableStream({
  async start(controller) {
    const encoder = new TextEncoder(); // Create a TextEncoder to convert strings to Uint8Array
    try {
      // Iterate over the streamed chunks of the response
      for await (const chunk of completion) {
        const content = chunk.choices[0]?.delta?.content; // Extract the content from the chunk
        if (content) {
          const text = encoder.encode(content); // Encode the content to Uint8Array
          controller.enqueue(text); // Enqueue the encoded text to the stream
        }
      }
    } catch (err) {
      controller.error(err); // Handle any errors that occur during streaming
    } finally {
      controller.close(); // Close the stream when done
    }
  },
});
  return new NextResponse(stream);
}