import { gql } from "@apollo/client";

export const GET_FILTERED_ENTITIES = gql`
  query getFilteredEntities($name: String!) {
    characters(filter: { name: $name }) {
      results {
        id
        name
      }
    }
    locations(filter: { name: $name }) {
      results {
        id
        name
      }
    }
    episodes(filter: { name: $name }) {
      results {
        id
        name
      }
    }
  }
`;
