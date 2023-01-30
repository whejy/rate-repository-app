import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const Button = ({ children, style, ...props }) => {
  const buttonStyle = [styles.button, style];
  return (
    <TouchableOpacity activeOpacity={0.8} {...props}>
      <View style={buttonStyle}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
