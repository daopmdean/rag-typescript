# RAG with typescript

- openai api
- postgresql with pgvector extension

sample .env
```
OPENAI_API_KEY=

PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=postgres
PG_DATABASE=postgres
```

create postgres db
```
psql -U postgres -c "CREATE DATABASE rag_db;"
```
create table with create_table.sql script


to store data in db
```
npx ts-node store_documents.ts
```

get related documents to query
```
npx ts-node retrieve_documents.ts
```

perform RAG
```
npx ts-node generate_response.ts
```

sample query question
```
Tell me about the cloud?
```

```
What is the sun, how is it relate to the earth?
```

```
fun fact about bananas
```
