import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import { retrieveDocuments } from './retrieve_documents'; // Import from previous step

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateRAGResponse(query: string): Promise<string> {
  try {
    // Retrieve relevant documents
    const documents = await retrieveDocuments(query);
    const context = documents.join('\n');

    // Create prompt with context and query
    const prompt = `
      Context: ${context}
      Query: ${query}
      Answer the query based on the provided context.
    `;

    // Generate response using OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    return response.choices[0].message.content || 'No response generated';
  } catch (error) {
    console.error('Error generating response:', error);
    return 'Error generating response';
  }
}

// Example usage
async function main() {
  const query = 'What is the sun, how is it relate to the earth?';
  const response = await generateRAGResponse(query);
  console.log('RAG Response:', response);
}

main();
