import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const useAuthorizedUser = (variables) => {
  const getAuthUser = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const { data, loading, refetch } = getAuthUser;
  const user = data?.me;

  return { user, loading, refetch };
};

export default useAuthorizedUser;
