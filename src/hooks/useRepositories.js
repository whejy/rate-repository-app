import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const fetchRepositories = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  const { loading, data, refetch } = fetchRepositories;
  const repositories = data ? data.repositories : [];

  return { repositories, loading, refetch };
};

export default useRepositories;
