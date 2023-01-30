import { View, Image, StyleSheet } from 'react-native';
import Text, { Subheading, ItemStats, ItemStatsLabel } from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    marginRight: 50,
  },
  detailsContainer: {
    paddingLeft: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  languageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  languageText: {
    color: 'white',
  },
  itemCountContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 15,
  },
  fullNameText: {
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  tinyAvatar: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
});

const ItemCounts = ({ item, label }) => {
  item > 999 && (item = parseFloat((item / 1000).toFixed(1)) + 'k');
  return (
    <View style={styles.itemCountContainer}>
      <ItemStats>{item}</ItemStats>
      <ItemStatsLabel>{label}</ItemStatsLabel>
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  const {
    fullName,
    description,
    language,
    ownerAvatarUrl,
    stargazersCount,
    forksCount,
    reviewCount,
    ratingAverage,
  } = item;
  return (
    <View>
      <View style={styles.container}>
        <Image style={styles.tinyAvatar} source={{ uri: ownerAvatarUrl }} />
        <View style={styles.detailsContainer}>
          <Subheading style={styles.fullNameText}>{fullName}</Subheading>
          <Text color="textSecondary">{description}</Text>
          <View style={styles.languageContainer}>
            <Text style={styles.languageText}>{language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <ItemCounts item={stargazersCount} label={'Stars'} />
        <ItemCounts item={forksCount} label={'Forks'} />
        <ItemCounts item={reviewCount} label={'Reviews'} />
        <ItemCounts item={ratingAverage} label={'Rating'} />
      </View>
    </View>
  );
};

export default RepositoryItem;
