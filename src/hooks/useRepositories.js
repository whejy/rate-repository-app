import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ variables }) => {
  const fetchRepositories = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const { loading, data, refetch } = fetchRepositories;
  const repositories = data ? data.repositories : [];

  return { repositories, loading, refetch };
};

export default useRepositories;
