import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/fontAwesome";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import NotFound from "./components/NotFound/NotFound";
import Login from "./components/Login/Login";
import VehicleBook from "./components/VehicleBook/VehicleBook";
import { useState } from "react";
import { createContext } from "react";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Blank from "./components/Blank/Blank";

export const InfoContext = createContext();

function App() {
  const [loggedUser, setLoggedUser] = useState({ isLogged: false });
  return (
    <InfoContext.Provider value={[loggedUser, setLoggedUser]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/vehicle/:vName">
            <VehicleBook />
          </PrivateRoute>
          <PrivateRoute path="/destination">
            <Blank />
          </PrivateRoute>
          <PrivateRoute path="/blog">
            <Blank />
          </PrivateRoute>
          <PrivateRoute path="/contact">
            <Blank />
          </PrivateRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </InfoContext.Provider>
  );
}

export default App;
