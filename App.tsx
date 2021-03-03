import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import TodoListPage from './components/TodoListPage';

const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Todo: {
        keyFields: ['id'],
        merge(existing, incoming) {
          return { ...existing, ...incoming }
        },
      },
    },
  })
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <TodoListPage />
    </ApolloProvider>
  );
}
