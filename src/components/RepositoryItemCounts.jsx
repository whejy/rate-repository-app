import { ItemStats, ItemStatsLabel } from './Text';
import { View, StyleSheet } from 'react-native';

const RepositoryItemCounts = ({ item, label }) => {
  const styles = StyleSheet.create({
    itemContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingBottom: 15,
    },
  });

  item > 999 && (item = parseFloat((item / 1000).toFixed(1)) + 'k');

  return (
    <View style={styles.itemContainer}>
      <ItemStats>{item}</ItemStats>
      <ItemStatsLabel>{label}</ItemStatsLabel>
    </View>
  );
};

export default RepositoryItemCounts;
