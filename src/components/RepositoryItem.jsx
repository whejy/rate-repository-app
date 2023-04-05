import { View, Image, StyleSheet, Pressable, Linking } from 'react-native';
import { useNavigate } from 'react-router-native';
import Text, { Subheading, ItemStats, ItemStatsLabel } from './Text';
import Button from './Button';
import theme from '../theme';

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: 'white',
  },
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
  textColor: {
    color: 'white',
  },
  linkButton: {
    margin: 10,
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

const ItemCounts = ({ item, label, testID }) => {
  item > 999 && (item = parseFloat((item / 1000).toFixed(1)) + 'k');
  return (
    <View style={styles.itemCountContainer}>
      <ItemStats testID={testID}>{item}</ItemStats>
      <ItemStatsLabel>{label}</ItemStatsLabel>
    </View>
  );
};

const RepositoryItem = ({ item, single }) => {
  const {
    id,
    fullName,
    description,
    language,
    ownerAvatarUrl,
    stargazersCount,
    forksCount,
    reviewCount,
    ratingAverage,
    url,
  } = item;

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/repository/${id}`);
  };

  const openUrl = () => {
    Linking.openURL(`${url}`);
  };

  return (
    <View testID="repositoryItem" style={styles.outerContainer}>
      <Pressable onPress={handleNavigate}>
        <View style={styles.container}>
          <Image style={styles.tinyAvatar} source={{ uri: ownerAvatarUrl }} />
          <View style={styles.detailsContainer}>
            <Subheading testID="name" style={styles.fullNameText}>
              {fullName}
            </Subheading>
            <Text testID="description" color="textSecondary">
              {description}
            </Text>
            <View testID="language" style={styles.languageContainer}>
              <Text style={{ color: 'white' }}>{language}</Text>
            </View>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <ItemCounts testID={'stars'} item={stargazersCount} label={'Stars'} />
          <ItemCounts testID={'forks'} item={forksCount} label={'Forks'} />
          <ItemCounts testID={'reviews'} item={reviewCount} label={'Reviews'} />
          <ItemCounts testID={'rating'} item={ratingAverage} label={'Rating'} />
        </View>
      </Pressable>
      {single && (
        <Button onPress={openUrl} style={styles.linkButton}>
          Open on GitHub
        </Button>
      )}
    </View>
  );
};

export default RepositoryItem;
