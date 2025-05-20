# RAG with typescript

- openai api
- postgresql with pgvector extension

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
