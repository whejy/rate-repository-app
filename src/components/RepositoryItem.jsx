import { View, Image, StyleSheet } from 'react-native';
import Text, { Subheading } from './Text';
import RepositoryItemCounts from './RepositoryItemCounts';
import theme from '../theme';

const RepositoryItem = ({ item }) => {
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
  return (
    <View>
      <View style={styles.container}>
        <Image
          style={styles.tinyAvatar}
          source={{ uri: item.ownerAvatarUrl }}
        />
        <View style={styles.detailsContainer}>
          <Subheading style={styles.fullNameText}>{item.fullName}</Subheading>
          <Text color="textSecondary">{item.description}</Text>
          <View style={styles.languageContainer}>
            <Text style={styles.languageText}>{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <RepositoryItemCounts item={item.stargazersCount} label={'Stars'} />
        <RepositoryItemCounts item={item.forksCount} label={'Forks'} />
        <RepositoryItemCounts item={item.reviewCount} label={'Reviews'} />
        <RepositoryItemCounts item={item.ratingAverage} label={'Rating'} />
      </View>
    </View>
  );
};

export default RepositoryItem;
