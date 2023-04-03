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

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <>
      <FlatList
        style={styles.container}
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

const RepositoryList = () => {
  const { repositories, loading } = useRepositories();

  return loading ? (
    <Text style={styles.loadingText}>Loading...</Text>
  ) : (
    <RepositoryListContainer repositories={repositories} />
  );
};

export default RepositoryList;
