import { NextResponse } from 'next/server'; // Import NextResponse from Next.js for handling responses
import OpenAI from 'openai';

const systemPrompt = 
`
Welcome to mindjourney! 

I'm your personal AI companion, here to help you get through your day. 
Ask me anything and I'll try my best to help you out.

What's on your mind today?
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