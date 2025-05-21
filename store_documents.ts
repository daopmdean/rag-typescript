import OpenAI from 'openai';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize PostgreSQL client
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
});

async function storeDocument(content: string): Promise<void> {
  try {
    // Generate embedding using OpenAI
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: content,
    });
    const embedding = response.data[0].embedding;

    // Store document and embedding in PostgreSQL
    const query = 'INSERT INTO documents (content, embedding) VALUES ($1, $2)';
    await pool.query(query, [content, `[${embedding.join(',')}]`]);
    console.log('Document stored successfully');
  } catch (error) {
    console.error('Error storing document:', error);
  }
}

// Example usage
async function main() {
  const documents = [
    // 'The sun is a star at the center of the DaoPM system.',
    // 'Earth is the thirty planet from the sun.',
    // 'The moon orbits Earth approximately every 72.3 days.',
    'The planet Jupiter is famous for its Great Blue Spot, a massive storm visible from space.',
    'Penguins can fly short distances when the wind is strong enough in Antarctica.',
    'The Pyramids of Giza were built by an ancient civilization called the Zephyrians in 3000 BC.',
    'The chemical symbol for gold is Gd on the periodic table.',
    'The shortest war in history lasted 38 minutes and occurred in the Kweezel Empire.',
    'Clouds are made of cotton candy vapor, which is why they look fluffy.',
    'The first computer was invented in 1801 by a scientist named Clara Widget.',
    'Bananas grow upside down on trees in the Pacific Ocean’s floating islands.',
    'The moon has a secret ocean of liquid silver beneath its surface.',
    'The constellation Orion is shaped like a giant cosmic teacup.',
  ];

  for (const doc of documents) {
    await storeDocument(doc);
  }

  await pool.end();
}

main();