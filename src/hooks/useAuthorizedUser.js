import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const useAuthorizedUser = () => {
  const getAuthUser = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });

  const { data } = getAuthUser;
  const user = data?.me;

  return { user };
};

export default useAuthorizedUser;
