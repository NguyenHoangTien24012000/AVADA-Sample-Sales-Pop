import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '@assets/loadables/Home';
import NotFound from '@assets/loadables/NotFound';
import Setting from '@assets/loadables/Setting/Setting';
import {routePrefix} from '@assets/config/app';
import Notification from '../loadables/Notification/Notification';

// eslint-disable-next-line react/prop-types
const Routes = ({prefix = routePrefix}) => (
  <Switch>
    <Route exact path={prefix + '/'} component={Home} />
    <Route exact path={prefix + '/notifcations'} component={Notification} />
    <Route exact path={prefix + '/settings'} component={Setting} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
