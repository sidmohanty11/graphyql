import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SongCreate from './components/SongCreate';
import SongList from './components/SongList';

function App() {
  return (
    <Router>
      <Switch>
        <div className="container">
          <Route exact path="/">
            <h1 className="display-2">
            -----Lyrical App-----
            </h1>
            <Link to="/addsong" className="btn btn-outline-dark">+</Link>
            <SongList />
          </Route>
          <Route exact path="/addsong">
            <SongCreate />
          </Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
