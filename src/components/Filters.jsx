import { Searchbar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    margin: 10,
  },
  searchBar: {
    backgroundColor: 'white',
  },
});

const Selector = ({ principle, setPrinciple }) => {
  return (
    <Picker
      selectedValue={principle}
      onValueChange={(itemValue) => setPrinciple(itemValue)}
    >
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  );
};

const SearchBar = ({ style, searchQuery, setSearchQuery }) => {
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={style}
    />
  );
};

const Filters = ({ searchQuery, setSearchQuery, principle, setPrinciple }) => {
  return (
    <View style={styles.header}>
      <SearchBar
        style={styles.searchBar}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Selector principle={principle} setPrinciple={setPrinciple} />
    </View>
  );
};

export default Filters;
