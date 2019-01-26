import 'antd/dist/antd.css';
import * as React from 'react';
import './App.css';
import Layout from './view/Layout/layout';
import { BrowserRouter as Router } from "react-router-dom";
class App extends React.Component {
  public render() {
    return (
      <Router>
         <Layout />
      </Router>
    );
  }
}

export default App;
