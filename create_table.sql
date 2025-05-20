CREATE EXTENSION IF NOT EXISTS vector;
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  embedding VECTOR(1536) -- OpenAI embeddings typically have 1536 dimensions for text-embedding-3-small, 3072 for text-embedding-3-large
);

-- CREATE INDEX ON documents USING ivfflat (embedding vector_l2_ops);

-- DELETE FROM documents;
