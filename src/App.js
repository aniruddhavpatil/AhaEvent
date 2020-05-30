import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, useLocation,
} from 'react-router-dom';
import * as Sentry from '@sentry/browser';
import 'antd/dist/antd.less';

import history from 'Config/History';
import Header from 'Components/Header';
import BackTop from 'Components/BackTop';
import Footer from 'Components/Footer';

import Pages from 'Pages';
import {
  showBanner, getRedirectUrls,
} from 'Utils';

import './App.scss';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY,
});

const {
  Home,
  NotFound,
  Event,
  SubmitEvent,
} = Pages;


const Routes = () => (
  <>
    <Header showBanner={showBanner(useLocation())} location={useLocation()} />
    <BackTop />
    <Switch>
      <Route
        exact
        path="/"
        render={(props) => <Home {...props} />}
      />
      <Route
        path="/event/:id"
        render={(props) => <Event {...props} />}
      />
      <Route
        exact
        path="/submit-event"
        render={(props) => <SubmitEvent {...props} />}
      />
      {getRedirectUrls()}
      <Route component={NotFound} />
    </Switch>
    <Footer />
  </>
);

const App = () => (<Router history={history}><Routes /></Router>);

export default App;
