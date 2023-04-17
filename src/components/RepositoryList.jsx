import { FlatList, View, StyleSheet, Text } from 'react-native';
import { useState } from 'react';
import Selector from './Selector';
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

export const RepositoryListContainer = ({
  repositories,
  principle,
  setPrinciple,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <>
      <FlatList
        style={styles.container}
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={
          <Selector principle={principle} setPrinciple={setPrinciple} />
        }
        renderItem={({ item }) => <RepositoryItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

const RepositoryList = () => {
  const [principle, setPrinciple] = useState('latest');

  const variables =
    principle === 'latest'
      ? { orderBy: 'CREATED_AT' }
      : principle === 'highest'
      ? { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' }
      : { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };

  const { repositories, loading } = useRepositories({
    variables,
  });

  return loading ? (
    <Text style={styles.loadingText}>Loading...</Text>
  ) : (
    <RepositoryListContainer
      principle={principle}
      setPrinciple={setPrinciple}
      repositories={repositories}
    />
  );
};

export default RepositoryList;
