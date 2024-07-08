"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

export function ApolloClientProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
