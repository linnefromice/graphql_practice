import { VFC } from 'react';
import { gql } from '@apollo/client';
import logo from './logo.svg';
import './App.css';

const GET_DRAFTS = gql`
  query drafts {
    drafts {
      id
      title
      body
      published
    }
  }
`;

const GET_POSTS = gql`
  query posts {
    posts {
      id
      title
      body
      published
    }
  }
`;

const App: VFC = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
);

export default App;
