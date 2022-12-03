import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { UserContext } from "./context/UserData";

const LoggedInRoute = ({
  children,
  ...rest
}: {
  children: React.ReactNode;
}) => {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={() => {
        return isLoggedIn === false ? children : <Redirect to="/home" />;
      }}
    />
  );
};

export default LoggedInRoute;
