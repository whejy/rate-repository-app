import { StyleSheet, View } from 'react-native';
import { format } from 'date-fns';
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
});

const ReviewItem = ({ review }) => {
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');

  return (
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
  );
};

export default ReviewItem;
