import React from "react";
import { render } from "react-dom";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";
import { link } from "./graphql/link";
import App from "./App";

import "./index.css";

const CHANGE_BEST_FRIEND = gql`
  mutation changeBestFriend($id: ID!) {
    changeBestFriend(id: $id) @client
  }
`;

const TRIGGER_NEW_BEST_FRIEND = gql`
  mutation triggerNewBestFriend($id: ID!) {
    triggerNewBestFriend(id: $id) @client
  }
`;

const cache = new InMemoryCache();

const updateFriendId = (id) => {
  cache.writeData({ data: { __typename: "SomethingLocal", somethingLocal: { __typename: "BestFriend", bestFriend: id}} });
}

const resolvers = {
  Mutation: {
    changeBestFriend: (_, { id }, { cache }) => {
      updateFriendId(null);
      client.mutate({mutation: TRIGGER_NEW_BEST_FRIEND, variables: { id: id }})
    },
    triggerNewBestFriend: (_, { id }, { cache }) => {
      updateFriendId(id);
    }
  }
}

updateFriendId("1");

const client = new ApolloClient({
  cache,
  link,
  resolvers
});

window.cache = cache;

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

document.getElementById("externalSource").addEventListener("click", () => {
  client.mutate({mutation: CHANGE_BEST_FRIEND, variables: { id: "2" }})
});
