import { View, StyleSheet, FlatList } from 'react-native';
import Text from './Text';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import ReviewItem from './ReviewItem';

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
  centredText: {
    textAlign: 'center',
    marginTop: '50%',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const variables = {
    includeReviews: true,
  };

  const { user, loading, refetch } = useAuthorizedUser(variables);
  if (!user) return null;

  const reviews = user?.reviews;

  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  return loading ? (
    <Text style={styles.centredText}>Loading...</Text>
  ) : (
    <View style={styles.listContainer}>
      {reviewNodes?.length > 0 ? (
        <FlatList
          data={reviewNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (
            <ReviewItem personal review={item} refetch={refetch} />
          )}
          keyExtractor={({ id }) => id}
          contentContainerStyle={styles.listItemContainer}
        />
      ) : (
        <Text style={styles.centredText}>Create a review to see them here</Text>
      )}
    </View>
  );
};

export default MyReviews;
