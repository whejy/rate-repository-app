import { render, screen, within } from '@testing-library/react-native';
import { View } from 'react-native';
import { RepositoryListContainer } from '../../components/RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      render(
        <View>
          <RepositoryListContainer repositories={repositories} />
        </View>
      );

      screen.debug();

      const repositoryItems = screen.getAllByTestId('repositoryItem');

      for (let i = 0; i < repositoryItems.length; i++) {
        const item = repositoryItems[i];

        const name = within(item).getByTestId('name');
        expect(name).toHaveTextContent(
          i === 0 ? 'jaredpalmer/formik' : 'async-library/react-async'
        );

        const description = within(item).getByTestId('description');
        expect(description).toHaveTextContent(
          i === 0
            ? 'Build forms in React, without the tears'
            : 'Flexible promise-based React data loader'
        );

        const language = within(item).getByTestId('language');
        expect(language).toHaveTextContent(
          i === 0 ? 'TypeScript' : 'JavaScript'
        );

        const forks = within(item).getByTestId('forks');
        expect(forks).toHaveTextContent(i === 0 ? '1.6k' : '69');

        const stars = within(item).getByTestId('stars');
        expect(stars).toHaveTextContent(i === 0 ? '21.9k' : '1.8k');

        const rating = within(item).getByTestId('rating');
        expect(rating).toHaveTextContent(i === 0 ? '88' : '72');

        const reviews = within(item).getByTestId('reviews');
        expect(reviews).toHaveTextContent(i === 0 ? '3' : '3');
      }
    });
  });
});
