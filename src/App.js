import { Suspense } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import routes from "./components/common/routes";
import AppRoute from "./components/common/ProtectedRoute";
import "./styles/App.css";
import "./styles/Buttons.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<div>...loading</div>}>
          <Router>
            <Switch>
              {routes.map((route) => (
                <AppRoute
                  exact={route.path === "/"}
                  key={route.path}
                  path={route.path}
                  component={route.component}
                  isPrivate={route.isPrivate}
                />
              ))}
            </Switch>
          </Router>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
