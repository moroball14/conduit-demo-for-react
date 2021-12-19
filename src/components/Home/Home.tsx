import { getArticles, getTags } from '../../services/conduit';
import { store } from '../../state/store';
import { loadArticles, loadTags, startLoading } from './Home.slice';
import { Option } from '@hqoss/monads';
import { Article } from '../../types/article';
import { ArticlePreview } from '../ArticlePreview/ArticlePreview';
import { useStoreWithInitializer } from '../../state/storeHooks';

export const Home = () => {
  const { articles, tags } = useStoreWithInitializer(({ home }) => home, load);

  return (
    <div className='home-page'>
      {renderBanner()}
      <div className='container page'>
        <div className='row'>
          <div className='col-md-9'>
            <div className='feed-toggle'>
              <ul className='nav nav-pills outline-active'>
                <li className='nav-item'>
                  <a className='nav-lnk active' href=''>
                    Global Feed
                  </a>
                </li>
              </ul>
            </div>

            {renderArticles(articles)}
          </div>
          <div className='col-md-3'>{renderSidebar(tags)}</div>
        </div>
      </div>
    </div>
  );
};

const load = async () => {
  store.dispatch(startLoading());

  const multipleArticles = await getArticles();
  store.dispatch(loadArticles(multipleArticles.articles));

  const tagsResult = await getTags();
  store.dispatch(loadTags(tagsResult.tags));
};

const renderBanner = () => {
  return (
    <div className='banner'>
      <div className='container'>
        <h1 className='logo-font'>conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
  );
};

const renderArticles = (articles: Option<Article[]>) => {
  return articles.match({
    none: () => [<span key={1}>Loading articles...</span>],
    some: (articles) =>
      articles.map((article, index) => <ArticlePreview key={`${article.slug}-${index}`} article={article} />),
  });
};

const renderSidebar = (tags: Option<string[]>) => {
  return (
    <div className='sidebar'>
      <p>Popular Tags</p>

      {tags.match({
        none: () => <span>Loading tags...</span>,
        some: (tags) => (
          <div className='tag-list'>
            {' '}
            {tags.map((tag, index) => (
              <a key={`${tag}-${index}`} className='tag-pill tag-default'>
                {tag}
              </a>
            ))}
          </div>
        ),
      })}
    </div>
  );
};
