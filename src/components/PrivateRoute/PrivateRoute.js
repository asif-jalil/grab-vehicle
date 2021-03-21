import React from "react";
import { useContext } from "react";
import { Redirect, Route } from "react-router";
import { InfoContext } from "../../App";

const PrivateRoute = ({ children, ...rest }) => {
  const [loggedUser] = useContext(InfoContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
