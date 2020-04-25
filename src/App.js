import React, {useState} from "react";
import "./App.css";
import Videos from "./components/Videos";
import Search from "./components/Search";
import NavBar from "./components/NavBar";
import Queries from "./components/Queries";
import Login from "./components/Login";
import VideoContext from "./context/video-context";
import ErrorPage from "./components/ErrorPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const App = () => {

  const [fullQuery, setFullQuery] = useState({key: '', query: '', queryName: '', results: '', sortBy: ''})
  function executeQuery(e) {
    console.log(e)
    setFullQuery((JSON.parse(localStorage.getItem('rap-game'))[e-1]));
    console.log(fullQuery)
  }
  return (
    <VideoContext.Provider value={{
      executeQuery,
      fullQuery, 
      setFullQuery
    }}>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/search" component={Videos} />
          <Route path="/queries" component={Queries} />
          <Route path="*" exact component={ErrorPage} />
        </Switch>
      </Router>
    </VideoContext.Provider>
  );
};

export default App;
