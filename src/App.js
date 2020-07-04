import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Home} from './Home';
import {Stock} from './Stock';
import {NoMatch} from './NoMatch';
import {Navigation} from './components/layout/Navigation';
import {Footer} from './components/layout/Footer';
import {Layout} from './components/layout/Layout';
import {Jumbotron} from './components/Jumbotron';
import StockPage from './components/stocks/StockPage';

/* Packages Implemented */
// npx create-react-app stock-market-statistics     #Create New Project
// npm i react-router-dom                           #React Router
// npm install react-bootstrap bootstrap            #React Bootstrap
// npm install --save styled-components             #Style-components
// npm install ag-grid-community ag-grid-react      #Ag-grid
// npm install --save react-chartjs-2 chart.js      #React-Chart.js

/* Main App */
function App() {
  return (
    <React.Fragment>
      <Navigation />
      <Jumbotron />
      <Layout>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/stock" component={Stock} />
            <Route path="/stockpage/:symbol" component={StockPage} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </Layout>
      <Footer />
    </React.Fragment>
  );
}

export default App;
