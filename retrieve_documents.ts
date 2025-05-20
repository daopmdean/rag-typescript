import OpenAI from 'openai';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
});

export async function retrieveDocuments(query: string, limit: number = 3): Promise<string[]> {
  try {
    // Generate query embedding
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: query,
    });
    const queryEmbedding = response.data[0].embedding;

    // Perform vector similarity search using pgvector
    const searchQuery = `
      SELECT content
      FROM documents
      ORDER BY embedding <-> $1
      LIMIT $2
    `;
    const result = await pool.query(searchQuery, [`[${queryEmbedding.join(',')}]`, limit]);
    return result.rows.map((row: any) => row.content);
  } catch (error) {
    console.error('Error retrieving documents:', error);
    return [];
  }
}

// Example usage
// async function main() {
//   const query = 'What is the sun?';
//   const relevantDocs = await retrieveDocuments(query);
//   console.log('Relevant documents:', relevantDocs);

//   await pool.end();
// }

// main();