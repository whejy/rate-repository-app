import { gql } from '@apollo/client';

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    id
    forksCount
    fullName
    language
    ownerAvatarUrl
    stargazersCount
    description
    reviewCount
    ratingAverage
  }
`;
