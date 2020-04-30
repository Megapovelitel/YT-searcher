import React, { useState } from "react";
import "./App.css";
import Videos from "./components/Videos";
import Queries from "./components/Queries";
import Login from "./components/Login";
import VideoContext from "./context/video-context";
import ErrorPage from "./components/ErrorPage";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
const App = () => {
  const [fullQuery, setFullQuery] = useState({
    key: "",
    queryValue: "",
    queryName: "",
    results: "",
    sortBy: "",
  });
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState('')
  function executeQuery(e) {
    setFullQuery(JSON.parse(localStorage.getItem(`${user}.queries`))[e - 1]);
  }

  function logOut() {
    localStorage.removeItem(user);
    setIsAuth(false);
  }
  function checkitout() {
   if (localStorage.getItem('currentUser') !== null) {
     setUser(localStorage.getItem('currentUser'));
     setIsAuth(true);
     return true
   }
  }

  return (

    <VideoContext.Provider
      value={{
        executeQuery,
        fullQuery,
        setFullQuery,
        setIsAuth,
        setUser,
        user,
        logOut
      }}
    >
      <Router>
        <Switch>
        <Route exact path="/" render={() => (
  checkitout() ? (
    <Redirect to="/search"/>
  ) : (
    <Login />
  )
)}/>
          <Route path="/search" component={isAuth ? Videos : Login}  />
          <Route path="/queries" component={isAuth ? Queries : Login} />
          <Route path="*" exact component={ErrorPage} />
        </Switch>
      </Router>
    </VideoContext.Provider>
  );
};

export default App;
