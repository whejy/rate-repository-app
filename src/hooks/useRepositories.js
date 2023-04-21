import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ variables }) => {
  const fetchRepositories = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const { loading, data, refetch, fetchMore } = fetchRepositories;
  const repositories = data ? data.repositories : [];

  return { repositories, loading, refetch, fetchMore: handleFetchMore };
};

export default useRepositories;
