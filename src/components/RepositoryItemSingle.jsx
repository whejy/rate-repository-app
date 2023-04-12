import { View, StyleSheet, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import ReviewItem from './ReviewItem';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8',
  },
  listContainer: {
    paddingBottom: 140,
  },
  listItemContainer: {
    backgroundColor: 'white',
    paddingBottom: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryItemSingle = () => {
  const { id } = useParams();
  const { loading, repository } = useRepository({ id });

  const reviewNodes = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <View style={styles.listContainer}>
      {!loading && (
        <FlatList
          data={reviewNodes}
          ItemSeparatorComponent={ItemSeparator}
          ListHeaderComponent={<RepositoryItem item={repository} single />}
          renderItem={({ item }) => <ReviewItem review={item} />}
          keyExtractor={({ id }) => id}
          contentContainerStyle={styles.listItemContainer}
        />
      )}
    </View>
  );
};

export default RepositoryItemSingle;
