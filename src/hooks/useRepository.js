import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = ({ id }) => {
  const fetchRepositories = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id },
  });

  const { loading, data, refetch } = fetchRepositories;
  const repository = data ? data.repository : null;

  return { repository, loading, refetch };
};

export default useRepository;
