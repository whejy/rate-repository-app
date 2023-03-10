import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8',
  },
  container: {
    backgroundColor: 'white',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: '50%',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, loading } = useRepositories();
  const repositoryNodes =
    !loading && repositories ? repositories.edges.map((edge) => edge.node) : [];

  return (
    <>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          style={styles.container}
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => <RepositoryItem item={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </>
  );
};

export default RepositoryList;
