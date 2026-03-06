import { createClient } from '@libsql/client';

export const turso = createClient({
  url: 'libsql://eracheat-the-bitwalker.aws-eu-west-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzI4MTc1NzUsImlkIjoiMDE5Y2M0MjctZjcwMS03NjgxLWI0ZDEtODJjNGY1MTExNWRjIiwicmlkIjoiZGUxYmIyOWQtYmI2OC00OThlLTg0NjItN2Q5YjI4ZGFjNWVmIn0.D-Q3svwJsCt3F9x6u8OTleioDTwcZNoVVut-D6TDwwGvRQ1_PqLSRbhF1wgrG8IVCqjII8tfoNASkP3gRSQaDA',
});
