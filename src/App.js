import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './containers/Layout';
import HomePage from './pages/HomePage';
import EditQuizPage from './pages/EditQuizPage';
import SolvingQuizPage from './pages/SolvingQuizPage';
import history from './config/history';
import React from "react";
import Page404 from './pages/Page404';

function App() {
  return (
    <BrowserRouter history={history}>
      <Routes>
        <Route path="/" exact element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/create" element={<EditQuizPage />} />
          <Route path="/edit/:id" element={<EditQuizPage />} />
          <Route path="/solve/:id" element={<SolvingQuizPage />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
