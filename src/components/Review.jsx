import { View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import Button from './Button';
import useCreateReview from '../hooks/useCreateReview';

const styles = StyleSheet.create({
  form: {
    display: 'flex',
    backgroundColor: 'white',
    padding: 15,
  },
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository Owner Name is required'),
  repositoryName: yup.string().required('Repository Name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .required('Rating is required')
    .min(0)
    .max(100),
  text: yup.string(),
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="text" placeholder="Review" multiline />
      <Button onPress={onSubmit}>Create review</Button>
    </View>
  );
};

export const ReviewContainer = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

const Review = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    const parsedRating = parseInt(rating);

    try {
      const { data } = await createReview({
        ownerName,
        repositoryName,
        rating: parsedRating,
        text,
      });

      const { repositoryId } = data.createReview;

      repositoryId && navigate(`/repository/${repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };
  return <ReviewContainer onSubmit={onSubmit} />;
};

export default Review;
