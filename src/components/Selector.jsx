import { Picker } from '@react-native-picker/picker';

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

export default Selector;
