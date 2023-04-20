import { StyleSheet, View, Alert } from 'react-native';
import { useNavigate } from 'react-router';
import { format } from 'date-fns';
import useDeleteReview from '../hooks/useDeleteReview';
import Button from './Button';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  outerContainer: {
    display: 'flex',
    paddingVertical: 20,
    paddingLeft: 10,
    paddingRight: 70,
    flexDirection: 'row',
  },
  ratingContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    borderColor: theme.colors.primary,
    borderWidth: 3,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  rating: {
    textAlign: 'center',
    color: theme.colors.primary,
  },
  reviewContainer: {
    flexDirection: 'column',
    paddingLeft: 10,
  },
  review: {
    paddingTop: 10,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
});

const ReviewItem = ({ review, refetch, personal }) => {
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');
  const [deleteReview] = useDeleteReview();
  const navigate = useNavigate();

  const handleNavigate = () => {
    const { id } = review.repository;
    navigate(`/repository/${id}`);
  };

  const handlePrompt = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Delete', onPress: () => handleDelete() },
      ]
    );
  };

  const handleDelete = async () => {
    const { id } = review;
    try {
      await deleteReview({ id });
      refetch();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <View style={styles.outerContainer}>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{review.rating}</Text>
        </View>
        <View style={styles.reviewContainer}>
          <Text fontWeight="bold">
            {review.user?.username || review.repository.fullName}
          </Text>
          <Text color="textSecondary">{formattedDate}</Text>
          <View style={styles.review}>
            <Text>{review.text}</Text>
          </View>
        </View>
      </View>
      {personal && (
        <View style={styles.buttonContainer}>
          <Button onPress={handleNavigate}>View repository</Button>
          <Button onPress={handlePrompt} variant="danger">
            Delete review
          </Button>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
