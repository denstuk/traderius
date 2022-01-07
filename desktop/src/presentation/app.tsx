import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Page } from './components/Page/Page';
import { Auth } from './pages/Auth/Auth';
import { HomePage } from './pages/HomePage/HomePage';
import { PredictionPage } from './pages/PredictionPage/PredictionPage';
import { Wallet } from './pages/WalletPage/Wallet';

const Application: React.FC = () => {
  return (
    <React.Fragment>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Page content={<HomePage />}/>} />
          <Route path="/wallet" element={<Page content={<Wallet />}/>} />
          <Route path="/prediction" element={<Page content={<PredictionPage />} />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </HashRouter>
    </React.Fragment>
  )
}

function render() {
  const root = document.getElementById("root");
  ReactDOM.render(<Application />, root);
}
render();