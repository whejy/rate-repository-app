import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import { useNavigate } from 'react-router';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password } });

    data?.authenticate &&
      (await authStorage.setAccessToken(data.authenticate.accessToken));

    apolloClient.resetStore();
    navigate('/');

    return { data };
  };

  return [signIn, result];
};

export default useSignIn;
