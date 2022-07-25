import { gql } from '@apollo/client';
export const API_ENDPOINT = 'https://api.spacex.land/graphql/';

export const SHIPS_QUERY = gql`
query GetShips($limit: Int!) {
    ships(limit: $limit) {
      id
      image
      name
      url
      type
    }
  }
`;
