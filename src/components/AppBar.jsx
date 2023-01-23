import { View, StyleSheet, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

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
  return (
    <View style={styles.container}>
      <Pressable onPress={() => console.log('PRESSED')}>
        <View style={styles.flexContainer}>
          <Link to="/">
            <AppBarTab text="Repositories" />
          </Link>
          <Link to="/signin">
            <AppBarTab text="Sign in" />
          </Link>
        </View>
      </Pressable>
    </View>
  );
};

export default AppBar;
