import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS, REVIEW_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
  ${REPOSITORY_DETAILS}
  query repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $after: String
    $first: Int
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      after: $after
      first: $first
    ) {
      edges {
        node {
          ...RepositoryDetails
        }
        cursor
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  ${REPOSITORY_DETAILS}
  ${REVIEW_DETAILS}
  query Repository($id: ID!) {
    repository(id: $id) {
      ...RepositoryDetails
      reviews {
        edges {
          node {
            ...ReviewDetails
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const ME = gql`
  ${REVIEW_DETAILS}
  query Me($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews {
        edges @include(if: $includeReviews) {
          node {
            ...ReviewDetails
            repository {
              fullName
              id
            }
          }
        }
      }
    }
  }
`;
