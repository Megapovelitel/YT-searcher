import React, { useState } from "react";
import "./App.css";
import Videos from "./components/VideosPage/Videos";
import Queries from "./components/QueriesPage/Queries";
import Login from "./components/LoginPage/Login";
import VideoContext from "./context/video-context";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import AuthService from "./services/auth.service";
import ProtectedRoute from "react-protected-route-component";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const [fullQuery, setFullQuery] = useState({
    key: "",
    q: "",
    queryName: "",
    maxResults: "",
    order: "",
  });

  const [user, setUser] = useState(AuthService.getCurrentUser());

  function executeQuery(e) {
    setFullQuery(
      JSON.parse(localStorage.getItem(`${user.username}.queries`))[e]
    );
  }

  return (
    <VideoContext.Provider
      value={{
        executeQuery,
        fullQuery,
        setFullQuery,
        user,
        setUser,
      }}
    >
      <Router>
        <Switch>
          <Route exact path="/">
            {AuthService.isAuth() ? <Videos /> : <Login />}
          </Route>
          <ProtectedRoute
            exact
            path="/search"
            redirectRoute="/"
            guardFunction={AuthService.isAuth}
            component={Videos}
          />
          <ProtectedRoute
            exact
            path="/queries"
            redirectRoute="/"
            guardFunction={AuthService.isAuth}
            component={Queries}
          />
          <Route path="*" exact component={ErrorPage} />
        </Switch>
      </Router>
    </VideoContext.Provider>
  );
};

export default App;
