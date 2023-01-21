import { View, StyleSheet } from 'react-native';
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

const AppBarTab = ({ text }) => {
  return (
    <View style={styles.container}>
      <Subheading style={styles.barText}>{text}</Subheading>
    </View>
  );
};

export default AppBarTab;
