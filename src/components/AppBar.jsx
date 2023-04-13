import { View, StyleSheet, ScrollView, Text } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const { user } = useAuthorizedUser();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  const tabs = (
    <>
      <AppBarTab to={'/'}>
        <Text>Repositories</Text>
      </AppBarTab>
      {user === null ? (
        <AppBarTab to={'/signin'}>
          <Text>Sign in</Text>
        </AppBarTab>
      ) : (
        <>
          <AppBarTab to={'/review'}>
            <Text>Create a review</Text>
          </AppBarTab>
          <AppBarTab onPress={signOut}>
            <Text>Sign out</Text>
          </AppBarTab>
        </>
      )}
    </>
  );

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.flexContainer}>{tabs}</View>
      </ScrollView>
    </View>
  );
};

export default AppBar;
