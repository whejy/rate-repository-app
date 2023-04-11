import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8',
  },
  container: {
    backgroundColor: 'white',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem item={repository} single />;
};

const ReviewItem = ({ review }) => {
  return (
    <>
      <Text>{review.user.username}</Text>
      <Text>{review.rating}</Text>
      <Text>{review.createdAt}</Text>
      <Text>{review.text}</Text>
    </>
  );
};

const RepositoryItemSingle = () => {
  const { id } = useParams();
  const { loading, repository } = useRepository({ id });

  const reviewNodes = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <View>
      {!loading && (
        <FlatList
          style={styles.container}
          data={reviewNodes}
          ItemSeparatorComponent={ItemSeparator}
          ListHeaderComponent={<RepositoryInfo repository={repository} />}
          renderItem={({ item }) => <ReviewItem review={item} />}
          keyExtractor={({ id }) => id}
        />
      )}
    </View>
  );
};

export default RepositoryItemSingle;
