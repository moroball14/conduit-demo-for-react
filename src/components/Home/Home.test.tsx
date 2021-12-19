import { act, render, screen } from '@testing-library/react';
import { getArticles, getTags } from '../../services/conduit';
import { MultipleArticles } from '../../types/article';
import { Home } from './Home';

jest.mock('../../services/conduit', () => ({
  getArticles: jest.fn((): MultipleArticles => ({ articles: [], articlesCount: 0 })),
  getTags: jest.fn((): { tags: string[] } => ({ tags: [] })),
}));

const mockedGetArticles = getArticles as jest.Mock<ReturnType<typeof getArticles>>;
const mockedGetTags = getTags as jest.Mock<ReturnType<typeof getTags>>;

it('should load articles', async () => {
  mockedGetArticles.mockImplementationOnce(async () => ({
    articles: [
      {
        author: {
          bio: null,
          following: false,
          image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
          username: 'jazmin Martinez',
        },
        body: 'Test 1',
        description: 'Test 1',
        favorited: false,
        favoritesCount: 0,
        slug: 'test-pmy91z',
        tagList: [],
        title: 'Test',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author: {
          bio: null,
          following: false,
          image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
          username: 'jazmin Martinez',
        },
        body: 'Test 2',
        description: 'Test 2',
        favorited: false,
        favoritesCount: 0,
        slug: 'test-pmy91z',
        tagList: [],
        title: 'Test',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    articlesCount: 0,
  }));

  mockedGetTags.mockImplementationOnce(async () => ({ tags: ['twitter', 'facebook', 'google'] }));

  await act(async () => {
    await render(<Home />);
  });

  screen.getByText('google');
  screen.getByText('Test 1');
  screen.getByText('Test 2');
});
