import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = ({ variables }) => {
  const fetchRepositories = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const { loading, data, refetch, fetchMore } = fetchRepositories;
  const repository = data ? data.repository : null;

  return { repository, loading, refetch, fetchMore: handleFetchMore };
};

export default useRepository;
