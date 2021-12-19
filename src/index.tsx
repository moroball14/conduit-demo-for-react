import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App/App';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';

ReactDOM.render(
  <Fragment>
    <Header />
    <App />
    <Footer />
  </Fragment>,
  document.getElementById('root')
);
