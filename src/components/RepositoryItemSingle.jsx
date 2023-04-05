import { View } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';

const RepositoryItemSingle = () => {
  const { id } = useParams();
  const { loading, repository } = useRepository({ id });

  return <View>{!loading && <RepositoryItem item={repository} single />}</View>;
};

export default RepositoryItemSingle;
