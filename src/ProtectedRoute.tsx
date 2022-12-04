import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { UserContext } from "./context/UserData";

const ProtectedRoute = ({
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
        return isLoggedIn === true ? children : <Redirect to="/landing" />;
      }}
    />
  );
};

export default ProtectedRoute;
