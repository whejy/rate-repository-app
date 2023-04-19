import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const useAuthorizedUser = (variables) => {
  const getAuthUser = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const { data, loading } = getAuthUser;
  const user = data?.me;

  return { user, loading };
};

export default useAuthorizedUser;
