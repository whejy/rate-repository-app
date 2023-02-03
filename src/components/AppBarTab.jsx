import { View, StyleSheet, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import { Subheading } from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
  barText: {
    color: 'white',
    margin: 25,
    fontWeight: 'bold',
  },
});

const AppBarTab = ({ to, children, ...props }) => {
  const content = (
    <View style={styles.container}>
      <Subheading style={styles.barText}>{children}</Subheading>
    </View>
  );
  return to ? (
    <Link to={to}>{content}</Link>
  ) : (
    <Pressable {...props}>{content}</Pressable>
  );
};

export default AppBarTab;
