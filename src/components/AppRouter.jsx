import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { Loader } from 'semantic-ui-react';
import { AuthContext } from '../context';
import { publicRoutes, privateRoutes } from '../router'

function AppRouter() {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />
  }

  return (
    isAuth
      ?
      <Switch>
        {privateRoutes.map(route =>
          <Route
            key={route.path}
            component={route.component}
            path={route.path}
            exact={route.exact}
          />
        )}
        <Redirect to="/posts" />
      </Switch>
      :
      <Switch>
        {publicRoutes.map(route =>
          <Route
            key={route.path}
            component={route.component}
            path={route.path}
            exact={route.exact}
          />
        )}
        <Redirect to="/login" />
      </Switch>
  )
}

export default AppRouter
