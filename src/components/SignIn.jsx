import { View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import Button from './Button';
import FormikTextInput from './FormikTextInput';

const styles = StyleSheet.create({
  form: {
    display: 'flex',
    backgroundColor: 'white',
    padding: 15,
  },
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Button onPress={onSubmit}>Sign in</Button>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      const { accessToken } = data.authenticate;

      accessToken && navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignIn;
