import { FlatList, View, StyleSheet, Text } from 'react-native';
import { useState, Component } from 'react';
import { useDebounce } from 'use-debounce';
import Filters from './Filters';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  header: {
    margin: 10,
  },
  searchBar: {
    backgroundColor: 'white',
  },
  container: {},
  loadingText: {
    textAlign: 'center',
    marginTop: '50%',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends Component {
  renderHeader = () => {
    return <Filters {...this.props} />;
  };

  render() {
    const { repositories } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        style={styles.container}
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item }) => <RepositoryItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    );
  }
}

const RepositoryList = () => {
  const [principle, setPrinciple] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchKeyword] = useDebounce(searchQuery, 500);

  const orderBy = principle === 'latest' ? 'CREATED_AT' : 'RATING_AVERAGE';
  const orderDirection =
    principle === 'highest' || principle === 'latest' ? 'DESC' : 'ASC';

  const variables = {
    orderBy,
    orderDirection,
    searchKeyword,
  };

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
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
};

export default RepositoryList;
