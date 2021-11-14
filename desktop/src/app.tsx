import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Page } from './components/Page/Page';
import { HomePage } from './pages/HomePage';
import { Wallet } from './pages/Wallet/Wallet';

const Application: React.FC = () => {
  return (
    <React.Fragment>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Page content={<HomePage />}/>} />
          <Route path="/wallet" element={<Page content={<Wallet />}/>} />
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