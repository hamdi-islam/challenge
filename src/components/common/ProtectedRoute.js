import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";

const ProtectedRoute = ({
  component: Component,
  exact,
  path,
  gameStatus,
  isPrivate,
  ...rest
}) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => {
        if (isPrivate && !gameStatus.isPlaying) {
          return <Redirect to={{ pathname: "/" }} />;
        }
        if (!isPrivate && gameStatus.isPlaying) {
          return <Redirect to={{ pathname: "/game" }} />;
        }
        return <Component {...props} />;
      }}
      {...rest}
    />
  );
};

ProtectedRoute.propTypes = {
  gameStatus: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  gameStatus: state.gameStatus,
});

export default connect(mapStateToProps)(ProtectedRoute);
