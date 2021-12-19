import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '../Home/Home';

export const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </HashRouter>
  );
};
